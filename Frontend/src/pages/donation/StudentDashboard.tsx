import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  Mail,
  BookOpen,
  DollarSign,
} from "lucide-react";
import { storage } from "../../data/donationregistration";
import type { Student } from "../../types/donationregistration";

const StatusIcon = ({ status }: { status: Student["status"] }) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case "rejected":
      return <XCircle className="h-6 w-6 text-red-500" />;
    default:
      return <Clock className="h-6 w-6 text-yellow-500" />;
  }
};

const StatusBadge = ({ status }: { status: Student["status"] }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const currentUser = storage.getCurrentUser();

  useEffect(() => {
    if (currentUser?.id) {
      const studentData = storage
        .getStudents()
        .find((s) => s.id === currentUser.id);
      if (studentData) {
        setStudent(studentData);
      }
    }
  }, [currentUser?.id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-blue-600">
              Application Status
            </h1>
            <StatusBadge status={student.status} />
          </div>
          <div className="border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-blueb-600" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Full Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {student.fullName}
                  </dd>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-blueb-600" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {student.email}
                  </dd>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Cause</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {student.cause}
                  </dd>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Amount Needed
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    ${student.amountNeeded.toFixed(2)}
                  </dd>
                </div>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Application Timeline
          </h2>
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <div className="relative flex items-center space-x-3">
                    <div>
                      <StatusIcon status={student.status} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm text-gray-500">
                          Application {student.status}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Uploaded Documents
          </h2>
          <ul className="divide-y divide-gray-200">
            {student.documents.map((doc, index) => (
              <li
                key={index}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-900">{doc}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-500">
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
