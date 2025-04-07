"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BookOpen, Video, FileText, Plus, Save, Trash, Edit, Search, X } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { useEnhancedToast } from "../../../components/ui/enhanced-toast"
import { Badge } from "../../../components/ui/badge"

interface Resource {
  _id: string
  title: string
  author: string
  type: string
  description: string
  downloadUrl: string
  downloadCount: number
  rating: number
  reviewCount: number
  datePublished: string
  fileSize: string
  detailedDescription?: string
  requirements?: string[]
  videoUrl?: string
  imageUrl?: string
}

export function AdminResourcesPage() {
  const { toast } = useEnhancedToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [currentRequirement, setCurrentRequirement] = useState("")
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [newResource, setNewResource] = useState<Omit<Resource, "_id">>({
    title: "",
    author: "",
    type: "",
    description: "",
    downloadUrl: "",
    downloadCount: 0,
    rating: 0,
    reviewCount: 0,
    datePublished: new Date().toISOString().split("T")[0],
    fileSize: "",
    detailedDescription: "",
    requirements: [],
    imageUrl: "",
  })

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  // Fetch all resources
  const fetchResources = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/resources?search=${searchQuery}`)
      if (!response.ok) throw new Error('Failed to fetch resources')
      const data = await response.json()
      setResources(data.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch resources",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchResources()
  }, [])

  // Handle search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResources()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Resource) => {
    if (editingResource) {
      setEditingResource({
        ...editingResource,
        [field]: e.target.value,
      })
    } else {
      setNewResource({
        ...newResource,
        [field]: e.target.value,
      })
    }
  }

  const handleAddRequirement = () => {
    if (!currentRequirement.trim()) return

    if (editingResource) {
      const updatedRequirements = [...(editingResource.requirements || []), currentRequirement.trim()]
      setEditingResource({
        ...editingResource,
        requirements: updatedRequirements,
      })
    } else {
      const updatedRequirements = [...(newResource.requirements || []), currentRequirement.trim()]
      setNewResource({
        ...newResource,
        requirements: updatedRequirements,
      })
    }

    setCurrentRequirement("")
  }

  const handleRemoveRequirement = (index: number) => {
    if (editingResource) {
      const updatedRequirements = [...(editingResource.requirements || [])]
      updatedRequirements.splice(index, 1)
      setEditingResource({
        ...editingResource,
        requirements: updatedRequirements,
      })
    } else {
      const updatedRequirements = [...(newResource.requirements || [])]
      updatedRequirements.splice(index, 1)
      setNewResource({
        ...newResource,
        requirements: updatedRequirements,
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddRequirement()
    }
  }

  const handleAddResource = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResource),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add resource')
      }
      
      await fetchResources()
      setNewResource({
        title: "",
        author: "",
        type: "",
        description: "",
        downloadUrl: "",
        downloadCount: 0,
        rating: 0,
        reviewCount: 0,
        datePublished: new Date().toISOString().split("T")[0],
        fileSize: "",
        detailedDescription: "",
        requirements: [],
        imageUrl: "",
      })
      setShowAddForm(false)

      toast({
        title: "Resource added",
        description: "The resource has been added successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add resource",
        variant: "destructive",
      })
    }
  }

  const handleUpdateResource = async () => {
    if (!editingResource) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/resources/${editingResource._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingResource),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update resource')
      }
      
      await fetchResources()
      setEditingResource(null)

      toast({
        title: "Resource updated",
        description: "The resource has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update resource",
        variant: "destructive",
      })
    }
  }

  const handleDeleteResource = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/resources/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete resource')
      }
      
      await fetchResources()

      toast({
        title: "Resource deleted",
        description: "The resource has been deleted successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete resource",
        variant: "destructive",
      })
    }
  }

  const getResourceIcon = (type: string) => {
    if (type.toLowerCase().includes("video")) return <Video className="h-5 w-5" />
    if (type.toLowerCase().includes("template")) return <FileText className="h-5 w-5" />
    return <BookOpen className="h-5 w-5" />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin: Manage Resources</h1>
          <div className="flex gap-4">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Resource
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
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingResource) && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">{editingResource ? "Edit Resource" : "Add New Resource"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={editingResource ? editingResource.title : newResource.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    placeholder="Resource title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <Input
                    value={editingResource ? editingResource.author : newResource.author}
                    onChange={(e) => handleInputChange(e, "author")}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <Input
                    value={editingResource ? editingResource.type : newResource.type}
                    onChange={(e) => handleInputChange(e, "type")}
                    placeholder="Resource type (e.g., PDF, Video, Template)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                  <Input
                    value={editingResource ? editingResource.fileSize : newResource.fileSize}
                    onChange={(e) => handleInputChange(e, "fileSize")}
                    placeholder="File size (e.g., 2.4 MB)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Download URL</label>
                  <Input
                    value={editingResource ? editingResource.downloadUrl : newResource.downloadUrl}
                    onChange={(e) => handleInputChange(e, "downloadUrl")}
                    placeholder="URL for downloading the resource"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <Input
                    value={editingResource ? editingResource.imageUrl || "" : newResource.imageUrl || ""}
                    onChange={(e) => handleInputChange(e, "imageUrl")}
                    placeholder="URL for resource image"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (optional)</label>
                  <Input
                    value={editingResource ? editingResource.videoUrl || "" : newResource.videoUrl || ""}
                    onChange={(e) => handleInputChange(e, "videoUrl")}
                    placeholder="URL for video content"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Published</label>
                  <Input
                    type="date"
                    value={editingResource ? editingResource.datePublished : newResource.datePublished}
                    onChange={(e) => handleInputChange(e, "datePublished")}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <Textarea
                    value={editingResource ? editingResource.description : newResource.description}
                    onChange={(e) => handleInputChange(e, "description")}
                    placeholder="Brief description of the resource"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                  <Textarea
                    value={
                      editingResource
                        ? editingResource.detailedDescription || ""
                        : newResource.detailedDescription || ""
                    }
                    onChange={(e) => handleInputChange(e, "detailedDescription")}
                    placeholder="Detailed description of the resource"
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={currentRequirement}
                      onChange={(e) => setCurrentRequirement(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a requirement and press Add (or Enter)"
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddRequirement}>
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {(editingResource?.requirements || newResource.requirements || []).map((req, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                        {req}
                        <button
                          type="button"
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          onClick={() => handleRemoveRequirement(index)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {(editingResource?.requirements || newResource.requirements || []).length === 0 && (
                      <p className="text-sm text-gray-500">No requirements added yet.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingResource(null)
                    setCurrentRequirement("")
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingResource ? handleUpdateResource : handleAddResource}>
                  <Save className="mr-2 h-4 w-4" />
                  {editingResource ? "Update Resource" : "Add Resource"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resources List */}
        <div className="space-y-6 mb-8">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No resources found. Try a different search or add a new resource.</p>
            </div>
          ) : (
            resources.map((resource) => (
              <Card key={resource._id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {resource.imageUrl && (
                      <div className="md:w-1/4">
                        <img
                          src={resource.imageUrl || "/placeholder.svg"}
                          alt={resource.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 md:w-3/4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">{getResourceIcon(resource.type)}</div>
                          <div>
                            <h3 className="text-xl font-semibold">{resource.title}</h3>
                            <p className="text-gray-500">By {resource.author}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {resource.type}
                        </span>
                      </div>

                      <p className="mt-4 text-gray-600">{resource.description}</p>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                        <div>Downloads: {resource.downloadCount}</div>
                        <div>
                          Rating: {resource.rating} ({resource.reviewCount} reviews)
                        </div>
                        <div>Published: {resource.datePublished}</div>
                        <div>Size: {resource.fileSize}</div>
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <Button variant="outline" size="sm" onClick={() => setEditingResource(resource)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteResource(resource._id)}>
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

        <div className="sticky bottom-6 bg-white p-4 rounded-lg shadow-lg border flex justify-end">
          <Button
            onClick={() => {
              fetchResources()
              toast({
                title: "Changes saved",
                description: "All resources have been updated successfully.",
              })
            }}
            className="w-full md:w-auto"
          >
            <Save className="mr-2 h-4 w-4" />
            Refresh Resources
          </Button>
        </div>
      </div>
    </div>
  )
}