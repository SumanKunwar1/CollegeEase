"use client"

import { useState, useEffect } from "react"
import { Briefcase, Plus, Trash, Edit, Search, X } from "lucide-react"

interface Job {
  _id: string
  title: string
  company: string
  location: string
  type: string
  description: string
  salary: string
  requirements: string[]
  responsibilities: string[]
  whyJoinUs: string
}

export function AdminJobAndPlacementPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(true)

  // Form state
  const [formData, setFormData] = useState<Omit<Job, "_id">>({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    salary: "",
    requirements: [],
    responsibilities: [],
    whyJoinUs: "",
  })

  const [newRequirement, setNewRequirement] = useState("")
  const [newResponsibility, setNewResponsibility] = useState("")

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs`)
        const data = await response.json()
        if (data.success) {
          setJobs(data.data)
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Reset form when switching between add/edit modes
  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title,
        company: editingJob.company,
        location: editingJob.location,
        type: editingJob.type,
        description: editingJob.description,
        salary: editingJob.salary,
        requirements: [...editingJob.requirements],
        responsibilities: [...editingJob.responsibilities],
        whyJoinUs: editingJob.whyJoinUs,
      })
    } else if (!showAddForm) {
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        salary: "",
        requirements: [],
        responsibilities: [],
        whyJoinUs: "",
      })
    }
  }, [editingJob, showAddForm])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddRequirement = () => {
    if (newRequirement.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }))
      setNewRequirement("")
    }
  }

  const handleAddResponsibility = () => {
    if (newResponsibility.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility.trim()],
      }))
      setNewResponsibility("")
    }
  }

  const handleRemoveRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const handleRemoveResponsibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }))
  }

  const handleAddJob = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setJobs([...jobs, data.data])
        setShowAddForm(false)
        setSuccessMessage("Job listing added successfully!")
      }
    } catch (error) {
      console.error("Error adding job:", error)
      setSuccessMessage("Failed to add job listing")
    }

    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleUpdateJob = async () => {
    if (!editingJob) return

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/${editingJob._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setJobs(jobs.map((job) => (job._id === editingJob._id ? data.data : job)))
        setEditingJob(null)
        setSuccessMessage("Job listing updated successfully!")
      }
    } catch (error) {
      console.error("Error updating job:", error)
      setSuccessMessage("Failed to update job listing")
    }

    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleDeleteJob = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setJobs(jobs.filter((job) => job._id !== id))
        setSuccessMessage("Job listing deleted successfully!")
      }
    } catch (error) {
      console.error("Error deleting job:", error)
      setSuccessMessage("Failed to delete job listing")
    }

    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin: Manage Jobs & Placements</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add New Job
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{successMessage}</span>
            <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccessMessage("")}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingJob) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingJob ? "Edit Job Listing" : "Add New Job Listing"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Tech Innovators Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., $120,000 - $150,000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the job"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5+ years of experience with JavaScript"
                  />
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-2 rounded">
                      <span className="flex-1">{req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Develop and maintain web applications"
                  />
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {formData.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-2 rounded">
                      <span className="flex-1">{resp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Why Join Us</label>
                <textarea
                  name="whyJoinUs"
                  value={formData.whyJoinUs}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Great benefits. Flexible work hours. Innovative projects."
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">Separate points with periods for automatic formatting</p>
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingJob(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingJob ? handleUpdateJob : handleAddJob}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingJob ? "Update Job" : "Add Job"}
              </button>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">No job listings found. Try a different search or add a new job.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                    </div>
                    <p className="text-gray-600 mt-1">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingJob(job)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700">{job.description}</p>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Requirements:</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Responsibilities:</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

