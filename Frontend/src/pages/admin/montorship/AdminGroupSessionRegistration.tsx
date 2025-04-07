"use client"

import { useState, useEffect } from "react"

interface Registration {
  _id: string
  orderId: string
  paymentId?: string
  groupSessionId: string
  title: string
  firstName: string
  lastName: string
  email: string
  phone: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  paymentMethod: 'paypal' | 'credit_card'
  createdAt: string
  updatedAt: string
}

const AdminGroupSessionRegistration = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/payments/group-paypal/registrations`
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        if (!data.success) {
          throw new Error(data.error || 'Unknown error occurred')
        }
        
        setRegistrations(data.data || [])
        setFilteredRegistrations(data.data || [])
      } catch (err) {
        console.error("Registration fetch error:", err)
        setError(err instanceof Error ? err.message : 'Failed to load registrations')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRegistrations()
  }, [])

  useEffect(() => {
    const filterRegistrations = () => {
      if (!searchTerm) {
        setFilteredRegistrations(registrations)
        return
      }

      const term = searchTerm.toLowerCase()
      const filtered = registrations.filter((reg) => {
        return (
          reg.firstName.toLowerCase().includes(term) ||
          reg.lastName.toLowerCase().includes(term) ||
          reg.email.toLowerCase().includes(term) ||
          reg.title.toLowerCase().includes(term) ||
          reg.phone.toLowerCase().includes(term) ||
          reg.orderId.toLowerCase().includes(term)
        )
      })
      setFilteredRegistrations(filtered)
    }

    filterRegistrations()
  }, [searchTerm, registrations])

  const exportToCSV = () => {
    const headers = [
      "Session Title", 
      "First Name", 
      "Last Name", 
      "Email", 
      "Phone", 
      "Status", 
      "Amount",
      "Payment Method",
      "Order ID",
      "Payment ID",
      "Date"
    ]

    const csvRows = [
      headers.join(","),
      ...filteredRegistrations.map((reg) =>
        [
          `"${reg.title}"`,
          `"${reg.firstName}"`,
          `"${reg.lastName}"`,
          `"${reg.email}"`,
          `"${reg.phone}"`,
          `"${reg.status}"`,
          `"$${reg.amount.toFixed(2)}"`,
          `"${reg.paymentMethod}"`,
          `"${reg.orderId}"`,
          `"${reg.paymentId || 'N/A'}"`,
          `"${new Date(reg.createdAt).toLocaleDateString()}"`
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `group-session-registrations-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white"
      case "failed":
        return "bg-red-500 text-white"
      default:
        return "bg-yellow-500 text-white"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading registrations...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            className="flex items-center mr-2 px-3 py-2 rounded hover:bg-gray-100 border border-gray-300"
            onClick={() => window.history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-bold">Group Session Registrations</h1>
        </div>
        {registrations.length > 0 && (
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={exportToCSV}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Registrations</h2>
              <p className="text-sm text-gray-500 mt-1">
                {registrations.length} total registration{registrations.length !== 1 ? 's' : ''}
                {searchTerm && ` (${filteredRegistrations.length} filtered)`}
              </p>
            </div>
            <div className="w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    {registrations.length === 0 
                      ? "No registrations found" 
                      : "No matching registrations found"}
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((registration) => (
                  <tr key={registration._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {`${registration.firstName} ${registration.lastName}`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{registration.email}</div>
                      <div className="text-gray-500">{registration.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{registration.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">${registration.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 capitalize">
                        {registration.paymentMethod}
                      </div>
                      <div className="text-xs text-gray-500">{registration.orderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyle(registration.status)}`}
                      >
                        {registration.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(registration.createdAt).toLocaleDateString()}
                        <div className="text-xs text-gray-400">
                          {new Date(registration.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminGroupSessionRegistration