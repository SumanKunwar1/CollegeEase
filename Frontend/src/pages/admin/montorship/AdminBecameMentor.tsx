"use client"

import { useState, useEffect } from "react"
import { Download, Eye, Trash2, Check, X } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { toast } from "react-hot-toast"

type MentorApplication = {
  _id: string
  name: string
  email: string
  college: string
  expertise: string
  experience: string
  imageUrl?: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
}

const AdminMentorPage = () => {
  const [applications, setApplications] = useState<MentorApplication[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<MentorApplication | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/became-mentor?search=${searchTerm}`)
        if (!response.ok) {
          throw new Error('Failed to fetch applications')
        }
        const data = await response.json()
        setApplications(data.data)
      } catch (error) {
        console.error('Error fetching applications:', error)
        toast.error('Failed to load applications')
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [searchTerm])

  // Filter applications based on search term (client-side as we're also doing server-side)
  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.expertise.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Export data as CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "College", "Expertise", "Experience", "Status", "Submitted At"]
    const rows = applications.map((app) => [
      app.name,
      app.email,
      app.college,
      app.expertise,
      app.experience,
      app.status,
      new Date(app.submittedAt).toLocaleDateString(),
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "mentor-applications.csv"
    link.click()
  }

  // Update application status
  const updateApplicationStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/became-mentor/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      const updatedApp = await response.json()
      
      setApplications(applications.map((app) => 
        app._id === id ? { ...app, status: updatedApp.data.status } : app
      ))
      
      if (selectedApplication && selectedApplication._id === id) {
        setSelectedApplication({ ...selectedApplication, status })
      }

      toast.success(`Application ${status}`)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  // Delete application
  const deleteApplication = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/became-mentor/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete application')
      }

      setApplications(applications.filter((app) => app._id !== id))
      
      if (selectedApplication && selectedApplication._id === id) {
        setViewDialogOpen(false)
      }

      toast.success('Application deleted')
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error('Failed to delete application')
    }
  }

  // View application details
  const viewApplication = (application: MentorApplication) => {
    setSelectedApplication(application)
    setViewDialogOpen(true)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Mentor Applications</CardTitle>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search applications..."
              className="w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" className="flex items-center gap-2" onClick={exportToCSV}>
              <Download size={16} />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Name</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Email</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">College</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.imageUrl || "/placeholder.svg"}
                            alt={app.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>{app.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{app.email}</td>
                      <td className="py-3 px-4">{app.college}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{formatDate(app.submittedAt)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => viewApplication(app)}>
                            <Eye size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateApplicationStatus(app._id, "approved")}
                            disabled={app.status === "approved"}
                          >
                            <Check size={16} className="text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateApplicationStatus(app._id, "rejected")}
                            disabled={app.status === "rejected"}
                          >
                            <X size={16} className="text-red-600" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteApplication(app._id)}>
                            <Trash2 size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredApplications.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No mentor applications found
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        {selectedApplication && (
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedApplication.imageUrl || "/placeholder.svg"}
                  alt={selectedApplication.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedApplication.name}</h3>
                  <p className="text-gray-500">{selectedApplication.email}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">College</h4>
                <p>{selectedApplication.college}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Areas of Expertise</h4>
                <p>{selectedApplication.expertise}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Professional Experience</h4>
                <p>{selectedApplication.experience}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <Badge className={getStatusColor(selectedApplication.status)}>
                  {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Submitted On</h4>
                <p>{formatDate(selectedApplication.submittedAt)}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateApplicationStatus(selectedApplication._id, "approved")
                  }}
                  disabled={selectedApplication.status === "approved"}
                >
                  <Check size={16} className="mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateApplicationStatus(selectedApplication._id, "rejected")
                  }}
                  disabled={selectedApplication.status === "rejected"}
                >
                  <X size={16} className="mr-2" />
                  Reject
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-auto"
                  onClick={() => {
                    deleteApplication(selectedApplication._id)
                  }}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

export default AdminMentorPage