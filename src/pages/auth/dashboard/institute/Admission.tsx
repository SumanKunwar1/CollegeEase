import { useState } from "react";
import { DataTable } from "../../../../components/auth/DataTable";
import { Plus, FileEdit, Trash2, Download } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";

interface Admission {
  id: string;
  program: string;
  startDate: string;
  endDate: string;
  totalSeats: number;
  filledSeats: number;
  status: "open" | "closed" | "upcoming";
  requirements: string[];
}

export function Admissions() {
  const [admissions, setAdmissions] = useState<Admission[]>([
    {
      id: "1",
      program: "B.Tech Computer Science",
      startDate: "2024-06-01",
      endDate: "2024-07-15",
      totalSeats: 120,
      filledSeats: 0,
      status: "upcoming",
      requirements: ["12th Grade Certificate", "Entrance Exam Score"],
    },
    {
      id: "2",
      program: "M.Tech Artificial Intelligence",
      startDate: "2024-05-01",
      endDate: "2024-06-15",
      totalSeats: 60,
      filledSeats: 45,
      status: "open",
      requirements: ["Bachelor's Degree", "GATE Score"],
    },
  ]);

  const columns = [
    {
      accessorKey: "program",
      header: "Program",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      accessorKey: "seats",
      header: "Seats",
      cell: ({ row }: any) => (
        <div>
          {row.original.filledSeats}/{row.original.totalSeats}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${
                  (row.original.filledSeats / row.original.totalSeats) * 100
                }%`,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === "open"
              ? "bg-green-100 text-green-800"
              : row.original.status === "upcoming"
              ? "bg-blue-100 text-blue-800"
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
          >
            <FileEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-1 hover:bg-gray-100 rounded-full text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDownloadRequirements(row.original)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (admission: Admission) => {
    toast.success("Edit admission: " + admission.program);
  };

  const handleDelete = (id: string) => {
    setAdmissions(admissions.filter((a) => a.id !== id));
    toast.success("Admission deleted successfully");
  };

  const handleDownloadRequirements = (admission: Admission) => {
    const content = admission.requirements.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${admission.program}-requirements.txt`;
    link.click();
    toast.success("Requirements downloaded");
  };

  const handleExport = () => {
    exportToExcel(admissions, "admissions");
    toast.success("Admissions data exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Admissions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage admission cycles and requirements
          </p>
        </div>
        <button
          onClick={() => toast.success("Add new admission cycle")}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>New Admission Cycle</span>
        </button>
      </div>

      <DataTable data={admissions} columns={columns} onExport={handleExport} />
    </div>
  );
}
