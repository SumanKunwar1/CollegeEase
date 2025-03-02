import { useState } from "react";
import { DataTable } from "../../../../components/auth/DataTable";
import { Plus, Pencil, Trash2, PauseCircle, PlayCircle } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ScholarshipProgram {
  id: string;
  name: string;
  amount: number;
  duration: string;
  eligibility: string;
  deadline: string;
  applications: number;
  status: "active" | "paused" | "closed";
}

export function ScholarshipPrograms() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<ScholarshipProgram[]>([
    {
      id: "1",
      name: "Merit Scholarship",
      amount: 10000,
      duration: "1 year",
      eligibility: "GPA 3.5+",
      deadline: "2024-06-30",
      applications: 245,
      status: "active",
    },
    {
      id: "2",
      name: "Research Grant",
      amount: 15000,
      duration: "2 years",
      eligibility: "Graduate Students",
      deadline: "2024-07-15",
      applications: 120,
      status: "active",
    },
  ]);

  const columns = [
    {
      accessorKey: "name",
      header: "Program Name",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }: any) => (
        <span>${row.original.amount.toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
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
            onClick={() => handleEdit(row.original.id)} // Pass the program ID to handleEdit
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

  const handleEdit = (id: string) => {
    // Redirect to the edit page with the program ID
    navigate(`/dashboard/scholarship/${id}/programs/edit-program`);
  };

  const handleToggleStatus = (
    id: string,
    newStatus: "active" | "paused" | "closed"
  ) => {
    setPrograms(
      programs.map((program) =>
        program.id === id ? { ...program, status: newStatus } : program
      )
    );
    toast.success(`Program ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    setPrograms(programs.filter((p) => p.id !== id));
    toast.success("Program deleted successfully");
  };

  const handleExport = () => {
    exportToExcel(programs, "scholarship-programs");
    toast.success("Programs exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Scholarship Programs
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage scholarship programs and track applications
          </p>
        </div>
        <button
          onClick={() => navigate(`add-new-program`)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Program</span>
        </button>
      </div>

      <DataTable data={programs} columns={columns} onExport={handleExport} />
    </div>
  );
}
