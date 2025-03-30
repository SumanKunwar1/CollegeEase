import { useState } from "react";
import { DataTable } from "../../../../components/auth/DataTable";
import { Eye, CheckCircle, XCircle, MailOpen } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";

interface Application {
  id: string;
  studentName: string;
  program: string;
  appliedDate: string;
  status: "pending" | "approved" | "rejected";
  documents: string[];
  score: number;
  interviewDate?: string;
}

export function Applications() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      studentName: "John Smith",
      program: "B.Tech Computer Science",
      appliedDate: "2024-03-10",
      status: "pending",
      documents: ["Academic Transcripts", "Statement of Purpose"],
      score: 85,
    },
    {
      id: "2",
      studentName: "Emma Davis",
      program: "M.Tech Artificial Intelligence",
      appliedDate: "2024-03-12",
      status: "approved",
      documents: ["Bachelor's Degree", "GATE Score Card"],
      score: 92,
      interviewDate: "2024-03-20",
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
      accessorKey: "appliedDate",
      header: "Applied Date",
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <span
            className={`font-medium ${
              row.original.score >= 90
                ? "text-green-600"
                : row.original.score >= 75
                ? "text-blue-600"
                : "text-gray-600"
            }`}
          >
            {row.original.score}%
          </span>
        </div>
      ),
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
                onClick={() => handleApprove(row.original.id)}
                className="p-1 hover:bg-gray-100 rounded-full text-green-600"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleReject(row.original.id)}
                className="p-1 hover:bg-gray-100 rounded-full text-red-600"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => handleSendMessage(row.original)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="Send Message"
          >
            <MailOpen className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (application: Application) => {
    toast.success("Viewing details for: " + application.studentName);
  };

  const handleApprove = (id: string) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? { ...app, status: "approved", interviewDate: "2024-03-25" }
          : app
      )
    );
    toast.success("Application approved");
  };

  const handleReject = (id: string) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
    toast.success("Application rejected");
  };

  const handleSendMessage = (application: Application) => {
    toast.success("Sending message to: " + application.studentName);
  };

  const handleExport = () => {
    exportToExcel(applications, "applications");
    toast.success("Applications exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage student applications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {["Total", "Pending", "Approved", "Rejected"].map((status) => (
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
