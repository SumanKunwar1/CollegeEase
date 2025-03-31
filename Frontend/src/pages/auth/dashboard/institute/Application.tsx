import { useState, useEffect } from "react";
import { DataTable } from "../../../../components/auth/DataTable";
import { Eye, CheckCircle, XCircle, MailOpen, Download } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api/v1';

interface Document {
  type: string;
  fileName: string;
  filePath: string;
}

interface PreviousEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  gpa: string;
  graduationDate: string;
}

interface Application {
  _id: string;
  collegeName: string;
  studentName: string;
  email: string;
  phone: string;
  program: string;
  level: string;
  intake: string;
  documents: Document[];
  status: "pending" | "approved" | "rejected";
  testScore?: string;
  interviewDate?: string;
  firstName: string;
  lastName: string;
  dob: string;
  nationality: string;
  testType?: string;
  testDate?: string;
  projects?: string;
  publications?: string;
  researchExperience?: string;
  workExperience?: string;
  statementOfPurpose: string;
  previousEducation: PreviousEducation[];
  createdAt: string;
}

export function Applications() {
  const { organizationName } = useParams<{ organizationName: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_BASE_URL}/applications/${organizationName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setApplications(response.data.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [organizationName]);

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
      cell: ({ row }: any) => (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "testScore",
      header: "Test Score",
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <span className="font-medium text-gray-600">
            {row.original.testScore || 'N/A'}
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
          <button
            onClick={() => handleDownloadDocuments(row.original)}
            className="p-1 hover:bg-gray-100 rounded-full text-blue-600"
            title="Download Documents"
          >
            <Download className="w-4 h-4" />
          </button>
          {row.original.status === "pending" && (
            <>
              <button
                onClick={() => handleUpdateStatus(row.original._id, 'approved')}
                className="p-1 hover:bg-gray-100 rounded-full text-green-600"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleUpdateStatus(row.original._id, 'rejected')}
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
    // Here you can show a modal with all details
    toast.success(`Viewing details for: ${application.studentName}`);
    console.log("Application details:", application);
  };

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(
        `${API_BASE_URL}/applications/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setApplications(applications.map(app => 
          app._id === id ? { ...app, status } : app
        ));
        toast.success(`Application ${status}`);
      } else {
        throw new Error(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  const handleDownloadDocuments = async (application: Application) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Download documents as zip
      const response = await axios.get(`${API_BASE_URL}/applications/${application._id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${application.studentName}_documents.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Export form data as Excel
      const formData = {
        'Student Name': application.studentName,
        'Email': application.email,
        'Phone': application.phone,
        'Program': application.program,
        'Level': application.level,
        'Intake': application.intake,
        'Status': application.status,
        'Test Score': application.testScore || 'N/A',
        'Test Type': application.testType || 'N/A',
        'Test Date': application.testDate || 'N/A',
        'Interview Date': application.interviewDate || 'N/A',
        'Applied Date': new Date(application.createdAt).toLocaleDateString(),
        'Date of Birth': application.dob,
        'Nationality': application.nationality,
        'Projects': application.projects || 'N/A',
        'Publications': application.publications || 'N/A',
        'Research Experience': application.researchExperience || 'N/A',
        'Work Experience': application.workExperience || 'N/A',
        'Statement of Purpose': application.statementOfPurpose,
      };

      exportToExcel([formData], `${application.studentName}_application_data`);
      
      toast.success('Documents and form data downloaded successfully');
    } catch (error) {
      console.error('Error downloading documents:', error);
      toast.error('Failed to download documents');
    }
  };

  const handleSendMessage = (application: Application) => {
    toast.success(`Sending message to: ${application.studentName}`);
  };

  const handleExport = (selectedRows?: Application[]) => {
    const dataToExport = selectedRows || applications;
    
    if (dataToExport.length === 0) {
      toast.error('No applications to export');
      return;
    }

    // Format the data for export
    const formattedData = dataToExport.map(app => ({
      'Student Name': app.studentName,
      'Email': app.email,
      'Phone': app.phone,
      'Program': app.program,
      'Level': app.level,
      'Intake': app.intake,
      'Status': app.status,
      'Test Score': app.testScore || 'N/A',
      'Test Type': app.testType || 'N/A',
      'Test Date': app.testDate || 'N/A',
      'Interview Date': app.interviewDate || 'N/A',
      'Applied Date': new Date(app.createdAt).toLocaleDateString(),
      'Date of Birth': app.dob,
      'Nationality': app.nationality,
      'Projects': app.projects || 'N/A',
      'Publications': app.publications || 'N/A',
      'Research Experience': app.researchExperience || 'N/A',
      'Work Experience': app.workExperience || 'N/A',
      'Statement of Purpose': app.statementOfPurpose.substring(0, 100) + (app.statementOfPurpose.length > 100 ? '...' : ''),
    }));

    const fileName = selectedRows 
      ? `applications_${selectedRows.length}_selected` 
      : `applications_${applications.length}_all`;

    exportToExcel(formattedData, fileName);
    toast.success(`Exported ${formattedData.length} applications`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading Applications...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage student applications for {organizationName}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Export All
          </button>
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