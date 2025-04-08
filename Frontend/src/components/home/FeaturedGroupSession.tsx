"use client"

import { Calendar, Clock, Users } from "lucide-react"
import { Link } from "react-router-dom"

interface FeaturedSessionProps {
  session: {
    _id: string
    title: string
    mentor: string
    date: string
    time: string
    duration: string
    participants: number
    price: string
    tags: string[]
    imageUrl: string
    description: string
  }
}

const FeaturedSession = ({ session }: FeaturedSessionProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Group Session</h2>
          <Link
            to="/mentorship/group-sessions"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => window.scrollTo(0, 0)}
          >
            View All Sessions →
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{session.title}</h3>
              <p className="text-gray-600 mb-4">Led by {session.mentor}</p>

              <p className="text-gray-700 mb-4">{session.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {session.date}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {session.time} ({session.duration})
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {session.participants} participants max
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {session.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">${session.price}</span>
                <Link
                  to={`/mentorship/group-session/${session._id}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  View Details
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={session.imageUrl || "/placeholder.svg"}
                alt={session.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSession
