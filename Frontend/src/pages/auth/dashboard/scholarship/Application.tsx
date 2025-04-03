import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataTable } from "../../../../components/auth/DataTable";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";
import axios from "axios";

interface ScholarshipApplication {
  _id: string;
  studentName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  currentEducation: string;
  institution: string;
  gpa: number;
  graduationDate: string;
  testScores: {
    sat?: number;
    act?: number;
    toefl?: number;
    ielts?: number;
  };
  programLevel: string;
  intendedMajor: string;
  scholarshipType: string;
  financialAid: boolean;
  familyIncome?: number;
  achievements?: string;
  status: "pending" | "approved" | "rejected";
  organization: string;
  createdAt: string;
  updatedAt: string;
}

export function ScholarshipApplications() {
  const { organizationName } = useParams();
  const [applications, setApplications] = useState<ScholarshipApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/scholarship-applications/${encodeURIComponent(organizationName || '')}/applications`,
          {
            withCredentials: true,
          }
        );
        setApplications(response.data.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to load applications");
      } finally {
        setIsLoading(false);
      }
    };

    if (organizationName) {
      fetchApplications();
    }
  }, [organizationName]);

  const columns = [
    {
      accessorKey: "studentName",
      header: "Student Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "programLevel",
      header: "Program Level",
    },
    {
      accessorKey: "intendedMajor",
      header: "Intended Major",
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
      accessorKey: "createdAt",
      header: "Applied Date",
      cell: ({ row }: any) => (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
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
                onClick={() => handleUpdateStatus(row.original._id, "approved")}
                className="p-1 hover:bg-gray-100 rounded-full text-green-600"
                title="Approve"
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
        </div>
      ),
    },
  ];

  const handleViewDetails = (application: ScholarshipApplication) => {
    // You can implement a modal or navigate to a details page here
    toast.success(`Viewing details for: ${application.studentName}`);
    console.log("Application details:", application);
  };

  const handleUpdateStatus = async (
    id: string,
    newStatus: ScholarshipApplication["status"]
  ) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/scholarship-applications/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      setApplications(
        applications.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      toast.success(`Application ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update application status");
    }
  };

  const handleExport = () => {
    const exportData = applications.map(app => ({
      "Student Name": app.studentName,
      "Email": app.email,
      "Phone": app.phone,
      "Date of Birth": new Date(app.dateOfBirth).toLocaleDateString(),
      "Nationality": app.nationality,
      "Address": app.address,
      "Current Education": app.currentEducation,
      "Institution": app.institution,
      "GPA": app.gpa,
      "Graduation Date": new Date(app.graduationDate).toLocaleDateString(),
      "SAT Score": app.testScores?.sat || "N/A",
      "TOEFL Score": app.testScores?.toefl || "N/A",
      "IELTS Score": app.testScores?.ielts || "N/A",
      "Program Level": app.programLevel,
      "Intended Major": app.intendedMajor,
      "Scholarship Type": app.scholarshipType,
      "Financial Aid Needed": app.financialAid ? "Yes" : "No",
      "Family Income (USD)": app.familyIncome || "N/A",
      "Achievements": app.achievements || "N/A",
      "Status": app.status,
      "Applied Date": new Date(app.createdAt).toLocaleDateString(),
    }));
    
    exportToExcel(exportData, `${organizationName}-scholarship-applications`);
    toast.success("Applications exported successfully with all details");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage scholarship applications for {organizationName}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Export to Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total</h3>
          <p className="text-2xl font-semibold mt-1">{applications.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-semibold mt-1">
            {applications.filter(app => app.status === "pending").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="text-2xl font-semibold mt-1">
            {applications.filter(app => app.status === "approved").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
          <p className="text-2xl font-semibold mt-1">
            {applications.filter(app => app.status === "rejected").length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <DataTable
          data={applications}
          columns={columns}
        />
      </div>
    </div>
  );
}