import { useState } from "react";
import { DataTable } from "../../../../components/auth/DataTable";
import { Eye, CheckCircle, XCircle, FileText } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";

interface ScholarshipApplication {
  id: string;
  studentName: string;
  program: string;
  appliedDate: string;
  amount: number;
  gpa: number;
  status: "pending" | "approved" | "rejected";
  documents: string[];
}

export function ScholarshipApplications() {
  const [applications, setApplications] = useState<ScholarshipApplication[]>([
    {
      id: "1",
      studentName: "John Smith",
      program: "Merit Scholarship",
      appliedDate: "2024-03-15",
      amount: 10000,
      gpa: 3.8,
      status: "pending",
      documents: ["Transcript", "Recommendation Letter"],
    },
    {
      id: "2",
      studentName: "Emma Davis",
      program: "Research Grant",
      appliedDate: "2024-03-14",
      amount: 15000,
      gpa: 3.9,
      status: "approved",
      documents: ["Research Proposal", "Academic Records"],
    },
  ]);

  const columns = [
    {
      accessorKey: "studentName",
      header: "Student Name",
    },
    {
      accessorKey: "program",
      header: "Program",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }: any) => (
        <span>${row.original.amount.toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "gpa",
      header: "GPA",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === "approved"
              ? "bg-green-100 text-green-800"
              : row.original.status === "rejected"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewDetails(row.original)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.original.status === "pending" && (
            <>
              <button
                onClick={() => handleUpdateStatus(row.original.id, "approved")}
                className="p-1 hover:bg-gray-100 rounded-full text-green-600"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleUpdateStatus(row.original.id, "rejected")}
                className="p-1 hover:bg-gray-100 rounded-full text-red-600"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => handleViewDocuments(row.original)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="View Documents"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (application: ScholarshipApplication) => {
    toast.success("Viewing details for: " + application.studentName);
  };

  const handleUpdateStatus = (
    id: string,
    newStatus: ScholarshipApplication["status"]
  ) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    toast.success(`Application ${newStatus}`);
  };

  const handleViewDocuments = (application: ScholarshipApplication) => {
    toast.success("Viewing documents for: " + application.studentName);
  };

  const handleExport = () => {
    exportToExcel(applications, "scholarship-applications");
    toast.success("Applications exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage scholarship applications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {["Total", "Pending", "Approved", "Rejected"].map((status, _index) => (
          <div
            key={status}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-medium text-gray-500">{status}</h3>
            <p className="text-2xl font-semibold mt-1">
              {
                applications.filter((app) =>
                  status === "Total"
                    ? true
                    : app.status === status.toLowerCase()
                ).length
              }
            </p>
          </div>
        ))}
      </div>

      <DataTable
        data={applications}
        columns={columns}
        onExport={handleExport}
      />
    </div>
  );
}
