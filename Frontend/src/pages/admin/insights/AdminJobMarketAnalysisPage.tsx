"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { TrendingUp, DollarSign, MapPin, Briefcase, Plus, Trash, Edit, Search, X } from "lucide-react"

interface MarketInsight {
  _id?: string;
  role: string
  growth: string
  avgSalary: string
  topLocations: string[]
  skills: string[]
  demand: string
  imageUrl: string
  detailedAnalysis: {
    jobDescription: string
    industryTrends: string
    salaryRange: string
    careerPath: string[]
    keyCompanies: string[]
    futureOutlook: string
  }
}

interface Category {
  _id?: string;
  title: string
  description: string
  insights: MarketInsight[]
}

export function AdminJobMarketAnalysisPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false)
  const [showAddInsightForm, setShowAddInsightForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingInsight, setEditingInsight] = useState<MarketInsight | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [categoryFormData, setCategoryFormData] = useState<Omit<Category, "_id" | "insights">>({
    title: "",
    description: "",
  })

  const [insightFormData, setInsightFormData] = useState<Omit<MarketInsight, "_id">>({
    role: "",
    growth: "",
    avgSalary: "",
    topLocations: [],
    skills: [],
    demand: "",
    imageUrl: "",
    detailedAnalysis: {
      jobDescription: "",
      industryTrends: "",
      salaryRange: "",
      careerPath: [],
      keyCompanies: [],
      futureOutlook: "",
    },
  })

  // New state variables for input fields
  const [newLocation, setNewLocation] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [newCareerPath, setNewCareerPath] = useState("")
  const [newKeyCompany, setNewKeyCompany] = useState("")

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/job-market/categories`)
        const data = await response.json()
        if (data.success) {
          setCategories(data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Search function
  useEffect(() => {
    const search = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/job-market/search?query=${encodeURIComponent(searchQuery)}`
        )
        const data = await response.json()
        if (data.success) {
          setCategories(data.data || [])
        }
      } catch (error) {
        console.error("Search failed:", error)
      }
    }

    if (searchQuery) {
      search()
    } else {
      // If search query is empty, fetch all categories
      fetch(`${import.meta.env.VITE_API_BASE_URL}/job-market/categories`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCategories(data.data || [])
          }
        })
        .catch((error) => console.error("Failed to fetch categories:", error))
    }
  }, [searchQuery])

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCategoryFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInsightInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setInsightFormData((prev) => {
        const parentObj = prev[parent as keyof typeof prev] || {}
        if (typeof parentObj === "object" && parentObj !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: value,
            },
          }
        }
        return prev
      })
    } else {
      setInsightFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handlers for adding/removing items
  const handleAddLocation = () => {
    if (newLocation.trim()) {
      setInsightFormData((prev) => ({
        ...prev,
        topLocations: [...prev.topLocations, newLocation.trim()],
      }))
      setNewLocation("")
    }
  }

  const handleRemoveLocation = (index: number) => {
    setInsightFormData((prev) => ({
      ...prev,
      topLocations: prev.topLocations.filter((_, i) => i !== index),
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setInsightFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    setInsightFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const handleAddCareerPath = () => {
    if (newCareerPath.trim()) {
      setInsightFormData((prev) => ({
        ...prev,
        detailedAnalysis: {
          ...prev.detailedAnalysis,
          careerPath: [...prev.detailedAnalysis.careerPath, newCareerPath.trim()],
        },
      }))
      setNewCareerPath("")
    }
  }

  const handleRemoveCareerPath = (index: number) => {
    setInsightFormData((prev) => ({
      ...prev,
      detailedAnalysis: {
        ...prev.detailedAnalysis,
        careerPath: prev.detailedAnalysis.careerPath.filter((_, i) => i !== index),
      },
    }))
  }

  const handleAddKeyCompany = () => {
    if (newKeyCompany.trim()) {
      setInsightFormData((prev) => ({
        ...prev,
        detailedAnalysis: {
          ...prev.detailedAnalysis,
          keyCompanies: [...prev.detailedAnalysis.keyCompanies, newKeyCompany.trim()],
        },
      }))
      setNewKeyCompany("")
    }
  }

  const handleRemoveKeyCompany = (index: number) => {
    setInsightFormData((prev) => ({
      ...prev,
      detailedAnalysis: {
        ...prev.detailedAnalysis,
        keyCompanies: prev.detailedAnalysis.keyCompanies.filter((_, i) => i !== index),
      },
    }))
  }

  const handleAddCategory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/job-market/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryFormData),
      })

      const data = await response.json()

      if (data.success) {
        setCategories([...categories, data.data])
        setShowAddCategoryForm(false)
        setCategoryFormData({ title: "", description: "" })
        setSuccessMessage("Category added successfully!")
      }
    } catch (error) {
      console.error("Failed to add category:", error)
      setSuccessMessage("Failed to add category")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory?._id) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/job-market/categories/${editingCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryFormData),
        }
      )

      const data = await response.json()

      if (data.success) {
        setCategories(
          categories.map((category) =>
            category._id === editingCategory._id
              ? {
                  ...category,
                  title: categoryFormData.title,
                  description: categoryFormData.description,
                }
              : category,
          ),
        )
        setEditingCategory(null)
        setCategoryFormData({ title: "", description: "" })
        setSuccessMessage("Category updated successfully!")
      }
    } catch (error) {
      console.error("Failed to update category:", error)
      setSuccessMessage("Failed to update category")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/job-market/categories/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setCategories(categories.filter((category) => category._id !== id))
        setSuccessMessage("Category deleted successfully!")
      }
    } catch (error) {
      console.error("Failed to delete category:", error)
      setSuccessMessage("Failed to delete category")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleAddInsight = async () => {
    if (!selectedCategoryId) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/job-market/categories/${selectedCategoryId}/insights`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(insightFormData),
        }
      )

      const data = await response.json()

      if (data.success) {
        setCategories(
          categories.map((category) =>
            category._id === selectedCategoryId ? { ...category, insights: [...category.insights, data.data] } : category,
          ),
        )

        setShowAddInsightForm(false)
        setSelectedCategoryId(null)
        resetInsightForm()
        setSuccessMessage("Job market insight added successfully!")
      }
    } catch (error) {
      console.error("Failed to add insight:", error)
      setSuccessMessage("Failed to add insight")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleUpdateInsight = async () => {
    if (!editingInsight?._id || !editingCategory?._id) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/job-market/categories/${editingCategory._id}/insights/${editingInsight._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(insightFormData),
        }
      )

      const data = await response.json()

      if (data.success) {
        setCategories(
          categories.map((category) => ({
            ...category,
            insights: category.insights.map((insight) =>
              insight._id === editingInsight._id ? { ...insight, ...insightFormData } : insight,
            ),
          })),
        )

        setEditingInsight(null)
        resetInsightForm()
        setSuccessMessage("Job market insight updated successfully!")
      }
    } catch (error) {
      console.error("Failed to update insight:", error)
      setSuccessMessage("Failed to update insight")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleDeleteInsight = async (categoryId: string, insightId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/job-market/categories/${categoryId}/insights/${insightId}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (data.success) {
        setCategories(
          categories.map((category) => ({
            ...category,
            insights: category._id === categoryId 
              ? category.insights.filter((insight) => insight._id !== insightId)
              : category.insights,
          })),
        )
        setSuccessMessage("Job market insight deleted successfully!")
      }
    } catch (error) {
      console.error("Failed to delete insight:", error)
      setSuccessMessage("Failed to delete insight")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const startEditCategory = (category: Category) => {
    setEditingCategory(category)
    setCategoryFormData({
      title: category.title,
      description: category.description,
    })
    setShowAddCategoryForm(true)
  }

  const startEditInsight = (insight: MarketInsight) => {
    setEditingInsight(insight)
    setInsightFormData({
      role: insight.role,
      growth: insight.growth,
      avgSalary: insight.avgSalary,
      topLocations: [...(insight.topLocations || [])],
      skills: [...(insight.skills || [])],
      demand: insight.demand,
      imageUrl: insight.imageUrl,
      detailedAnalysis: {
        jobDescription: insight.detailedAnalysis?.jobDescription || "",
        industryTrends: insight.detailedAnalysis?.industryTrends || "",
        salaryRange: insight.detailedAnalysis?.salaryRange || "",
        careerPath: [...(insight.detailedAnalysis?.careerPath || [])],
        keyCompanies: [...(insight.detailedAnalysis?.keyCompanies || [])],
        futureOutlook: insight.detailedAnalysis?.futureOutlook || "",
      },
    })
    setShowAddInsightForm(true)
  }

  const resetInsightForm = () => {
    setInsightFormData({
      role: "",
      growth: "",
      avgSalary: "",
      topLocations: [],
      skills: [],
      demand: "",
      imageUrl: "",
      detailedAnalysis: {
        jobDescription: "",
        industryTrends: "",
        salaryRange: "",
        careerPath: [],
        keyCompanies: [],
        futureOutlook: "",
      },
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job market data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin: Job Market Analysis</h1>
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
                setShowAddInsightForm(true)
                setSelectedCategoryId(categories[0]?._id || null)
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={16} />
              Add Job Insight
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
              placeholder="Search job roles, skills, or locations..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Category Form */}
        {(showAddCategoryForm || editingCategory) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingCategory ? "Edit Category" : "Add New Category"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Title</label>
                <input
                  type="text"
                  name="title"
                  value={categoryFormData.title}
                  onChange={handleCategoryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Tech Sector"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={categoryFormData.description}
                  onChange={handleCategoryInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this category"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddCategoryForm(false)
                  setEditingCategory(null)
                  setCategoryFormData({ title: "", description: "" })
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

        {/* Add/Edit Insight Form */}
        {(showAddInsightForm || editingInsight) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingInsight ? "Edit Job Market Insight" : "Add New Job Market Insight"}
            </h2>

            {showAddInsightForm && !editingInsight && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
                <select
                  value={selectedCategoryId || ""}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                <input
                  type="text"
                  name="role"
                  value={insightFormData.role}
                  onChange={handleInsightInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Growth</label>
                <input
                  type="text"
                  name="growth"
                  value={insightFormData.growth}
                  onChange={handleInsightInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., +25%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Salary</label>
                <input
                  type="text"
                  name="avgSalary"
                  value={insightFormData.avgSalary}
                  onChange={handleInsightInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., $120,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demand</label>
                <select
                  name="demand"
                  value={insightFormData.demand}
                  onChange={handleInsightInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select demand level</option>
                  <option value="Very High">Very High</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={insightFormData.imageUrl}
                  onChange={handleInsightInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL for job role image"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Top Locations</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., San Francisco"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddLocation()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddLocation}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {insightFormData.topLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{location}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., React"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSkill()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {insightFormData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-4">Detailed Analysis</h3>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea
                  name="detailedAnalysis.jobDescription"
                  value={insightFormData.detailedAnalysis.jobDescription}
                  onChange={handleInsightInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the job role"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry Trends</label>
                <textarea
                  name="detailedAnalysis.industryTrends"
                  value={insightFormData.detailedAnalysis.industryTrends}
                  onChange={handleInsightInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Current trends in the industry"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input
                  type="text"
                  name="detailedAnalysis.salaryRange"
                  value={insightFormData.detailedAnalysis.salaryRange}
                  onChange={handleInsightInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., $90,000 - $180,000 depending on experience and location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Career Path</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newCareerPath}
                    onChange={(e) => setNewCareerPath(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Junior Developer"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddCareerPath()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCareerPath}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {insightFormData.detailedAnalysis.careerPath.map((path, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{path}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCareerPath(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Companies</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newKeyCompany}
                    onChange={(e) => setNewKeyCompany(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Google"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddKeyCompany()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyCompany}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {insightFormData.detailedAnalysis.keyCompanies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{company}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyCompany(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Future Outlook</label>
                <textarea
                  name="detailedAnalysis.futureOutlook"
                  value={insightFormData.detailedAnalysis.futureOutlook}
                  onChange={handleInsightInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Future prospects for this role"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddInsightForm(false)
                  setEditingInsight(null)
                  setSelectedCategoryId(null)
                  resetInsightForm()
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingInsight ? handleUpdateInsight : handleAddInsight}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!selectedCategoryId && !editingInsight}
              >
                {editingInsight ? "Update Job Insight" : "Add Job Insight"}
              </button>
            </div>
          </div>
        )}

        {/* Categories and Insights List */}
        {categories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No job market insights found. Try a different search or add new content.</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{category.title}</h2>
                  <p className="text-gray-600 mt-1">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditCategory(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id!)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.insights?.map((insight) => (
                  <div key={insight._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">{insight.role}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditInsight(insight)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteInsight(category._id!, insight._id!)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                        Growth: {insight.growth}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Avg. Salary: {insight.avgSalary}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        Top Locations: {insight.topLocations?.join(", ") || "N/A"}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Demand: {insight.demand}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {insight.skills?.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setShowAddInsightForm(true)
                    setSelectedCategoryId(category._id!)
                  }}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add insight to {category.title}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}