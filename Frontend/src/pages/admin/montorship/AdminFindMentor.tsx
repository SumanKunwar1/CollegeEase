"use client"

import { useState, useEffect } from "react"
import { User, MapPin, Briefcase, GraduationCap, Plus, Save, Trash, Edit, Search, X } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { useEnhancedToast } from "../../../components/ui/enhanced-toast";
import axios from "axios"

interface Expertise {
  skill: string
}

interface MentorStyle {
  style: string
}

interface Testimonial {
  author: string
  title: string
  text: string
  rating: number
}

interface Mentor {
  _id: string
  name: string
  title: string
  university: string
  location: string
  imageUrl: string
  availability: string
  pricePerHour: number
  bio: string
  expertise: Expertise[]
  mentorStyle: MentorStyle[]
  testimonials: Testimonial[]
}

export function AdminMentorsPage() {
  const { toast } = useEnhancedToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null)
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [newExpertise, setNewExpertise] = useState("")
  const [newMentorStyle, setNewMentorStyle] = useState("")

  const [newMentor, setNewMentor] = useState<Omit<Mentor, "_id">>({
    name: "",
    title: "",
    university: "",
    location: "",
    imageUrl: "",
    availability: "",
    pricePerHour: 0,
    bio: "",
    expertise: [],
    mentorStyle: [],
    testimonials: [],
  })

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/api/v1",
  })

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await apiClient.get("/mentors")
        setMentors(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch mentors:", error)
        toast({
          title: "Error",
          description: "Failed to load mentors",
          variant: "destructive"
        })
        setIsLoading(false)
      }
    }

    fetchMentors()
  }, [])

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((e) => e.skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Mentor) => {
    if (editingMentor) {
      setEditingMentor({
        ...editingMentor,
        [field]: field === "pricePerHour" ? Number(e.target.value) : e.target.value,
      })
    } else {
      setNewMentor({
        ...newMentor,
        [field]: field === "pricePerHour" ? Number(e.target.value) : e.target.value,
      })
    }
  }

  const handleAddExpertise = () => {
    if (!newExpertise.trim()) return

    if (editingMentor) {
      setEditingMentor({
        ...editingMentor,
        expertise: [...editingMentor.expertise, { skill: newExpertise.trim() }],
      })
    } else {
      setNewMentor({
        ...newMentor,
        expertise: [...newMentor.expertise, { skill: newExpertise.trim() }],
      })
    }

    setNewExpertise("")
  }

  const handleRemoveExpertise = (index: number) => {
    if (editingMentor) {
      const updatedExpertise = [...editingMentor.expertise]
      updatedExpertise.splice(index, 1)
      setEditingMentor({
        ...editingMentor,
        expertise: updatedExpertise,
      })
    } else {
      const updatedExpertise = [...newMentor.expertise]
      updatedExpertise.splice(index, 1)
      setNewMentor({
        ...newMentor,
        expertise: updatedExpertise,
      })
    }
  }

  const handleAddMentorStyle = () => {
    if (!newMentorStyle.trim()) return

    if (editingMentor) {
      setEditingMentor({
        ...editingMentor,
        mentorStyle: [...editingMentor.mentorStyle, { style: newMentorStyle.trim() }],
      })
    } else {
      setNewMentor({
        ...newMentor,
        mentorStyle: [...newMentor.mentorStyle, { style: newMentorStyle.trim() }],
      })
    }

    setNewMentorStyle("")
  }

  const handleRemoveMentorStyle = (index: number) => {
    if (editingMentor) {
      const updatedStyles = [...editingMentor.mentorStyle]
      updatedStyles.splice(index, 1)
      setEditingMentor({
        ...editingMentor,
        mentorStyle: updatedStyles,
      })
    } else {
      const updatedStyles = [...newMentor.mentorStyle]
      updatedStyles.splice(index, 1)
      setNewMentor({
        ...newMentor,
        mentorStyle: updatedStyles,
      })
    }
  }

  const handleTestimonialsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const testimonialsArray = JSON.parse(e.target.value)
      if (Array.isArray(testimonialsArray)) {
        if (editingMentor) {
          setEditingMentor({
            ...editingMentor,
            testimonials: testimonialsArray,
          })
        } else {
          setNewMentor({
            ...newMentor,
            testimonials: testimonialsArray,
          })
        }
      }
    } catch (error) {
      console.error("Invalid JSON format for testimonials")
    }
  }

  const handleAddMentor = async () => {
    try {
      const response = await apiClient.post("/mentors", newMentor)
      setMentors([...mentors, response.data])
      setNewMentor({
        name: "",
        title: "",
        university: "",
        location: "",
        imageUrl: "",
        availability: "",
        pricePerHour: 0,
        bio: "",
        expertise: [],
        mentorStyle: [],
        testimonials: [],
      })
      setShowAddForm(false)
      toast({
        title: "Mentor added",
        description: "The mentor has been added successfully.",
      })
    } catch (error) {
      console.error("Failed to add mentor:", error)
      toast({
        title: "Error",
        description: "Failed to add mentor",
        variant: "destructive"
      })
    }
  }

  const handleUpdateMentor = async () => {
    if (!editingMentor) return

    try {
      const response = await apiClient.put(`/mentors/${editingMentor._id}`, editingMentor)
      setMentors(mentors.map((mentor) => (mentor._id === editingMentor._id ? response.data : mentor)))
      setEditingMentor(null)
      toast({
        title: "Mentor updated",
        description: "The mentor has been updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update mentor:", error)
      toast({
        title: "Error",
        description: "Failed to update mentor",
        variant: "destructive"
      })
    }
  }

  const handleDeleteMentor = async (id: string) => {
    try {
      await apiClient.delete(`/mentors/${id}`)
      setMentors(mentors.filter((mentor) => mentor._id !== id))
      toast({
        title: "Mentor deleted",
        description: "The mentor has been deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete mentor:", error)
      toast({
        title: "Error",
        description: "Failed to delete mentor",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin: Manage Mentors</h1>
          <div className="flex gap-4">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Mentor
            </Button>
            <a href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search mentors by name, title, university, or expertise..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingMentor) && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">{editingMentor ? "Edit Mentor" : "Add New Mentor"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    value={editingMentor ? editingMentor.name : newMentor.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={editingMentor ? editingMentor.title : newMentor.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    placeholder="Professional title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                  <Input
                    value={editingMentor ? editingMentor.university : newMentor.university}
                    onChange={(e) => handleInputChange(e, "university")}
                    placeholder="University or institution"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <Input
                    value={editingMentor ? editingMentor.location : newMentor.location}
                    onChange={(e) => handleInputChange(e, "location")}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <Input
                    value={editingMentor ? editingMentor.imageUrl : newMentor.imageUrl}
                    onChange={(e) => handleInputChange(e, "imageUrl")}
                    placeholder="URL for profile image"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <Input
                    value={editingMentor ? editingMentor.availability : newMentor.availability}
                    onChange={(e) => handleInputChange(e, "availability")}
                    placeholder="e.g., Weekdays after 4 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Hour ($)</label>
                  <Input
                    type="number"
                    value={editingMentor ? editingMentor.pricePerHour : newMentor.pricePerHour}
                    onChange={(e) => handleInputChange(e, "pricePerHour")}
                    placeholder="Hourly rate"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <Textarea
                    value={editingMentor ? editingMentor.bio : newMentor.bio}
                    onChange={(e) => handleInputChange(e, "bio")}
                    placeholder="Professional biography"
                    rows={4}
                  />
                </div>

                {/* Expertise */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      placeholder="Add an expertise"
                    />
                    <Button type="button" onClick={handleAddExpertise} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(editingMentor ? editingMentor.expertise : newMentor.expertise).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm"
                      >
                        {item.skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveExpertise(index)}
                          className="ml-2 text-blue-700 hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mentoring Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mentoring Style</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newMentorStyle}
                      onChange={(e) => setNewMentorStyle(e.target.value)}
                      placeholder="Add a mentoring style"
                    />
                    <Button type="button" onClick={handleAddMentorStyle} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(editingMentor ? editingMentor.mentorStyle : newMentor.mentorStyle).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-green-50 text-green-700 rounded-full px-3 py-1 text-sm"
                      >
                        {item.style}
                        <button
                          type="button"
                          onClick={() => handleRemoveMentorStyle(index)}
                          className="ml-2 text-green-700 hover:text-green-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testimonials (JSON format)</label>
                  <Textarea
                    value={
                      editingMentor
                        ? JSON.stringify(editingMentor.testimonials, null, 2)
                        : JSON.stringify(newMentor.testimonials, null, 2)
                    }
                    onChange={handleTestimonialsChange}
                    placeholder='[{"author": "Name", "title": "Title", "text": "Testimonial text", "rating": 5}]'
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingMentor(null)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingMentor ? handleUpdateMentor : handleAddMentor}>
                  <Save className="mr-2 h-4 w-4" />
                  {editingMentor ? "Update Mentor" : "Add Mentor"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mentors List */}
        <div className="space-y-6 mb-8">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading mentors...</p>
            </div>
          ) : filteredMentors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No mentors found. Try a different search or add a new mentor.</p>
            </div>
          ) : (
            filteredMentors.map((mentor) => (
              <Card key={mentor._id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4 flex flex-col items-center">
                      <img
                        src={mentor.imageUrl || "/placeholder.svg"}
                        alt={mentor.name}
                        className="w-32 h-32 rounded-full object-cover mb-4"
                      />
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.title}</p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <GraduationCap className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{mentor.university}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                          <span>${mentor.pricePerHour}/hour</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{mentor.availability}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{mentor.bio}</p>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Expertise:</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((item, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                              {item.skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" size="sm" onClick={() => setEditingMentor(mentor)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteMentor(mentor._id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}