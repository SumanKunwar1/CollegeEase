"use client";

import type React from "react";
import { useState } from "react";
import { Calendar, Plus, Trash, Edit, Search, X } from "lucide-react";

interface Interview {
  id: number;
  name: string;
  role: string;
  topic: string;
  insights: string[];
  imageUrl: string;
  date: string;
  fullInterview?: {
    introduction: string;
    videoUrl?: string;
    sections: {
      title: string;
      content: string;
    }[];
    keyTakeaways: string[];
    resources: {
      title: string;
      url: string;
      type: string;
    }[];
  };
}

interface InterviewCategory {
  id: number;
  category: string;
  interviews: Interview[];
}

export function AdminExpertInterviewsPage() {
  const [categories, setCategories] = useState<InterviewCategory[]>([
    {
      id: 1,
      category: "Tech Leaders",
      interviews: [
        {
          id: 1,
          name: "Sarah Chen",
          role: "VP of Engineering at Google",
          topic: "Breaking into Tech Leadership",
          insights: [
            "Building technical teams",
            "Career progression in tech",
            "Future of AI",
          ],
          imageUrl:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
          date: "March 15, 2024",
          fullInterview: {
            introduction:
              "Sarah Chen shares her journey from a software engineer to VP of Engineering at Google, offering invaluable insights into leadership in the tech industry.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            sections: [
              {
                title: "Journey to Leadership",
                content:
                  "My journey into tech leadership began as a software engineer working on complex distributed systems.",
              },
              {
                title: "Building Technical Teams",
                content:
                  "Building effective technical teams is both an art and a science.",
              },
            ],
            keyTakeaways: [
              "Technical leadership requires a different skillset than engineering",
              "Diverse teams lead to better innovation and problem-solving",
            ],
            resources: [
              {
                title: "Leadership in Tech: A Comprehensive Guide",
                url: "#",
                type: "PDF",
              },
            ],
          },
        },
        {
          id: 2,
          name: "Michael Rodriguez",
          role: "CTO at Microsoft",
          topic: "Innovation in Technology",
          insights: [
            "Cloud computing trends",
            "Emerging technologies",
            "Skills for future",
          ],
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
          date: "March 20, 2024",
        },
      ],
    },
    {
      id: 2,
      category: "Academic Leaders",
      interviews: [
        {
          id: 3,
          name: "Dr. Emily Watson",
          role: "Dean of Computer Science, Stanford",
          topic: "Future of Education",
          insights: [
            "Online learning trends",
            "Industry partnerships",
            "Research opportunities",
          ],
          imageUrl:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
          date: "March 25, 2024",
        },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddInterviewForm, setShowAddInterviewForm] = useState(false);
  const [showFullInterviewForm, setShowFullInterviewForm] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<InterviewCategory | null>(null);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(
    null
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedInterviewId, setSelectedInterviewId] = useState<number | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState("");

  // Form states
  const [categoryFormData, setCategoryFormData] = useState<{
    category: string;
  }>({
    category: "",
  });

  const [interviewFormData, setInterviewFormData] = useState<
    Omit<Interview, "id" | "fullInterview">
  >({
    name: "",
    role: "",
    topic: "",
    insights: [],
    imageUrl: "",
    date: "",
  });

  const [fullInterviewFormData, setFullInterviewFormData] = useState<
    NonNullable<Interview["fullInterview"]>
  >({
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
  });

  // Filter categories and interviews based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      interviews: category.interviews.filter(
        (interview) =>
          interview.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          interview.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          interview.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          interview.insights.some((insight) =>
            insight.toLowerCase().includes(searchQuery.toLowerCase())
          )
      ),
    }))
    .filter(
      (category) =>
        category.interviews.length > 0 ||
        category.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryFormData({ category: e.target.value });
  };

  const handleInterviewInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInterviewFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsightsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const insights = e.target.value
      .split(",")
      .map((insight) => insight.trim())
      .filter((insight) => insight !== "");
    setInterviewFormData((prev) => ({ ...prev, insights }));
  };

  const handleFullInterviewInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFullInterviewFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleKeyTakeawaysChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const takeaways = e.target.value
      .split(",")
      .map((takeaway) => takeaway.trim())
      .filter((takeaway) => takeaway !== "");
    setFullInterviewFormData((prev) => ({ ...prev, keyTakeaways: takeaways }));
  };

  const handleSectionChange = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    setFullInterviewFormData((prev) => {
      const newSections = [...prev.sections];
      newSections[index] = { ...newSections[index], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  const addSection = () => {
    setFullInterviewFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", content: "" }],
    }));
  };

  const removeSection = (index: number) => {
    setFullInterviewFormData((prev) => {
      const newSections = [...prev.sections];
      newSections.splice(index, 1);
      return { ...prev, sections: newSections };
    });
  };

  const handleResourceChange = (
    index: number,
    field: "title" | "url" | "type",
    value: string
  ) => {
    setFullInterviewFormData((prev) => {
      const newResources = [...prev.resources];
      newResources[index] = { ...newResources[index], [field]: value };
      return { ...prev, resources: newResources };
    });
  };

  const addResource = () => {
    setFullInterviewFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, { title: "", url: "", type: "" }],
    }));
  };

  const removeResource = (index: number) => {
    setFullInterviewFormData((prev) => {
      const newResources = [...prev.resources];
      newResources.splice(index, 1);
      return { ...prev, resources: newResources };
    });
  };

  const handleAddCategory = () => {
    const newId =
      categories.length > 0
        ? Math.max(...categories.map((cat) => cat.id)) + 1
        : 1;
    const newCategory = {
      id: newId,
      category: categoryFormData.category,
      interviews: [],
    };

    setCategories([...categories, newCategory]);
    setShowAddCategoryForm(false);
    setCategoryFormData({ category: "" });
    setSuccessMessage("Interview category added successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    setCategories(
      categories.map((category) =>
        category.id === editingCategory.id
          ? { ...category, category: categoryFormData.category }
          : category
      )
    );

    setEditingCategory(null);
    setCategoryFormData({ category: "" });
    setSuccessMessage("Interview category updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
    setSuccessMessage("Interview category deleted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddInterview = () => {
    if (!selectedCategoryId) return;

    const newId =
      Math.max(
        ...categories.flatMap((cat) =>
          cat.interviews.map((interview) => interview.id)
        ),
        0
      ) + 1;
    const newInterview = { id: newId, ...interviewFormData };

    setCategories(
      categories.map((category) =>
        category.id === selectedCategoryId
          ? { ...category, interviews: [...category.interviews, newInterview] }
          : category
      )
    );

    setShowAddInterviewForm(false);
    setSelectedCategoryId(null);
    setInterviewFormData({
      name: "",
      role: "",
      topic: "",
      insights: [],
      imageUrl: "",
      date: "",
    });
    setSuccessMessage("Interview added successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateInterview = () => {
    if (!editingInterview) return;

    setCategories(
      categories.map((category) => ({
        ...category,
        interviews: category.interviews.map((interview) =>
          interview.id === editingInterview.id
            ? {
                ...interview,
                ...interviewFormData,
                fullInterview: interview.fullInterview,
              }
            : interview
        ),
      }))
    );

    setEditingInterview(null);
    setInterviewFormData({
      name: "",
      role: "",
      topic: "",
      insights: [],
      imageUrl: "",
      date: "",
    });
    setSuccessMessage("Interview updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddFullInterview = () => {
    if (!selectedInterviewId) return;

    setCategories(
      categories.map((category) => ({
        ...category,
        interviews: category.interviews.map((interview) =>
          interview.id === selectedInterviewId
            ? { ...interview, fullInterview: fullInterviewFormData }
            : interview
        ),
      }))
    );

    setShowFullInterviewForm(false);
    setSelectedInterviewId(null);
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
    });
    setSuccessMessage("Full interview details added successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateFullInterview = () => {
    if (!editingInterview) return;

    setCategories(
      categories.map((category) => ({
        ...category,
        interviews: category.interviews.map((interview) =>
          interview.id === editingInterview.id
            ? { ...interview, fullInterview: fullInterviewFormData }
            : interview
        ),
      }))
    );

    setShowFullInterviewForm(false);
    setEditingInterview(null);
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
    });
    setSuccessMessage("Full interview details updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteInterview = (interviewId: number) => {
    setCategories(
      categories.map((category) => ({
        ...category,
        interviews: category.interviews.filter(
          (interview) => interview.id !== interviewId
        ),
      }))
    );
    setSuccessMessage("Interview deleted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const startEditCategory = (category: InterviewCategory) => {
    setEditingCategory(category);
    setCategoryFormData({ category: category.category });
  };

  const startEditInterview = (interview: Interview) => {
    setEditingInterview(interview);
    setInterviewFormData({
      name: interview.name,
      role: interview.role,
      topic: interview.topic,
      insights: [...interview.insights],
      imageUrl: interview.imageUrl,
      date: interview.date,
    });
  };

  const startEditFullInterview = (interview: Interview) => {
    setEditingInterview(interview);

    if (interview.fullInterview) {
      setFullInterviewFormData({
        introduction: interview.fullInterview.introduction,
        videoUrl: interview.fullInterview.videoUrl || "",
        sections: [...interview.fullInterview.sections],
        keyTakeaways: [...interview.fullInterview.keyTakeaways],
        resources: [...interview.fullInterview.resources],
      });
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
      });
    }

    setShowFullInterviewForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Expert Interviews
          </h1>
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
                setShowAddInterviewForm(true);
                setSelectedCategoryId(categories[0]?.id || null);
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={16} />
              Add Interview
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{successMessage}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setSuccessMessage("")}
            >
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
              {editingCategory
                ? "Edit Interview Category"
                : "Add New Interview Category"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
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
                  setShowAddCategoryForm(false);
                  setEditingCategory(null);
                  setCategoryFormData({ category: "" });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingCategory ? handleUpdateCategory : handleAddCategory
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Interview Form */}
        {(showAddInterviewForm ||
          (editingInterview && !showFullInterviewForm)) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingInterview ? "Edit Interview" : "Add New Interview"}
            </h2>

            {showAddInterviewForm && !editingInterview && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Category
                </label>
                <select
                  value={selectedCategoryId || ""}
                  onChange={(e) =>
                    setSelectedCategoryId(Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Insights (comma-separated)
                </label>
                <textarea
                  value={interviewFormData.insights.join(", ")}
                  onChange={handleInsightsChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Building technical teams, Career progression in tech, Future of AI"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddInterviewForm(false);
                  setEditingInterview(null);
                  setSelectedCategoryId(null);
                  setInterviewFormData({
                    name: "",
                    role: "",
                    topic: "",
                    insights: [],
                    imageUrl: "",
                    date: "",
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingInterview ? handleUpdateInterview : handleAddInterview
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingInterview ? "Update Interview" : "Add Interview"}
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Full Interview Form */}
        {showFullInterviewForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingInterview?.fullInterview
                ? "Edit Full Interview Details"
                : "Add Full Interview Details"}
            </h2>

            {!editingInterview && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Interview
                </label>
                <select
                  value={selectedInterviewId || ""}
                  onChange={(e) =>
                    setSelectedInterviewId(Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.flatMap((category) =>
                    category.interviews.map((interview) => (
                      <option key={interview.id} value={interview.id}>
                        {interview.name} - {interview.topic}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Introduction
                </label>
                <textarea
                  value={fullInterviewFormData.introduction}
                  onChange={(e) =>
                    handleFullInterviewInputChange(e, "introduction")
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed introduction to the interview"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL (optional)
                </label>
                <input
                  type="text"
                  value={fullInterviewFormData.videoUrl}
                  onChange={(e) =>
                    handleFullInterviewInputChange(e, "videoUrl")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., https://www.youtube.com/embed/..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">
                    Interview Sections
                  </h3>
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
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Section {index + 1}</h4>
                      {fullInterviewFormData.sections.length > 1 && (
                        <button
                          onClick={() => removeSection(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Section Title
                        </label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) =>
                            handleSectionChange(index, "title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Journey to Leadership"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Section Content
                        </label>
                        <textarea
                          value={section.content}
                          onChange={(e) =>
                            handleSectionChange(
                              index,
                              "content",
                              e.target.value
                            )
                          }
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Takeaways (comma-separated)
                </label>
                <textarea
                  value={fullInterviewFormData.keyTakeaways.join(", ")}
                  onChange={handleKeyTakeawaysChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Technical leadership requires a different skillset than engineering, Diverse teams lead to better innovation"
                ></textarea>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">
                    Additional Resources
                  </h3>
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
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Resource {index + 1}</h4>
                      {fullInterviewFormData.resources.length > 1 && (
                        <button
                          onClick={() => removeResource(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={resource.title}
                          onChange={(e) =>
                            handleResourceChange(index, "title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Leadership in Tech: A Guide"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL
                        </label>
                        <input
                          type="text"
                          value={resource.url}
                          onChange={(e) =>
                            handleResourceChange(index, "url", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., https://example.com/guide"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          value={resource.type}
                          onChange={(e) =>
                            handleResourceChange(index, "type", e.target.value)
                          }
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

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowFullInterviewForm(false);
                  setEditingInterview(null);
                  setSelectedInterviewId(null);
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
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingInterview?.fullInterview
                    ? handleUpdateFullInterview
                    : handleAddFullInterview
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingInterview?.fullInterview
                  ? "Update Full Interview"
                  : "Add Full Interview"}
              </button>
            </div>
          </div>
        )}

        {/* Categories and Interviews List */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              No interviews found. Try a different search or add new content.
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {category.category}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditCategory(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src={interview.imageUrl || "/placeholder.svg"}
                          alt={interview.name}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {interview.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {interview.role}
                          </p>
                          <p className="text-blue-600 font-medium mt-1">
                            {interview.topic}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditInterview(interview)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteInterview(interview.id)}
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
                        {interview.insights.map((insight, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          >
                            {insight}
                          </span>
                        ))}
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
                        onClick={() => startEditFullInterview(interview)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {interview.fullInterview
                          ? "Edit full details"
                          : "Add full details"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setShowAddInterviewForm(true);
                    setSelectedCategoryId(category.id);
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
  );
}
