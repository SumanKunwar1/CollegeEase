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
  Building,
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
  id: string;
  studentId: string;
  donorId: string;
  amount: number;
  date: string;
  // Add other donation properties as needed
}

type Donor = {
  id: string;
  fullName: string;
  organization?: string;
  // Add other donor properties as needed
}

export default function StudentDashboard() {
  const { id } = useParams()
  const [student, setStudent] = useState<any>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/students/dashboard/${id}`
        )
        
        if (studentResponse.data.success) {
          setStudent(studentResponse.data.student)
        }

        // In a real app, you would fetch donations and donors from your API
        // For now, we'll use mock data similar to your original implementation
        const mockDonations: Donation[] = [
          {
            id: "1",
            studentId: id || "",
            donorId: "1",
            amount: 5,
            date: new Date().toISOString()
          },
          {
            id: "2",
            studentId: id || "",
            donorId: "2",
            amount: 3,
            date: new Date(Date.now() - 86400000).toISOString()
          }
        ]

        const mockDonors: Donor[] = [
          {
            id: "1",
            fullName: "John Doe",
            organization: "ABC Foundation"
          },
          {
            id: "2",
            fullName: "Jane Smith",
            organization: "XYZ Charity"
          }
        ]

        setDonations(mockDonations)
        setDonors(mockDonors)

      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Student data not found</h1>
        </div>
      </div>
    )
  }

  // Calculate total amount received
  const totalReceived = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const progressPercentage = Math.min((totalReceived / student.amountNeeded) * 100, 100)

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
                      Organization
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {donations.map((donation) => {
                    const donor = donors.find((d) => d.id === donation.donorId)

                    return (
                      <tr key={donation.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                            {new Date(donation.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-blue-600 mr-2" />
                            {donor?.fullName || "Anonymous"}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 text-blue-600 mr-2" />
                            {donor?.organization || "N/A"}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-green-600">
                          <div className="flex items-center justify-end">
                            <CreditCard className="h-4 w-4 text-green-600 mr-2" />${donation.amount.toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
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