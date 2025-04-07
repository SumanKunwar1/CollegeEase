import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataTable } from "../../../../components/auth/DataTable";
import { Eye, CheckCircle, XCircle, Calendar } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";
import axios from "axios";

interface Application {
  _id: string;
  name: string;
  email: string;
  jobTitle: string;
  jobId: string;
  createdAt: string;
  educationLevel: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  coverLetter: string;
  phone: string;
  address: string;
}

export function IndustryApplications() {
  const { organizationName } = useParams<{ organizationName: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/application-forms/company/${organizationName}`
        );
        setApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    if (organizationName) {
      fetchApplications();
    }
  }, [organizationName]);

  const columns = [
    {
      accessorKey: "name",
      header: "Candidate Name",
    },
    {
      accessorKey: "jobTitle",
      header: "Job Title",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "createdAt",
      header: "Applied Date",
      cell: ({ row }: any) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "educationLevel",
      header: "Education Level",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === "accepted"
              ? "bg-blue-100 text-blue-800"
              : row.original.status === "reviewed"
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
                onClick={() => handleUpdateStatus(row.original._id, "reviewed")}
                className="p-1 hover:bg-gray-100 rounded-full text-blue-600"
                title="Mark as Reviewed"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleUpdateStatus(row.original._id, "rejected")}
                className="p-1 hover:bg-gray-100 rounded-full text-red-600"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
          {row.original.status === "reviewed" && (
            <>
              <button
                onClick={() => handleUpdateStatus(row.original._id, "accepted")}
                className="p-1 hover:bg-gray-100 rounded-full text-blue-600"
                title="Accept"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScheduleInterview(row.original)}
                className="p-1 hover:bg-gray-100 rounded-full text-blue-600"
                title="Schedule Interview"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleViewProfile = (application: Application) => {
    // Here you can show a modal with full application details
    toast.success(`Viewing ${application.name}'s application`);
    console.log("Application details:", application);
  };

  const handleUpdateStatus = async (id: string, newStatus: Application["status"]) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/application-forms/${id}/status`,
        { status: newStatus }
      );
      
      setApplications(applications.map(app => 
        app._id === id ? { ...app, status: newStatus } : app
      ));
      
      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleScheduleInterview = (application: Application) => {
    toast.success(`Schedule interview with ${application.name}`);
    // Here you would typically open a modal or navigate to a scheduling page
  };

  const handleExport = () => {
    const dataForExport = applications.map(app => ({
      "Candidate Name": app.name,
      "Job Title": app.jobTitle,
      "Email": app.email,
      "Applied Date": new Date(app.createdAt).toLocaleDateString(),
      "Education Level": app.educationLevel,
      "Status": app.status,
      "Phone": app.phone,
      "Address": app.address
    }));
    exportToExcel(dataForExport, `${organizationName}-applications`);
    toast.success("Applications exported successfully");
  };

  const statusCounts = {
    Total: applications.length,
    pending: applications.filter(app => app.status === "pending").length,
    reviewed: applications.filter(app => app.status === "reviewed").length,
    accepted: applications.filter(app => app.status === "accepted").length,
    rejected: applications.filter(app => app.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage job applications for {decodeURIComponent(organizationName || "")}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Export to Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-medium text-gray-500">{status}</h3>
            <p className="text-2xl font-semibold mt-1">{count}</p>
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