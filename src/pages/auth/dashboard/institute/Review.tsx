import { useState } from "react";
import { DataTable } from "../../../../components/auth/DataTable";
import { Star, MessageSquare, ThumbsUp, Flag } from "lucide-react";
import { exportToExcel } from "../../../../lib/export";
import toast from "react-hot-toast";

interface Review {
  id: string;
  studentName: string;
  program: string;
  rating: number;
  comment: string;
  date: string;
  status: "published" | "hidden";
  helpful: number;
  reported: boolean;
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      studentName: "Alex Johnson",
      program: "B.Tech Computer Science",
      rating: 4.5,
      comment: "Excellent faculty and great learning environment.",
      date: "2024-03-15",
      status: "published",
      helpful: 12,
      reported: false,
    },
    {
      id: "2",
      studentName: "Sarah Williams",
      program: "M.Tech Artificial Intelligence",
      rating: 5,
      comment: "State-of-the-art facilities and cutting-edge curriculum.",
      date: "2024-03-14",
      status: "published",
      helpful: 8,
      reported: false,
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
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1">{row.original.rating}</span>
        </div>
      ),
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }: any) => (
        <div className="max-w-md truncate">{row.original.comment}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
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
            onClick={() => handleToggleStatus(row.original.id)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title={row.original.status === "published" ? "Hide" : "Show"}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleHelpful(row.original.id)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="Mark as helpful"
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleReport(row.original.id)}
            className="p-1 hover:bg-gray-100 rounded-full text-red-600"
            title="Report"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleToggleStatus = (id: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status: review.status === "published" ? "hidden" : "published",
            }
          : review
      )
    );
    toast.success("Review status updated");
  };

  const handleHelpful = (id: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, helpful: review.helpful + 1 } : review
      )
    );
    toast.success("Marked as helpful");
  };

  const handleReport = (id: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, reported: true } : review
      )
    );
    toast.success("Review reported");
  };

  const handleExport = () => {
    exportToExcel(reviews, "reviews");
    toast.success("Reviews exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and moderate student reviews
          </p>
        </div>
      </div>

      <DataTable data={reviews} columns={columns} onExport={handleExport} />
    </div>
  );
}
