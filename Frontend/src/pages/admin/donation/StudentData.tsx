import { useState, useEffect } from "react";
import { Download, FileText, Trash2, CheckCircle2, XCircle, Search } from "lucide-react";
import * as XLSX from "xlsx";
import axios from "axios";

interface Student {
  _id: string;
  email: string;
  fullName: string;
  cause: string;
  description: string;
  amountNeeded: number;
  raised?: number;
  documents: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  password: string;
}

export default function AdminStudentRegistrations() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.cause.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map(s => s._id));
    }
  };

  const updateStatus = async (ids: string[], status: "approved" | "rejected") => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/students/update-status`, {
        ids,
        status
      });
      
      setStudents(prev => 
        prev.map(student => 
          ids.includes(student._id) ? { ...student, status } : student
        )
      );
      setSelectedIds([]);
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const deleteStudents = async (ids: string[]) => {
    if (!confirm("Are you sure you want to delete these students?")) return;
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/students`, {
        data: { ids }
      });
      
      setStudents(prev => prev.filter(student => !ids.includes(student._id)));
      setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
      alert("Students deleted successfully");
    } catch (error) {
      console.error("Error deleting students:", error);
      alert("Failed to delete students");
    }
  };

  const exportToExcel = (ids: string[]) => {
    const data = students
      .filter(student => ids.includes(student._id))
      .map(student => ({
        "Full Name": student.fullName,
        Email: student.email,
        Cause: student.cause,
        "Amount Needed": student.amountNeeded,
        Raised: student.raised || 0,
        Status: student.status,
        "Date Created": new Date(student.createdAt).toLocaleDateString(),
        Description: student.description,
        Documents: student.documents.join(", ")
      }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "student_registrations.xlsx");
  };

  const downloadDocument = (docPath: string) => {
    // Remove the leading slash if it exists to match your static files route
    const cleanPath = docPath.startsWith('/') ? docPath.substring(1) : docPath;
    window.open(`${import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '')}/${cleanPath}`, "_blank");
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Student Donation Registrations
      </h1>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {selectedIds.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(selectedIds, "approved")}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                <CheckCircle2 size={16} />
                Approve
              </button>
              <button
                onClick={() => updateStatus(selectedIds, "rejected")}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                <XCircle size={16} />
                Reject
              </button>
              <button
                onClick={() => deleteStudents(selectedIds)}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                <Trash2 size={16} />
                Delete
              </button>
              <button
                onClick={() => exportToExcel(selectedIds)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === filteredStudents.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4"
                />
              </th>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Cause</th>
              <th className="px-6 py-3 text-left">Amount Needed</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Documents</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(student._id)}
                      onChange={() => toggleSelection(student._id)}
                      className="h-4 w-4"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{student.fullName}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.cause}</td>
                  <td className="px-6 py-4">${student.amountNeeded.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.status === "approved" ? "bg-green-100 text-green-800" :
                      student.status === "rejected" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {student.documents.map((doc, i) => (
                        <button
                          key={i}
                          onClick={() => downloadDocument(doc)}
                          className="flex items-center gap-1 text-blue-500 text-sm"
                        >
                          <FileText size={14} />
                          {doc.split('/').pop()}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No student registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}