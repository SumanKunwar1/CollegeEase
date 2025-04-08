"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar, Plus, Trash, Edit, Search, X } from "lucide-react"
import axios from "axios"
import { useEnhancedToast } from "../../../components/ui/enhanced-toast"

interface IInterviewSection {
  title: string
  content: string
}

interface IInterviewResource {
  title: string
  url: string
  type: string
}

interface IFullInterview {
  introduction: string
  videoUrl?: string
  sections: IInterviewSection[]
  keyTakeaways: string[]
  resources: IInterviewResource[]
}

interface IInterview {
  _id: string
  name: string
  role: string
  topic: string
  insights: string[]
  imageUrl: string
  date: string
  fullInterview?: IFullInterview
}

interface IInterviewCategory {
  _id: string
  category: string
  interviews: IInterview[]
}

export function AdminExpertInterviewsPage() {
  const [categories, setCategories] = useState<IInterviewCategory[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false)
  const [showAddInterviewForm, setShowAddInterviewForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<IInterviewCategory | null>(null)
  const [editingInterview, setEditingInterview] = useState<IInterview | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [expandedInsights, setExpandedInsights] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const { toast } = useEnhancedToast()

  // Form states
  const [categoryFormData, setCategoryFormData] = useState<{
    category: string
  }>({
    category: "",
  })

  const [interviewFormData, setInterviewFormData] = useState<Omit<IInterview, "_id" | "fullInterview">>({
    name: "",
    role: "",
    topic: "",
    insights: [],
    imageUrl: "",
    date: "",
  })

  const [fullInterviewFormData, setFullInterviewFormData] = useState<NonNullable<IInterview["fullInterview"]>>({
    introduction: "",
    videoUrl: "",
    sections: [
      {
        title: "",
        content: "",
      },
    ],
    keyTakeaways: [],
    resources: [
      {
        title: "",
        url: "",
        type: "",
      },
    ],
  })

  // Add a new state for the current insight input
  const [currentInsight, setCurrentInsight] = useState("")
  const [currentKeyTakeaway, setCurrentKeyTakeaway] = useState("")

  // Fetch all interview categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/expert-interviews`)
        setCategories(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching interview categories:", error)
        toast({
          title: "Error",
          description: "Failed to fetch interview categories",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Filter categories and interviews based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      interviews: category.interviews.filter(
        (interview) =>
          interview?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          interview?.role?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          interview?.topic?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          interview?.insights?.some((insight) => insight?.toLowerCase().includes(searchQuery?.toLowerCase())),
      ),
    }))
    .filter(
      (category) =>
        category.interviews.length > 0 || category?.category?.toLowerCase().includes(searchQuery?.toLowerCase()),
    )

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ category: e.target.value })
  }

  const handleInterviewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInterviewFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddInsight = () => {
    if (currentInsight.trim()) {
      setInterviewFormData((prev) => ({
        ...prev,
        insights: [...prev.insights, currentInsight.trim()],
      }))
      setCurrentInsight("")
    }
  }

  const handleRemoveInsight = (indexToRemove: number) => {
    setInterviewFormData((prev) => ({
      ...prev,
      insights: prev.insights.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleAddKeyTakeaway = () => {
    if (currentKeyTakeaway.trim()) {
      setFullInterviewFormData((prev) => ({
        ...prev,
        keyTakeaways: [...prev.keyTakeaways, currentKeyTakeaway.trim()],
      }))
      setCurrentKeyTakeaway("")
    }
  }

  const handleRemoveKeyTakeaway = (indexToRemove: number) => {
    setFullInterviewFormData((prev) => ({
      ...prev,
      keyTakeaways: prev.keyTakeaways.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleFullInterviewInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setFullInterviewFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSectionChange = (index: number, field: "title" | "content", value: string) => {
    setFullInterviewFormData((prev) => {
      const newSections = [...prev.sections]
      newSections[index] = { ...newSections[index], [field]: value }
      return { ...prev, sections: newSections }
    })
  }

  const addSection = () => {
    setFullInterviewFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", content: "" }],
    }))
  }

  const removeSection = (index: number) => {
    setFullInterviewFormData((prev) => {
      const newSections = [...prev.sections]
      newSections.splice(index, 1)
      return { ...prev, sections: newSections }
    })
  }

  const handleResourceChange = (index: number, field: "title" | "url" | "type", value: string) => {
    setFullInterviewFormData((prev) => {
      const newResources = [...prev.resources]
      newResources[index] = { ...newResources[index], [field]: value }
      return { ...prev, resources: newResources }
    })
  }

  const addResource = () => {
    setFullInterviewFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, { title: "", url: "", type: "" }],
    }))
  }

  const removeResource = (index: number) => {
    setFullInterviewFormData((prev) => {
      const newResources = [...prev.resources]
      newResources.splice(index, 1)
      return { ...prev, resources: newResources }
    })
  }

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/expert-interviews`, {
        category: categoryFormData.category,
      })
      
      setCategories([...categories, response.data.data])
      setShowAddCategoryForm(false)
      setCategoryFormData({ category: "" })
      
      toast({
        title: "Success",
        description: "Interview category added successfully!",
      })
    } catch (error) {
      console.error("Error adding category:", error)
      toast({
        title: "Error",
        description: "Failed to add interview category",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/expert-interviews/${editingCategory._id}`,
        { category: categoryFormData.category }
      )

      setCategories(
        categories.map((category) =>
          category._id === editingCategory._id ? response.data.data : category
        )
      )

      setEditingCategory(null)
      setCategoryFormData({ category: "" })
      
      toast({
        title: "Success",
        description: "Interview category updated successfully!",
      })
    } catch (error) {
      console.error("Error updating category:", error)
      toast({
        title: "Error",
        description: "Failed to update interview category",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/expert-interviews/${id}`)
      setCategories(categories.filter((category) => category._id !== id))
      
      toast({
        title: "Success",
        description: "Interview category deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: "Error",
        description: "Failed to delete interview category",
        variant: "destructive",
      })
    }
  }

  const handleAddInterview = async () => {
    if (!selectedCategoryId) return

    try {
      const interviewData = {
        ...interviewFormData,
        fullInterview: fullInterviewFormData,
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/expert-interviews/${selectedCategoryId}/interviews`,
        interviewData
      )

      setCategories(
        categories.map((category) =>
          category._id === selectedCategoryId
            ? { ...category, interviews: [...category.interviews, response.data.data] }
            : category
        )
      )

      setShowAddInterviewForm(false)
      setSelectedCategoryId(null)
      setInterviewFormData({
        name: "",
        role: "",
        topic: "",
        insights: [],
        imageUrl: "",
        date: "",
      })
      setFullInterviewFormData({
        introduction: "",
        videoUrl: "",
        sections: [
          {
            title: "",
            content: "",
          },
        ],
        keyTakeaways: [],
        resources: [
          {
            title: "",
            url: "",
            type: "",
          },
        ],
      })
      
      
      toast({
        title: "Success",
        description: "Interview added successfully!",
      })
      window.location.reload();
      
    } catch (error) {
      console.error("Error adding interview:", error)
      toast({
        title: "Error",
        description: "Failed to add interview",
        variant: "destructive",
      })
    }
  }

  const handleUpdateInterview = async () => {
    if (!editingInterview || !editingInterview._id) return

    try {
      const interviewData = {
        ...interviewFormData,
        fullInterview: fullInterviewFormData,
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/expert-interviews/${editingInterview._id}`,
        interviewData
      )

      setCategories(
        categories.map((category) => ({
          ...category,
          interviews: category.interviews.map((interview) =>
            interview._id === editingInterview._id ? response.data.data : interview
          ),
        }))
      )

      setEditingInterview(null)
      setInterviewFormData({
        name: "",
        role: "",
        topic: "",
        insights: [],
        imageUrl: "",
        date: "",
      })
      setFullInterviewFormData({
        introduction: "",
        videoUrl: "",
        sections: [
          {
            title: "",
            content: "",
          },
        ],
        keyTakeaways: [],
        resources: [
          {
            title: "",
            url: "",
            type: "",
          },
        ],
      })
      
      toast({
        title: "Success",
        description: "Interview updated successfully!",
      })
    } catch (error) {
      console.error("Error updating interview:", error)
      toast({
        title: "Error",
        description: "Failed to update interview",
        variant: "destructive",
      })
    }
  }

  const handleDeleteInterview = async (categoryId: string, interviewId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/expert-interviews/${categoryId}/interviews/${interviewId}`
      )

      setCategories(
        categories.map((category) => ({
          ...category,
          interviews: category.interviews.filter((interview) => interview._id !== interviewId),
        }))
      )
      
      toast({
        title: "Success",
        description: "Interview deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting interview:", error)
      toast({
        title: "Error",
        description: "Failed to delete interview",
        variant: "destructive",
      })
    }
  }

  const handleUpdateFullInterview = async (categoryId: string, interviewId: string) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/expert-interviews/${categoryId}/interviews/${interviewId}/full`,
        fullInterviewFormData
      )

      setCategories(
        categories.map((category) => ({
          ...category,
          interviews: category.interviews.map((interview) =>
            interview._id === interviewId ? response.data.data : interview
          ),
        }))
      )

      setEditingInterview(null)
      setInterviewFormData({
        name: "",
        role: "",
        topic: "",
        insights: [],
        imageUrl: "",
        date: "",
      })
      setFullInterviewFormData({
        introduction: "",
        videoUrl: "",
        sections: [
          {
            title: "",
            content: "",
          },
        ],
        keyTakeaways: [],
        resources: [
          {
            title: "",
            url: "",
            type: "",
          },
        ],
      })
      
      toast({
        title: "Success",
        description: "Full interview details updated successfully!",
      })
    } catch (error) {
      console.error("Error updating full interview:", error)
      toast({
        title: "Error",
        description: "Failed to update full interview details",
        variant: "destructive",
      })
    }
  }

  const startEditCategory = (category: IInterviewCategory) => {
    setEditingCategory(category)
    setCategoryFormData({ category: category.category })
  }

  const startEditInterview = (interview: IInterview) => {
    setEditingInterview(interview)
    setInterviewFormData({
      name: interview.name,
      role: interview.role,
      topic: interview.topic,
      insights: [...interview.insights],
      imageUrl: interview.imageUrl,
      date: interview.date,
    })

    if (interview.fullInterview) {
      setFullInterviewFormData({
        introduction: interview.fullInterview.introduction,
        videoUrl: interview.fullInterview.videoUrl || "",
        sections: [...interview.fullInterview.sections],
        keyTakeaways: [...interview.fullInterview.keyTakeaways],
        resources: [...interview.fullInterview.resources],
      })
    } else {
      setFullInterviewFormData({
        introduction: "",
        videoUrl: "",
        sections: [
          {
            title: "",
            content: "",
          },
        ],
        keyTakeaways: [],
        resources: [
          {
            title: "",
            url: "",
            type: "",
          },
        ],
      })
    }
  }

  const toggleInsightsExpansion = (interviewId: string) => {
    setExpandedInsights((prev) => ({
      ...prev,
      [interviewId]: !prev[interviewId],
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p>Loading interview data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin: Expert Interviews</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddCategoryForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Category
            </button>
            <button
              onClick={() => {
                setShowAddInterviewForm(true)
                setSelectedCategoryId(categories[0]?._id || null)
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={16} />
              Add Interview
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search interviews by name, role, topic, or insights..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Category Form */}
        {(showAddCategoryForm || editingCategory) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory ? "Edit Interview Category" : "Add New Interview Category"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={categoryFormData.category}
                  onChange={handleCategoryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Tech Leaders"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddCategoryForm(false)
                  setEditingCategory(null)
                  setCategoryFormData({ category: "" })
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        )}

        {(showAddInterviewForm || editingInterview) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingInterview ? "Edit Interview" : "Add New Interview"}</h2>

            {showAddInterviewForm && !editingInterview && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
                <select
                  value={selectedCategoryId || ""}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-8">
              {/* Basic Interview Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={interviewFormData.name}
                      onChange={handleInterviewInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Sarah Chen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={interviewFormData.role}
                      onChange={handleInterviewInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., VP of Engineering at Google"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                    <input
                      type="text"
                      name="topic"
                      value={interviewFormData.topic}
                      onChange={handleInterviewInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Breaking into Tech Leadership"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      name="date"
                      value={interviewFormData.date}
                      onChange={handleInterviewInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., March 15, 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={interviewFormData.imageUrl}
                      onChange={handleInterviewInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL for interviewee's image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Insights</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={currentInsight}
                        onChange={(e) => setCurrentInsight(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a key insight"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddInsight()
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddInsight}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    {interviewFormData.insights.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {interviewFormData.insights.map((insight, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                            <span>{insight}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveInsight(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Interview Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Full Interview Details</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
                    <textarea
                      value={fullInterviewFormData.introduction}
                      onChange={(e) => handleFullInterviewInputChange(e, "introduction")}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Detailed introduction to the interview"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (optional)</label>
                    <input
                      type="text"
                      value={fullInterviewFormData.videoUrl}
                      onChange={(e) => handleFullInterviewInputChange(e, "videoUrl")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., https://www.youtube.com/embed/..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-900">Interview Sections</h3>
                      <button
                        type="button"
                        onClick={addSection}
                        className="text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Section
                      </button>
                    </div>

                    {fullInterviewFormData.sections.map((section, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Section {index + 1}</h4>
                          {fullInterviewFormData.sections.length > 1 && (
                            <button onClick={() => removeSection(index)} className="text-red-600 hover:text-red-700">
                              <Trash size={16} />
                            </button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Journey to Leadership"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Section Content</label>
                            <textarea
                              value={section.content}
                              onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Content for this section"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Takeaways</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={currentKeyTakeaway}
                        onChange={(e) => setCurrentKeyTakeaway(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a key takeaway"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddKeyTakeaway()
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddKeyTakeaway}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    {fullInterviewFormData.keyTakeaways.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {fullInterviewFormData.keyTakeaways.map((takeaway, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                            <span>{takeaway}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveKeyTakeaway(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-900">Additional Resources</h3>
                      <button
                        type="button"
                        onClick={addResource}
                        className="text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Resource
                      </button>
                    </div>

                    {fullInterviewFormData.resources.map((resource, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Resource {index + 1}</h4>
                          {fullInterviewFormData.resources.length > 1 && (
                            <button onClick={() => removeResource(index)} className="text-red-600 hover:text-red-700">
                              <Trash size={16} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={resource.title}
                              onChange={(e) => handleResourceChange(index, "title", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Leadership in Tech: A Guide"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <input
                              type="text"
                              value={resource.url}
                              onChange={(e) => handleResourceChange(index, "url", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., https://example.com/guide"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={resource.type}
                              onChange={(e) => handleResourceChange(index, "type", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select type</option>
                              <option value="PDF">PDF</option>
                              <option value="Webinar">Webinar</option>
                              <option value="Article">Article</option>
                              <option value="Video">Video</option>
                              <option value="Book">Book</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddInterviewForm(false)
                  setEditingInterview(null)
                  setSelectedCategoryId(null)
                  setInterviewFormData({
                    name: "",
                    role: "",
                    topic: "",
                    insights: [],
                    imageUrl: "",
                    date: "",
                  })
                  setFullInterviewFormData({
                    introduction: "",
                    videoUrl: "",
                    sections: [
                      {
                        title: "",
                        content: "",
                      },
                    ],
                    keyTakeaways: [],
                    resources: [
                      {
                        title: "",
                        url: "",
                        type: "",
                      },
                    ],
                  })
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingInterview && editingInterview._id && selectedCategoryId) {
                    handleUpdateFullInterview(selectedCategoryId, editingInterview._id)
                  } else {
                    handleAddInterview()
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingInterview ? "Update Interview" : "Add Interview"}
              </button>
            </div>
          </div>
        )}

        {/* Categories and Interviews List */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No interviews found. Try a different search or add new content.</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{category.category}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditCategory(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.interviews.map((interview) => (
                  <div key={interview._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src={interview.imageUrl || "/placeholder.svg"}
                          alt={interview.name}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{interview.name}</h3>
                          <p className="text-sm text-gray-600">{interview.role}</p>
                          <p className="text-blue-600 font-medium mt-1">{interview.topic}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            startEditInterview(interview)
                            setSelectedCategoryId(category._id)
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteInterview(category._id, interview._id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {interview.date}
                     
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {expandedInsights[interview._id] ? (
                          <>
                            {interview.insights.map((insight, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                {insight}
                              </span>
                            ))}
                            <button
                              onClick={() => toggleInsightsExpansion(interview._id)}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200"
                            >
                              Show less
                            </button>
                          </>
                        ) : (
                          <>
                            {interview.insights.length > 0 && (
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                {interview.insights[0]}
                              </span>
                            )}
                            {interview.insights.length > 1 && (
                              <button
                                onClick={() => toggleInsightsExpansion(interview._id)}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200"
                              >
                                +{interview.insights.length - 1} more
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        {interview.fullInterview ? (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            Full interview available
                          </span>
                        ) : (
                          <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                            Basic details only
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => startEditInterview(interview)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit interview
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setShowAddInterviewForm(true)
                    setSelectedCategoryId(category._id)
                  }}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add interview to {category.category}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
