"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"

const SubmitSuccessStory: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/donation-success-stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit story')
      }

      navigate("/donate/success-stories")
    } catch (error) {
      console.error("Error submitting story:", error)
      alert("Failed to submit story. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Submit Your Success Story</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL (e.g., https://example.com/image.jpg)"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="Major"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="number"
            name="amountRaised"
            value={formData.amountRaised}
            onChange={handleChange}
            placeholder="Amount Raised"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            placeholder="Your Quote"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            name="impact"
            value={formData.impact}
            onChange={handleChange}
            placeholder="Impact & Achievements (comma separated)"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <Button 
            type="submit" 
            className="w-full bg-blue-500 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Story'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SubmitSuccessStory