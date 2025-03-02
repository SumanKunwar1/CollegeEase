import { useState } from "react";
import { DataTable } from "../../../../components/auth/DataTable";
import { Plus, Pencil, Trash2, PauseCircle, PlayCircle } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
  applications: number;
  status: "active" | "paused" | "closed";
  postedDate: string;
}

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      applications: 45,
      status: "active",
      postedDate: "2024-03-15",
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "New York",
      type: "Full-time",
      experience: "3+ years",
      applications: 28,
      status: "active",
      postedDate: "2024-03-14",
    },
  ]);

  const columns = [
    {
      accessorKey: "title",
      header: "Job Title",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "applications",
      header: "Applications",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === "active"
              ? "bg-green-100 text-green-800"
              : row.original.status === "paused"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
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
            onClick={() => handleEdit(row.original)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          {row.original.status === "active" ? (
            <button
              onClick={() => handleToggleStatus(row.original.id, "paused")}
              className="p-1 hover:bg-gray-100 rounded-full text-yellow-600"
              title="Pause"
            >
              <PauseCircle className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleToggleStatus(row.original.id, "active")}
              className="p-1 hover:bg-gray-100 rounded-full text-green-600"
              title="Activate"
            >
              <PlayCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-1 hover:bg-gray-100 rounded-full text-red-600"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (job: Job) => {
    toast.success("Edit job: " + job.title);
  };

  const handleToggleStatus = (
    id: string,
    newStatus: "active" | "paused" | "closed"
  ) => {
    setJobs(
      jobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
    toast.success(`Job ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id));
    toast.success("Job deleted successfully");
  };

  const handleExport = () => {
    exportToExcel(jobs, "jobs");
    toast.success("Jobs exported successfully");
  };
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Jobs</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage job postings and track applications
          </p>
        </div>
        <button
          onClick={() => navigate(`/dashboard/industry/jobs/post-new-job`)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Post New Job</span>
        </button>
      </div>

      <DataTable data={jobs} columns={columns} onExport={handleExport} />
    </div>
  );
}
