"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Trash, Edit, Search, X, ExternalLink } from "lucide-react"

interface TrendDetail {
  overview: string
  keyPoints: string[]
  supportLinks: {
    label: string
    url: string
  }[]
}

interface Trend {
  _id: string
  title: string
  description: string
  impact: string
  imageUrl?: string
  details: TrendDetail
}

interface TrendCategory {
  _id: string
  category: string
  trends: Trend[]
}

export function AdminIndustryTrendsPage() {
  const [categories, setCategories] = useState<TrendCategory[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false)
  const [showAddTrendForm, setShowAddTrendForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<TrendCategory | null>(null)
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(true)

  // Form states
  const [categoryFormData, setCategoryFormData] = useState<{
    category: string
  }>({
    category: "",
  })

  const [trendFormData, setTrendFormData] = useState<Omit<Trend, "_id">>({
    title: "",
    description: "",
    impact: "",
    imageUrl: "",
    details: {
      overview: "",
      keyPoints: [],
      supportLinks: [
        {
          label: "",
          url: "",
        },
      ],
    },
  })

  const [newKeyPoint, setNewKeyPoint] = useState("")

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/industry-trends`)
        const data = await response.json()
        if (data.success) {
          setCategories(data.data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Filter categories and trends based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      trends: category.trends.filter(
        (trend) =>
          trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trend.impact.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(
      (category) => category.trends.length > 0 || category.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ category: e.target.value })
  }

  const handleTrendInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setTrendFormData((prev) => {
        const parentObj = prev[parent as keyof typeof prev]
        if (typeof parentObj === "object" && parentObj !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: e.target.value,
            },
          }
        }
        return prev
      })
    } else {
      setTrendFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  const handleAddKeyPoint = () => {
    if (newKeyPoint.trim() !== "") {
      setTrendFormData((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          keyPoints: [...prev.details.keyPoints, newKeyPoint.trim()],
        },
      }))
      setNewKeyPoint("")
    }
  }

  const handleRemoveKeyPoint = (index: number) => {
    setTrendFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        keyPoints: prev.details.keyPoints.filter((_, i) => i !== index),
      },
    }))
  }

  const handleSupportLinkChange = (index: number, field: "label" | "url", value: string) => {
    setTrendFormData((prev) => {
      const newLinks = [...prev.details.supportLinks]
      newLinks[index] = { ...newLinks[index], [field]: value }
      return {
        ...prev,
        details: {
          ...prev.details,
          supportLinks: newLinks,
        },
      }
    })
  }

  const addSupportLink = () => {
    setTrendFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        supportLinks: [
          ...prev.details.supportLinks,
          {
            label: "",
            url: "",
          },
        ],
      },
    }))
  }

  const removeSupportLink = (index: number) => {
    setTrendFormData((prev) => {
      const newLinks = [...prev.details.supportLinks]
      newLinks.splice(index, 1)
      return {
        ...prev,
        details: {
          ...prev.details,
          supportLinks: newLinks,
        },
      }
    })
  }

  const handleAddCategory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/industry-trends`, {
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
        setCategoryFormData({ category: "" })
        setSuccessMessage("Industry trend category added successfully!")
      }
    } catch (error) {
      console.error("Error adding category:", error)
      setSuccessMessage("Failed to add category")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/industry-trends/${editingCategory._id}`,
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
            category._id === editingCategory._id ? data.data : category
          )
        )
        setEditingCategory(null)
        setCategoryFormData({ category: "" })
        setSuccessMessage("Industry trend category updated successfully!")
      }
    } catch (error) {
      console.error("Error updating category:", error)
      setSuccessMessage("Failed to update category")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/industry-trends/${id}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (data.success) {
        setCategories(categories.filter((category) => category._id !== id))
        setSuccessMessage("Industry trend category deleted successfully!")
      }
    } catch (error) {
      console.error("Error deleting category:", error)
      setSuccessMessage("Failed to delete category")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleAddTrend = async () => {
    if (!selectedCategoryId) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/industry-trends/${selectedCategoryId}/trends`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trendFormData),
        }
      )

      const data = await response.json()

      if (data.success) {
        setCategories(
          categories.map((category) =>
            category._id === selectedCategoryId ? data.data : category
          )
        )
        setShowAddTrendForm(false)
        setSelectedCategoryId(null)
        setTrendFormData({
          title: "",
          description: "",
          impact: "",
          imageUrl: "",
          details: {
            overview: "",
            keyPoints: [],
            supportLinks: [
              {
                label: "",
                url: "",
              },
            ],
          },
        })
        setSuccessMessage("Industry trend added successfully!")
      }
    } catch (error) {
      console.error("Error adding trend:", error)
      setSuccessMessage("Failed to add trend")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleUpdateTrend = async () => {
    if (!editingTrend || !editingCategory) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/industry-trends/${editingCategory._id}/trends/${editingTrend._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trendFormData),
        }
      )

      const data = await response.json()

      if (data.success) {
        setCategories(
          categories.map((category) =>
            category._id === editingCategory._id ? data.data : category
          )
        )
        setEditingTrend(null)
        setTrendFormData({
          title: "",
          description: "",
          impact: "",
          imageUrl: "",
          details: {
            overview: "",
            keyPoints: [],
            supportLinks: [
              {
                label: "",
                url: "",
              },
            ],
          },
        })
        setSuccessMessage("Industry trend updated successfully!")
      }
    } catch (error) {
      console.error("Error updating trend:", error)
      setSuccessMessage("Failed to update trend")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleDeleteTrend = async (categoryId: string, trendId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/industry-trends/${categoryId}/trends/${trendId}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (data.success) {
        setCategories(
          categories.map((category) =>
            category._id === categoryId ? data.data : category
          )
        )
        setSuccessMessage("Industry trend deleted successfully!")
      }
    } catch (error) {
      console.error("Error deleting trend:", error)
      setSuccessMessage("Failed to delete trend")
    } finally {
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const startEditCategory = (category: TrendCategory) => {
    setEditingCategory(category)
    setCategoryFormData({ category: category.category })
  }

  const startEditTrend = (trend: Trend) => {
    // Find the category that contains this trend
    const category = categories.find((cat) =>
      cat.trends.some((t) => t._id === trend._id)
    )

    if (category) {
      setEditingTrend(trend)
      setEditingCategory(category)
      setTrendFormData({
        title: trend.title,
        description: trend.description,
        impact: trend.impact,
        imageUrl: trend.imageUrl || "",
        details: {
          overview: trend.details.overview,
          keyPoints: [...trend.details.keyPoints],
          supportLinks: [...trend.details.supportLinks],
        },
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading industry trends...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin: Industry Trends</h1>
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
                setShowAddTrendForm(true)
                setSelectedCategoryId(categories[0]?._id || null)
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={16} />
              Add Trend
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
              placeholder="Search trends by title, description, or impact..."
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
              {editingCategory ? "Edit Trend Category" : "Add New Trend Category"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={categoryFormData.category}
                  onChange={handleCategoryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Emerging Technologies"
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

        {/* Add/Edit Trend Form */}
        {(showAddTrendForm || editingTrend) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingTrend ? "Edit Industry Trend" : "Add New Industry Trend"}
            </h2>

            {showAddTrendForm && !editingTrend && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trend Title</label>
                <input
                  type="text"
                  value={trendFormData.title}
                  onChange={(e) => handleTrendInputChange(e, "title")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AI and Machine Learning"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                <input
                  type="text"
                  value={trendFormData.impact}
                  onChange={(e) => handleTrendInputChange(e, "impact")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., High impact on automation and decision-making"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={trendFormData.description}
                  onChange={(e) => handleTrendInputChange(e, "description")}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the trend"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={trendFormData.imageUrl}
                  onChange={(e) => handleTrendInputChange(e, "imageUrl")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL for trend image"
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-2">Detailed Information</h3>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
                <textarea
                  value={trendFormData.details.overview}
                  onChange={(e) => handleTrendInputChange(e, "details.overview")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed overview of the trend"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Points</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newKeyPoint}
                    onChange={(e) => setNewKeyPoint(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Growing demand for AI specialists"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyPoint}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {trendFormData.details.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-2 rounded">
                      <span className="flex-1">{point}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyPoint(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Support Links</h3>
                  <button
                    type="button"
                    onClick={addSupportLink}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Link
                  </button>
                </div>

                {trendFormData.details.supportLinks.map((link, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Link {index + 1}</h4>
                      {trendFormData.details.supportLinks.length > 1 && (
                        <button onClick={() => removeSupportLink(index)} className="text-red-600 hover:text-red-700">
                          <Trash size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleSupportLinkChange(index, "label", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., AI Career Paths Guide"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleSupportLinkChange(index, "url", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., https://example.com/ai-careers"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddTrendForm(false)
                  setEditingTrend(null)
                  setSelectedCategoryId(null)
                  setTrendFormData({
                    title: "",
                    description: "",
                    impact: "",
                    imageUrl: "",
                    details: {
                      overview: "",
                      keyPoints: [],
                      supportLinks: [
                        {
                          label: "",
                          url: "",
                        },
                      ],
                    },
                  })
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingTrend ? handleUpdateTrend : handleAddTrend}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingTrend ? "Update Trend" : "Add Trend"}
              </button>
            </div>
          </div>
        )}

        {/* Categories and Trends List */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No industry trends found. Try a different search or add new content.</p>
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
                {category.trends.map((trend) => (
                  <div key={trend._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {trend.imageUrl && (
                          <img
                            src={trend.imageUrl}
                            alt={trend.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{trend.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{trend.description}</p>
                          <p className="text-blue-600 font-medium mt-1">{trend.impact}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditTrend(trend)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTrend(category._id, trend._id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Key Points:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {trend.details.keyPoints.slice(0, 2).map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                        {trend.details.keyPoints.length > 2 && (
                          <li>...and {trend.details.keyPoints.length - 2} more</li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Support Links:</h4>
                      <div className="space-y-1">
                        {trend.details.supportLinks.map((link, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <ExternalLink className="h-3 w-3 text-blue-600 mr-1" />
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {link.label}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setShowAddTrendForm(true)
                    setSelectedCategoryId(category._id)
                  }}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add trend to {category.category}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}