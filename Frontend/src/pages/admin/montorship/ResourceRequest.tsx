"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Download, Search } from "lucide-react"

// Define the type for resource request data
interface ResourceRequest {
  _id: string
  name: string
  age: number
  academicBackground: string
  country: string
  requestedResources: string
  createdAt: string
}

export default function ResourceAdminDashboard() {
  const [requests, setRequests] = useState<ResourceRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/resource-requests`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch resource requests")
        }

        const data = await response.json()
        // Map the response data to our interface
        setRequests(data.data.map((item: any) => ({
          _id: item._id,
          name: item.name,
          age: item.age,
          academicBackground: item.academicBackground,
          country: item.country,
          requestedResources: item.requestedResources,
          createdAt: item.createdAt
        })))
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load resource requests. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [])

  // Filter requests based on search term
  const filteredRequests = requests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.academicBackground.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Function to export data to Excel
  const exportToExcel = () => {
    // Create CSV content
    const headers = ["ID", "Name", "Age", "Academic Background", "Country", "Requested Resources", "Created At"]
    const csvContent = [
      headers.join(","),
      ...filteredRequests.map((request) =>
        [
          request._id,
          `"${request.name.replace(/"/g, '""')}"`, // Escape quotes in CSV
          request.age,
          `"${request.academicBackground.replace(/"/g, '""')}"`,
          `"${request.country.replace(/"/g, '""')}"`,
          `"${request.requestedResources.replace(/"/g, '""')}"`,
          new Date(request.createdAt).toLocaleString(),
        ].join(","),
      ),
    ].join("\n")

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `resource-requests-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resource Requests</CardTitle>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={exportToExcel} 
            variant="outline" 
            size="sm"
            disabled={isLoading || filteredRequests.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : isLoading ? (
          <div className="p-8 text-center">Loading resource requests...</div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Academic Background
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[300px]">
                    Requested Resources
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                      {searchTerm ? "No matching requests found." : "No resource requests found."}
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.academicBackground}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.country}
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-gray-500 max-w-[300px] truncate"
                        title={request.requestedResources}
                      >
                        {request.requestedResources}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}