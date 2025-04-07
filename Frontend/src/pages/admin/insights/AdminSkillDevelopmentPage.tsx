// AdminSkillDevelopmentPage.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Award, Clock, Star, Plus, Trash, Edit, Search, X } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  imageUrl: string;
  details: {
    overview: string;
    syllabus: {
      title: string;
      description: string[];
      imageUrl?: string;
    }[];
    instructor: {
      name: string;
      bio: string;
      imageUrl: string;
    };
  };
}

interface SkillCategory {
  _id: string;
  title: string;
  description: string;
  courses: Course[];
}

export function AdminSkillDevelopmentPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  });

  const [courseFormData, setCourseFormData] = useState<Omit<Course, "_id">>({
    title: "",
    duration: "",
    level: "",
    rating: 0,
    students: 0,
    imageUrl: "",
    details: {
      overview: "",
      syllabus: [
        {
          title: "",
          description: [""],
          imageUrl: "",
        },
      ],
      instructor: {
        name: "",
        bio: "",
        imageUrl: "",
      },
    },
  });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/skill-development`);
        const data = await response.json();
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories and courses based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      courses: category.courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.level.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.courses.length > 0 ||
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const parts = name.split(".");

      if (parts.length === 2) {
        setCourseFormData((prev) => {
          const firstPart = prev[parts[0] as keyof typeof prev];
          if (typeof firstPart === "object" && firstPart !== null) {
            return {
              ...prev,
              [parts[0]]: {
                ...firstPart,
                [parts[1]]: value,
              },
            };
          }
          return prev;
        });
      } else if (parts.length === 3) {
        setCourseFormData((prev) => {
          const firstPart = prev[parts[0] as keyof typeof prev];
          if (typeof firstPart === "object" && firstPart !== null) {
            const secondPart = firstPart[parts[1] as keyof typeof firstPart];
            if (typeof secondPart === "object" && secondPart !== null) {
              return {
                ...prev,
                [parts[0]]: {
                  ...firstPart,
                  [parts[1]]: {
                    ...secondPart,
                    [parts[2]]: value,
                  },
                },
              };
            }
          }
          return prev;
        });
      }
    } else {
      setCourseFormData((prev) => ({
        ...prev,
        [name]: name === "rating" || name === "students" ? Number(value) : value,
      }));
    }
  };

  const handleSyllabusChange = (index: number, field: string, value: string) => {
    setCourseFormData((prev) => {
      const newSyllabus = [...prev.details.syllabus];

      if (field === "description") {
        newSyllabus[index] = {
          ...newSyllabus[index],
          description: value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== ""),
        };
      } else {
        newSyllabus[index] = {
          ...newSyllabus[index],
          [field]: value,
        };
      }

      return {
        ...prev,
        details: {
          ...prev.details,
          syllabus: newSyllabus,
        },
      };
    });
  };

  const addSyllabusItem = () => {
    setCourseFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        syllabus: [
          ...prev.details.syllabus,
          {
            title: "",
            description: [""],
            imageUrl: "",
          },
        ],
      },
    }));
  };

  const removeSyllabusItem = (index: number) => {
    setCourseFormData((prev) => {
      const newSyllabus = [...prev.details.syllabus];
      newSyllabus.splice(index, 1);

      return {
        ...prev,
        details: {
          ...prev.details,
          syllabus: newSyllabus,
        },
      };
    });
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/skill-development`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setShowAddCategoryForm(false);
      setCategoryFormData({ title: "", description: "" });
      setSuccessMessage("Skill category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      setSuccessMessage("Failed to add category");
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/skill-development/${editingCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const updatedCategory = await response.json();
      setCategories(
        categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        )
      );
      setEditingCategory(null);
      setCategoryFormData({ title: "", description: "" });
      setSuccessMessage("Skill category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      setSuccessMessage("Failed to update category");
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/skill-development/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories(categories.filter((category) => category._id !== id));
      setSuccessMessage("Skill category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      setSuccessMessage("Failed to delete category");
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddCourse = async () => {
    if (!selectedCategoryId) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/skill-development/${selectedCategoryId}/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const updatedCategory = await response.json();
      setCategories(
        categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        )
      );
      setShowAddCourseForm(false);
      setSelectedCategoryId(null);
      resetCourseForm();
      setSuccessMessage("Course added successfully!");
    } catch (error) {
      console.error("Error adding course:", error);
      setSuccessMessage("Failed to add course");
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateCourse = async () => {
    if (!editingCourse || !selectedCategoryId) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/skill-development/${selectedCategoryId}/courses/${editingCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update course");
      }

      const updatedCategory = await response.json();
      setCategories(
        categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        )
      );
      setEditingCourse(null);
      resetCourseForm();
      setSuccessMessage("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
      setSuccessMessage("Failed to update course");
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteCourse = async (categoryId: string, courseId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/skill-development/${categoryId}/courses/${courseId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      const updatedCategory = await response.json();
      setCategories(
        categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        )
      );
      setSuccessMessage("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      setSuccessMessage("Failed to delete course");
    }

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const resetCourseForm = () => {
    setCourseFormData({
      title: "",
      duration: "",
      level: "",
      rating: 0,
      students: 0,
      imageUrl: "",
      details: {
        overview: "",
        syllabus: [
          {
            title: "",
            description: [""],
            imageUrl: "",
          },
        ],
        instructor: {
          name: "",
          bio: "",
          imageUrl: "",
        },
      },
    });
  };

  const startEditCategory = (category: SkillCategory) => {
    setEditingCategory(category);
    setCategoryFormData({
      title: category.title,
      description: category.description,
    });
  };

  const startEditCourse = (course: Course) => {
    // Find the category that contains this course
    const category = categories.find((cat) =>
      cat.courses.some((c) => c._id === course._id)
    );
    
    if (category) {
      setSelectedCategoryId(category._id);
    }

    setEditingCourse(course);
    setCourseFormData({
      title: course.title,
      duration: course.duration,
      level: course.level,
      rating: course.rating,
      students: course.students,
      imageUrl: course.imageUrl,
      details: {
        overview: course.details.overview,
        syllabus: [...course.details.syllabus],
        instructor: {
          name: course.details.instructor.name,
          bio: course.details.instructor.bio,
          imageUrl: course.details.instructor.imageUrl,
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading skill development content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Skill Development
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
                setShowAddCourseForm(true);
                setSelectedCategoryId(categories[0]?._id || null);
              }}
              disabled={categories.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                categories.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              <Plus size={16} />
              Add Course
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
              placeholder="Search courses by title or level..."
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
                ? "Edit Skill Category"
                : "Add New Skill Category"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={categoryFormData.title}
                  onChange={handleCategoryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Technical Skills"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
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
                  setShowAddCategoryForm(false);
                  setEditingCategory(null);
                  setCategoryFormData({ title: "", description: "" });
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

        {/* Add/Edit Course Form */}
        {(showAddCourseForm || editingCourse) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingCourse ? "Edit Course" : "Add New Course"}
            </h2>

            {showAddCourseForm && !editingCourse && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Category
                </label>
                <select
                  value={selectedCategoryId || ""}
                  onChange={(e) =>
                    setSelectedCategoryId(e.target.value)
                  }
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseFormData.title}
                  onChange={handleCourseInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Data Analysis Fundamentals"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={courseFormData.duration}
                  onChange={handleCourseInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 6 weeks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  name="level"
                  value={courseFormData.level}
                  onChange={handleCourseInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={courseFormData.rating}
                  onChange={handleCourseInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 4.8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Students
                </label>
                <input
                  type="number"
                  name="students"
                  min="0"
                  value={courseFormData.students}
                  onChange={handleCourseInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={courseFormData.imageUrl}
                  onChange={handleCourseInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL for course image"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Overview
                </label>
                <textarea
                  name="details.overview"
                  value={courseFormData.details.overview}
                  onChange={handleCourseInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed overview of the course"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-4">Syllabus</h3>

                {courseFormData.details.syllabus.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Section {index + 1}</h4>
                      {courseFormData.details.syllabus.length > 1 && (
                        <button
                          onClick={() => removeSyllabusItem(index)}
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
                          value={item.title}
                          onChange={(e) =>
                            handleSyllabusChange(index, "title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Introduction to Data Analysis"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description Points (comma-separated)
                        </label>
                        <textarea
                          value={item.description.join(", ")}
                          onChange={(e) =>
                            handleSyllabusChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Overview of data analysis process, Types of data and their characteristics"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Section Image URL (optional)
                        </label>
                        <input
                          type="text"
                          value={item.imageUrl || ""}
                          onChange={(e) =>
                            handleSyllabusChange(
                              index,
                              "imageUrl",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="URL for section image"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSyllabusItem}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Syllabus Section
                </button>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-4">
                  Instructor Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructor Name
                    </label>
                    <input
                      type="text"
                      name="details.instructor.name"
                      value={courseFormData.details.instructor.name}
                      onChange={handleCourseInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Dr. Sarah Johnson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructor Bio
                    </label>
                    <textarea
                      name="details.instructor.bio"
                      value={courseFormData.details.instructor.bio}
                      onChange={handleCourseInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief biography of the instructor"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructor Image URL
                    </label>
                    <input
                      type="text"
                      name="details.instructor.imageUrl"
                      value={courseFormData.details.instructor.imageUrl}
                      onChange={handleCourseInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL for instructor image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddCourseForm(false);
                  setEditingCourse(null);
                  setSelectedCategoryId(null);
                  resetCourseForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingCourse ? handleUpdateCourse : handleAddCourse}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingCourse ? "Update Course" : "Add Course"}
              </button>
            </div>
          </div>
        )}

        {/* Categories and Courses List */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              No courses found. Try a different search or add new content.
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {category.title}
                  </h2>
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
                    onClick={() => handleDeleteCategory(category._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.courses.map((course) => (
                  <div
                    key={course._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src={course.imageUrl || "/placeholder.svg"}
                          alt={course.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {course.title}
                          </h3>
                          <div className="space-y-1 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              {course.duration}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Award className="h-4 w-4 mr-2" />
                              {course.level}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="h-4 w-4 mr-2 text-yellow-400" />
                              {course.rating} ({course.students} students)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditCourse(course)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(category._id, course._id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setShowAddCourseForm(true);
                    setSelectedCategoryId(category._id);
                  }}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add course to {category.title}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}