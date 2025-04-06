import { useState } from "react";
import { DataTable } from "../../../../components/auth/DataTable";
import { Eye, CheckCircle, XCircle, Calendar } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";

interface Application {
  id: string;
  candidateName: string;
  jobTitle: string;
  appliedDate: string;
  experience: string;
  status: "pending" | "shortlisted" | "rejected" | "hired";
  resume: string;
}

export function IndustryApplications() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      candidateName: "John Smith",
      jobTitle: "Senior Software Engineer",
      appliedDate: "2024-03-15",
      experience: "6 years",
      status: "pending",
      resume: "john-smith-resume.pdf",
    },
    {
      id: "2",
      candidateName: "Sarah Johnson",
      jobTitle: "Product Manager",
      appliedDate: "2024-03-14",
      experience: "4 years",
      status: "shortlisted",
      resume: "sarah-johnson-resume.pdf",
    },
  ]);

  const columns = [
    {
      accessorKey: "candidateName",
      header: "Candidate Name",
    },
    {
      accessorKey: "jobTitle",
      header: "Job Title",
    },
    {
      accessorKey: "appliedDate",
      header: "Applied Date",
    },
    {
      accessorKey: "experience",
      header: "Experience",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === "hired"
              ? "bg-green-100 text-green-800"
              : row.original.status === "shortlisted"
              ? "bg-blue-100 text-blue-800"
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
            onClick={() => handleViewProfile(row.original)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="View Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.original.status === "pending" && (
            <>
              <button
                onClick={() =>
                  handleUpdateStatus(row.original.id, "shortlisted")
                }
                className="p-1 hover:bg-gray-100 rounded-full text-green-600"
                title="Shortlist"
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
          {row.original.status === "shortlisted" && (
            <button
              onClick={() => handleScheduleInterview(row.original)}
              className="p-1 hover:bg-gray-100 rounded-full text-blue-600"
              title="Schedule Interview"
            >
              <Calendar className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleViewProfile = (application: Application) => {
    toast.success("Viewing profile: " + application.candidateName);
  };

  const handleUpdateStatus = (id: string, newStatus: Application["status"]) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    toast.success(`Application ${newStatus}`);
  };

  const handleScheduleInterview = (application: Application) => {
    toast.success("Schedule interview with: " + application.candidateName);
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
            Review and manage job applications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {["Total", "Pending", "Shortlisted", "Hired"].map((status) => (
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
