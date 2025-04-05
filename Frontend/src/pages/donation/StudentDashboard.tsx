"use client"

import { useEffect, useState } from "react"
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  BookOpen,
  DollarSign,
  Calendar,
  CreditCard,
  Loader2
} from "lucide-react"
import axios from "axios"
import { useParams } from "react-router-dom"

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-6 w-6 text-green-500" />
    case "rejected":
      return <XCircle className="h-6 w-6 text-red-500" />
    default:
      return <Clock className="h-6 w-6 text-yellow-500" />
  }
}

const StatusBadge = ({ status }: { status: 'pending' | 'approved' | 'rejected' }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

type Donation = {
  _id: string;
  amount: number;
  createdAt: string;
  donorName?: string;
  isAnonymous: boolean;
  paymentMethod: string;
};

type Student = {
  _id: string;
  fullName: string;
  email: string;
  cause: string;
  description: string;
  amountNeeded: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

export default function StudentDashboard() {
  const { name } = useParams()
  const [student, setStudent] = useState<Student | null>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!name) {
          throw new Error("No student name provided");
        }

        setLoading(true);
        setError(null);

        // Fetch student data with donations
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/students/dashboard/${name}`
        );
        
        if (response.data.success) {
          setStudent(response.data.student);
          setDonations(response.data.donations || []);
        } else {
          throw new Error(response.data.message || "Failed to fetch student data");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error loading dashboard</h1>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Student data not found</h1>
          <p className="mt-2 text-gray-600">Please check if the student name is correct</p>
        </div>
      </div>
    )
  }

  const totalReceived = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const progressPercentage = Math.min((totalReceived / student.amountNeeded) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-blue-600">Application Status</h1>
            <StatusBadge status={student.status} />
          </div>
          <div className="border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{student.fullName}</dd>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{student.email}</dd>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Cause</dt>
                  <dd className="mt-1 text-sm text-gray-900">{student.cause}</dd>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Amount Needed</dt>
                  <dd className="mt-1 text-sm text-gray-900">${student.amountNeeded.toFixed(2)}</dd>
                </div>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.description}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Donations Received Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Donations Received</h2>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Fundraising Progress</span>
              <span className="text-sm font-medium text-gray-700">
                ${totalReceived.toFixed(2)} of ${student.amountNeeded.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">Total Donations</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${totalReceived.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">Donations Count</h3>
              <p className="text-2xl font-bold text-green-600">
                {donations.length}
              </p>
            </div>
          </div>

          {donations.length > 0 ? (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Donor
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Payment Method
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {donations.map((donation) => (
                    <tr key={donation._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-blue-600 mr-2" />
                          {donation.isAnonymous ? "Anonymous" : donation.donorName || "Anonymous"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-blue-600 mr-2" />
                          {donation.paymentMethod === 'paypal' ? 'PayPal' : 'Credit Card'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-green-600">
                        <div className="flex items-center justify-end">
                          <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                          ${donation.amount.toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <th
                      scope="row"
                      colSpan={3}
                      className="pl-4 pr-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Total Received
                    </th>
                    <td className="px-3 py-3.5 text-right text-sm font-semibold text-green-600">
                      ${totalReceived.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p>No donations received yet.</p>
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Application Timeline</h2>
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
                        <p className="text-sm text-gray-500">Application {student.status}</p>
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
      </div>
    </div>
  )
}