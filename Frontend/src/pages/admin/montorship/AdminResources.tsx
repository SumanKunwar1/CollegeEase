"use client";

import type React from "react";
import { useState } from "react";
import {
  BookOpen,
  Video,
  FileText,
  Plus,
  Save,
  Trash,
  Edit,
  Search,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useToast } from "../../../components/ui/use-toast";

interface Resource {
  id: number;
  title: string;
  author: string;
  type: string;
  description: string;
  downloadUrl: string;
  downloadCount: number;
  rating: number;
  reviewCount: number;
  datePublished: string;
  fileSize: string;
  detailedDescription?: string;
  requirements?: string[];
  videoUrl?: string;
  imageUrl?: string;
}

export function AdminResourcesPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "The Complete Mentorship Guide",
      author: "Dr. Sarah Johnson",
      type: "PDF Guide",
      description:
        "A comprehensive guide to effective mentorship practices and strategies.",
      downloadUrl: "/resources/mentorship-guide.pdf",
      downloadCount: 1250,
      rating: 4.8,
      reviewCount: 156,
      datePublished: "2023-05-15",
      fileSize: "2.4 MB",
      detailedDescription:
        "This comprehensive guide covers all aspects of effective mentorship, from establishing relationships to measuring success. Perfect for both new and experienced mentors.",
      requirements: ["PDF Reader", "Printer (optional)"],
      imageUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Mentorship Session Templates",
      author: "Michael Chen",
      type: "Templates",
      description:
        "Ready-to-use templates for planning and documenting mentorship sessions.",
      downloadUrl: "/resources/session-templates.zip",
      downloadCount: 875,
      rating: 4.6,
      reviewCount: 92,
      datePublished: "2023-06-22",
      fileSize: "1.8 MB",
      detailedDescription:
        "A collection of professionally designed templates to help structure your mentorship sessions, track progress, and set goals.",
      requirements: ["Word Processor", "Spreadsheet Software"],
      imageUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "Effective Feedback Techniques",
      author: "Emily Rodriguez",
      type: "Video",
      description:
        "Learn how to provide constructive feedback that drives growth and development.",
      downloadUrl: "/resources/feedback-techniques.mp4",
      downloadCount: 1050,
      rating: 4.9,
      reviewCount: 128,
      datePublished: "2023-07-10",
      fileSize: "45 MB",
      detailedDescription:
        "This video workshop teaches you proven techniques for delivering feedback that is both constructive and motivating.",
      videoUrl: "https://example.com/videos/feedback-techniques.mp4",
      imageUrl:
        "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=800",
    },
  ]);

  const [newResource, setNewResource] = useState<Omit<Resource, "id">>({
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
  });

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Resource
  ) => {
    if (editingResource) {
      setEditingResource({
        ...editingResource,
        [field]: e.target.value,
      });
    } else {
      setNewResource({
        ...newResource,
        [field]: e.target.value,
      });
    }
  };

  const handleRequirementsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const requirementsArray = e.target.value
      .split("\n")
      .filter((req) => req.trim() !== "");

    if (editingResource) {
      setEditingResource({
        ...editingResource,
        requirements: requirementsArray,
      });
    } else {
      setNewResource({
        ...newResource,
        requirements: requirementsArray,
      });
    }
  };

  const handleAddResource = () => {
    const id =
      resources.length > 0 ? Math.max(...resources.map((r) => r.id)) + 1 : 1;
    const resourceToAdd = { id, ...newResource };

    setResources([...resources, resourceToAdd]);
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
    });
    setShowAddForm(false);

    toast({
      title: "Resource added",
      description: "The resource has been added successfully.",
    });
  };

  const handleUpdateResource = () => {
    if (!editingResource) return;

    setResources(
      resources.map((resource) =>
        resource.id === editingResource.id ? editingResource : resource
      )
    );
    setEditingResource(null);

    toast({
      title: "Resource updated",
      description: "The resource has been updated successfully.",
    });
  };

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter((resource) => resource.id !== id));

    toast({
      title: "Resource deleted",
      description: "The resource has been deleted successfully.",
    });
  };

  const getResourceIcon = (type: string) => {
    if (type.toLowerCase().includes("video"))
      return <Video className="h-5 w-5" />;
    if (type.toLowerCase().includes("template"))
      return <FileText className="h-5 w-5" />;
    return <BookOpen className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Resources
          </h1>
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
              <h2 className="text-xl font-semibold mb-4">
                {editingResource ? "Edit Resource" : "Add New Resource"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <Input
                    value={
                      editingResource
                        ? editingResource.title
                        : newResource.title
                    }
                    onChange={(e) => handleInputChange(e, "title")}
                    placeholder="Resource title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <Input
                    value={
                      editingResource
                        ? editingResource.author
                        : newResource.author
                    }
                    onChange={(e) => handleInputChange(e, "author")}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <Input
                    value={
                      editingResource ? editingResource.type : newResource.type
                    }
                    onChange={(e) => handleInputChange(e, "type")}
                    placeholder="Resource type (e.g., PDF, Video, Template)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Size
                  </label>
                  <Input
                    value={
                      editingResource
                        ? editingResource.fileSize
                        : newResource.fileSize
                    }
                    onChange={(e) => handleInputChange(e, "fileSize")}
                    placeholder="File size (e.g., 2.4 MB)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Download URL
                  </label>
                  <Input
                    value={
                      editingResource
                        ? editingResource.downloadUrl
                        : newResource.downloadUrl
                    }
                    onChange={(e) => handleInputChange(e, "downloadUrl")}
                    placeholder="URL for downloading the resource"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <Input
                    value={
                      editingResource
                        ? editingResource.imageUrl || ""
                        : newResource.imageUrl || ""
                    }
                    onChange={(e) => handleInputChange(e, "imageUrl")}
                    placeholder="URL for resource image"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL (optional)
                  </label>
                  <Input
                    value={
                      editingResource
                        ? editingResource.videoUrl || ""
                        : newResource.videoUrl || ""
                    }
                    onChange={(e) => handleInputChange(e, "videoUrl")}
                    placeholder="URL for video content"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Published
                  </label>
                  <Input
                    type="date"
                    value={
                      editingResource
                        ? editingResource.datePublished
                        : newResource.datePublished
                    }
                    onChange={(e) => handleInputChange(e, "datePublished")}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description
                  </label>
                  <Textarea
                    value={
                      editingResource
                        ? editingResource.description
                        : newResource.description
                    }
                    onChange={(e) => handleInputChange(e, "description")}
                    placeholder="Brief description of the resource"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detailed Description
                  </label>
                  <Textarea
                    value={
                      editingResource
                        ? editingResource.detailedDescription || ""
                        : newResource.detailedDescription || ""
                    }
                    onChange={(e) =>
                      handleInputChange(e, "detailedDescription")
                    }
                    placeholder="Detailed description of the resource"
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements (one per line)
                  </label>
                  <Textarea
                    value={
                      editingResource
                        ? editingResource.requirements
                          ? editingResource.requirements.join("\n")
                          : ""
                        : newResource.requirements
                        ? newResource.requirements.join("\n")
                        : ""
                    }
                    onChange={handleRequirementsChange}
                    placeholder="Enter requirements, one per line"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingResource(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    editingResource ? handleUpdateResource : handleAddResource
                  }
                >
                  <Save className="mr-2 h-4 w-4" />
                  {editingResource ? "Update Resource" : "Add Resource"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resources List */}
        <div className="space-y-6 mb-8">
          {filteredResources.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No resources found. Try a different search or add a new
                resource.
              </p>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
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
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">
                              {resource.title}
                            </h3>
                            <p className="text-gray-500">
                              By {resource.author}
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {resource.type}
                        </span>
                      </div>

                      <p className="mt-4 text-gray-600">
                        {resource.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                        <div>Downloads: {resource.downloadCount}</div>
                        <div>
                          Rating: {resource.rating} ({resource.reviewCount}{" "}
                          reviews)
                        </div>
                        <div>Published: {resource.datePublished}</div>
                        <div>Size: {resource.fileSize}</div>
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingResource(resource)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteResource(resource.id)}
                        >
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
            onClick={() =>
              toast({
                title: "Changes saved",
                description: "All resources have been updated successfully.",
              })
            }
            className="w-full md:w-auto"
          >
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
