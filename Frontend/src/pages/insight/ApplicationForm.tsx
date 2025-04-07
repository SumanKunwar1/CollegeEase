"use client"

import { useState } from "react"
import axios from "axios"
import { useEnhancedToast } from "../../components/ui/enhanced-toast"

interface ApplicationFormProps {
  jobId: string
  onClose: () => void
}

const ApplicationForm = ({ jobId, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    educationLevel: "",
    coverLetter: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useEnhancedToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate cover letter word count
    const wordCount = formData.coverLetter.trim().split(/\s+/).filter(Boolean).length
    if (wordCount < 200) {
      toast({
        title: "Validation Error",
        description: "Cover letter must be at least 200 words",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/application-forms`, {
        jobId,
        ...formData
      })
      
      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
        variant: "success",
      })
      onClose()
    } catch (error: any) {
      console.error("Error submitting application:", error)
      let errorMessage = "Failed to submit application. Please try again."
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Job not found"
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Application Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select your education level
              </option>
              <option value="10th">10th</option>
              <option value="intermediate">Intermediate</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="doctorate">Doctorate</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter (minimum 200 words)</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              required
              minLength={200}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please explain why you're interested in this position and how your skills and experience make you a good fit (minimum 200 words)."
            />
            <p className="text-xs text-gray-500 mt-1">
              Word count: {formData.coverLetter.trim().split(/\s+/).filter(Boolean).length}/200 minimum
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="mr-4 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplicationForm