"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Link, User, GraduationCap, Award, MessageCircle, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"

const ScholarshipSubmitSuccessStory: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    university: "",
    major: "",
    amountRaised: "",
    quote: "",
    impact: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.image.trim()) newErrors.image = "Image URL is required"
    else if (!/^https?:\/\/.+\..+/.test(formData.image)) newErrors.image = "Please enter a valid URL"
    if (!formData.university.trim()) newErrors.university = "University is required"
    if (!formData.major.trim()) newErrors.major = "Major is required"
    if (!formData.amountRaised.trim()) newErrors.amountRaised = "Amount is required"
    else if (isNaN(Number(formData.amountRaised))) newErrors.amountRaised = "Amount must be a number"
    if (!formData.quote.trim()) newErrors.quote = "Quote is required"
    if (!formData.impact.trim()) newErrors.impact = "Impact is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/success-stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amountRaised: Number(formData.amountRaised),
          impact: formData.impact.split(",").map(item => item.trim())
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit story")
      }

      toast.success("Success story submitted successfully!")
      navigate("/scholarships/success-stories")
    } catch (error) {
      console.error("Submission error:", error)
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-lg w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          Share Your Success Story
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.name ? "border-red-500" : "border-gray-300"} bg-gray-50`}>
              <User className="text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 bg-transparent focus:outline-none"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Image URL Field */}
          <div>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.image ? "border-red-500" : "border-gray-300"} bg-gray-50`}>
              <Link className="text-gray-400" />
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Please upload the link or your LinkedIn profile picture for professionalism"
                className="w-full px-3 py-2 bg-transparent focus:outline-none"
              />
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* University Field */}
          <div>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.university ? "border-red-500" : "border-gray-300"} bg-gray-50`}>
              <GraduationCap className="text-gray-400" />
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                placeholder="University"
                className="w-full px-3 py-2 bg-transparent focus:outline-none"
              />
            </div>
            {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
          </div>

          {/* Major Field */}
          <div>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.major ? "border-red-500" : "border-gray-300"} bg-gray-50`}>
              <Award className="text-gray-400" />
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder="Major"
                className="w-full px-3 py-2 bg-transparent focus:outline-none"
              />
            </div>
            {errors.major && <p className="text-red-500 text-sm mt-1">{errors.major}</p>}
          </div>

          {/* Amount Raised Field */}
          <div>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.amountRaised ? "border-red-500" : "border-gray-300"} bg-gray-50`}>
              <Award className="text-gray-400" />
              <input
                type="number"
                name="amountRaised"
                value={formData.amountRaised}
                onChange={handleChange}
                placeholder="Amount Raised ($)"
                className="w-full px-3 py-2 bg-transparent focus:outline-none"
              />
            </div>
            {errors.amountRaised && <p className="text-red-500 text-sm mt-1">{errors.amountRaised}</p>}
          </div>

          {/* Quote Field */}
          <div>
            <div className={`flex items-start border rounded-lg px-3 py-2 ${errors.quote ? "border-red-500" : "border-gray-300"} bg-gray-50`}>
              <MessageCircle className="text-gray-400 mt-2" />
              <textarea
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Your inspirational quote"
                className="w-full px-3 py-2 bg-transparent focus:outline-none"
                rows={3}
              />
            </div>
            {errors.quote && <p className="text-red-500 text-sm mt-1">{errors.quote}</p>}
          </div>

          {/* Impact Field */}
          <div>
            <div className={`flex items-start border rounded-lg px-3 py-2 ${errors.impact ? "border-red-500" : "border-gray-300"} bg-gray-50`}>
              <MessageCircle className="text-gray-400 mt-2" />
              <textarea
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                placeholder="Impact & Achievements (comma separated, e.g., Graduated with honors, Got internship, Published research)"
                className="w-full px-3 py-2 bg-transparent focus:outline-none"
                rows={3}
              />
            </div>
            {errors.impact && <p className="text-red-500 text-sm mt-1">{errors.impact}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Story"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ScholarshipSubmitSuccessStory