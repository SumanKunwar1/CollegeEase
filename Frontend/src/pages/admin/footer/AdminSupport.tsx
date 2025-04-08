"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, Phone, MessageSquare, Clock, User, Calendar, Search } from "lucide-react"

// Define the type for support messages
interface SupportMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

const AdminSupportPage: React.FC = () => {
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch support messages from API
  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001/api/v1'}/support`)
        if (!response.ok) {
          throw new Error('Failed to fetch support messages')
        }
        const data = await response.json()
        
        // Transform the data to match the frontend interface
        const transformedMessages = data.data.map((msg: any) => ({
          id: msg._id,
          name: msg.name,
          email: msg.email,
          subject: msg.subject,
          message: msg.message,
          timestamp: msg.createdAt
        }))
        
        setSupportMessages(transformedMessages)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setIsLoading(false)
      }
    }

    fetchSupportMessages()
  }, [])

  // Filter messages based on search term
  const filteredMessages = supportMessages.filter((message) => {
    return (
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading support messages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center Admin</h1>
          <p className="text-lg text-gray-600">View support requests from students</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Support messages list */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Support Messages ({filteredMessages.length})</h2>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No support messages found matching your criteria.</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <div key={message.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{message.subject}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-4">{message.name}</span>
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{message.email}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(message.timestamp)}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-md">{message.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support information */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Team Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-gray-600">support@collegeease.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-gray-600">1-800-COLLEGE (265-5343)</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <MessageSquare className="text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-gray-600">Available in your dashboard</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">Hours of Operation</p>
                  <p className="text-gray-600">Monday - Friday: 9AM - 8PM EST</p>
                  <p className="text-gray-600">Saturday: 10AM - 6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSupportPage