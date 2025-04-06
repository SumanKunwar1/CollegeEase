"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { utils, writeFile } from "xlsx"

interface Booking {
  _id: string
  studentName: string
  studentEmail: string
  date: string
  time: string
  notes: string
  mentorId: string
  createdAt: string
}

interface FilterState {
  dateFrom: string
  dateTo: string
  searchTerm: string
}

const AdminBookSession = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Booking | null
    direction: "ascending" | "descending"
  }>({ key: null, direction: "ascending" })

  const [filters, setFilters] = useState<FilterState>({
    dateFrom: "",
    dateTo: "",
    searchTerm: "",
  })

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const apiClient = axios.create({
          baseURL: import.meta.env.VITE_API_BASE_URL,
        });
    
        const response = await apiClient.get("/bookings"); // Changed from "/api/v1/bookings" to "/bookings"
        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings()
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...bookings]

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      result = result.filter(
        (booking) =>
          booking.studentName.toLowerCase().includes(searchLower) ||
          booking.studentEmail.toLowerCase().includes(searchLower) ||
          booking.notes.toLowerCase().includes(searchLower),
      )
    }

    // Apply date range filter
    if (filters.dateFrom) {
      result = result.filter((booking) => new Date(booking.date) >= new Date(filters.dateFrom))
    }

    if (filters.dateTo) {
      result = result.filter((booking) => new Date(booking.date) <= new Date(filters.dateTo))
    }

    setFilteredBookings(result)
  }, [filters, bookings])

  // Handle sorting
  const requestSort = (key: keyof Booking) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedData = [...filteredBookings].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredBookings(sortedData)
  }

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      searchTerm: "",
    })
  }

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(filteredBookings)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "Bookings")

    // Format column widths
    const colWidths = [
      { wch: 10 }, // id
      { wch: 20 }, // studentName
      { wch: 25 }, // studentEmail
      { wch: 12 }, // date
      { wch: 10 }, // time
      { wch: 30 }, // notes
      { wch: 10 }, // mentorId
      { wch: 20 }, // createdAt
    ]

    worksheet["!cols"] = colWidths

    // Generate filename with current date
    const fileName = `bookings_export_${new Date().toISOString().split("T")[0]}.xlsx`

    writeFile(workbook, fileName)
  }

  // Render sort indicator
  const getSortIndicator = (key: keyof Booking) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === "ascending" ? " ↑" : " ↓"
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Management</h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Name, email or notes"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition mr-2"
            >
              Reset Filters
            </button>

            <button
              onClick={exportToExcel}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              disabled={filteredBookings.length === 0}
            >
              Export to Excel
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No bookings found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("studentName")}
                  >
                    Student Name {getSortIndicator("studentName")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("studentEmail")}
                  >
                    Email {getSortIndicator("studentEmail")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("date")}
                  >
                    Date {getSortIndicator("date")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("time")}
                  >
                    Time {getSortIndicator("time")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("mentorId")}
                  >
                    Mentor ID {getSortIndicator("mentorId")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("createdAt")}
                  >
                    Created At {getSortIndicator("createdAt")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.studentEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{booking.notes || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.mentorId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      </div>
    </div>
  )
}

export default AdminBookSession

