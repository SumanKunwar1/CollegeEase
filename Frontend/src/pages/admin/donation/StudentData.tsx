import { useState, useEffect } from "react";
import {
  Download,
  FileText,
  Trash2,
  CheckCircle2,
  XCircle,
  Search,
  FileUp,
} from "lucide-react";
import * as XLSX from "xlsx";

import { storage } from "../../../data/donationregistration";
import type { Student } from "../../../types/donationregistration";

export default function AdminStudentRegistrations() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const allStudents = storage.getStudents();
    setStudents(allStudents);
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.cause.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredStudents.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredStudents.map((student) => student.id));
    }
  };

  const approveStudents = (ids: string[]) => {
    const updatedStudents = students.map((student) => {
      if (ids.includes(student.id)) {
        return { ...student, status: "approved" as const }; 
      }
      return student;
    });
    setStudents(updatedStudents);
    updatedStudents.forEach(student => storage.updateStudent(student));
  };

  const rejectStudents = (ids: string[]) => {
    const updatedStudents = students.map((student) => {
      if (ids.includes(student.id)) {
        return { ...student, status: "rejected" as const }; 
      }
      return student;
    });
    setStudents(updatedStudents);
    updatedStudents.forEach(student => storage.updateStudent(student));
  };

  const deleteStudents = (ids: string[]) => {
    const updatedStudents = students.filter(
      (student) => !ids.includes(student.id)
    );
    setStudents(updatedStudents);
    
    setSelectedRows((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const exportToExcel = (ids: string[]) => {
    const studentsToExport = students.filter((student) =>
      ids.includes(student.id)
    );
    
    // Prepare data for Excel
    const data = studentsToExport.map((student) => ({
      "Full Name": student.fullName,
      Email: student.email,
      Cause: student.cause,
      "Amount Needed": student.amountNeeded,
      Raised: student.raised,
      Status: student.status,
      "Date Created": new Date(student.createdAt).toLocaleDateString(),
      Description: student.description,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "student_registrations.xlsx");
  };

  const exportDocuments = (ids: string[]) => {
    const studentsToExport = students.filter((student) =>
      ids.includes(student.id)
    );
    
    alert(`Preparing to export documents for ${studentsToExport.length} students. 
    In a real implementation, this would download the actual documents.`);
  };

  const exportAll = (ids: string[]) => {
    exportToExcel(ids);
    exportDocuments(ids);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Student Donation Registrations
      </h1>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <div className="flex gap-2">
            {selectedRows.length > 0 && (
              <>
                <button
                  onClick={() => approveStudents(selectedRows)}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  <CheckCircle2 size={16} />
                  Approve
                </button>
                <button
                  onClick={() => rejectStudents(selectedRows)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <XCircle size={16} />
                  Reject
                </button>
                <button
                  onClick={() => deleteStudents(selectedRows)}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    <Download size={16} />
                    Export
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                    <button
                      onClick={() => exportToExcel(selectedRows)}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50"
                    >
                      Export Data (Excel)
                    </button>
                    <button
                      onClick={() => exportDocuments(selectedRows)}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50"
                    >
                      Export Documents
                    </button>
                    <button
                      onClick={() => exportAll(selectedRows)}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50"
                    >
                      Export All
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length > 0 &&
                      selectedRows.length === filteredStudents.length
                    }
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cause
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Raised
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(student.id)}
                        onChange={() => toggleRowSelection(student.id)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {student.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {student.cause}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      ${student.amountNeeded.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      ${student.raised.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : student.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        {student.documents.map((doc, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              // In a real app, this would download the document
                              alert(`Would download: ${doc}`);
                            }}
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
                          >
                            <FileText size={14} />
                            {doc}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => exportToExcel([student.id])}
                          className="text-blue-600 hover:text-blue-900"
                          title="Export Data"
                        >
                          <FileUp size={16} />
                        </button>
                        <button
                          onClick={() => exportDocuments([student.id])}
                          className="text-green-600 hover:text-green-900"
                          title="Export Documents"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => deleteStudents([student.id])}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No student registrations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}