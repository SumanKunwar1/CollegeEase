"use client";

import type React from "react";
import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  MapPin,
  Briefcase,
  Plus,
  Trash,
  Edit,
  Search,
  X,
} from "lucide-react";

interface MarketInsight {
  id: number;
  role: string;
  growth: string;
  avgSalary: string;
  topLocations: string[];
  skills: string[];
  demand: string;
  imageUrl: string;
  detailedAnalysis: {
    jobDescription: string;
    industryTrends: string;
    salaryRange: string;
    careerPath: string[];
    keyCompanies: string[];
    futureOutlook: string;
  };
}

interface Category {
  id: number;
  title: string;
  description: string;
  insights: MarketInsight[];
}

export function AdminJobMarketAnalysisPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      title: "Tech Sector",
      description: "Master the technical skills most in demand by employers",
      insights: [
        {
          id: 1,
          role: "Software Engineer",
          growth: "+25%",
          avgSalary: "$120,000",
          topLocations: ["San Francisco", "New York", "Seattle"],
          skills: ["React", "Python", "Cloud Computing"],
          demand: "High",
          imageUrl:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400",
          detailedAnalysis: {
            jobDescription:
              "Software engineers design, develop, and maintain software systems and applications.",
            industryTrends:
              "The demand for software engineers continues to grow across all industries as digital transformation accelerates.",
            salaryRange:
              "$90,000 - $180,000 depending on experience and location",
            careerPath: [
              "Junior Developer",
              "Software Engineer",
              "Senior Engineer",
              "Tech Lead",
              "Engineering Manager",
            ],
            keyCompanies: [
              "Google",
              "Microsoft",
              "Amazon",
              "Facebook",
              "Apple",
            ],
            futureOutlook:
              "Excellent growth prospects with increasing demand for specialized skills in AI, cloud, and security.",
          },
        },
        {
          id: 2,
          role: "Data Scientist",
          growth: "+30%",
          avgSalary: "$130,000",
          topLocations: ["Boston", "Austin", "Chicago"],
          skills: ["Machine Learning", "SQL", "Python"],
          demand: "Very High",
          imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
          detailedAnalysis: {
            jobDescription:
              "Data scientists analyze and interpret complex data to help organizations make better decisions.",
            industryTrends:
              "Growing emphasis on predictive analytics and machine learning across all business sectors.",
            salaryRange:
              "$95,000 - $170,000 depending on experience and location",
            careerPath: [
              "Data Analyst",
              "Data Scientist",
              "Senior Data Scientist",
              "Lead Data Scientist",
              "Chief Data Officer",
            ],
            keyCompanies: ["Amazon", "Microsoft", "Google", "IBM", "Facebook"],
            futureOutlook:
              "Continued strong growth with increasing specialization in specific domains and industries.",
          },
        },
      ],
    },
    {
      id: 2,
      title: "Healthcare",
      description: "Develop essential interpersonal and leadership skills",
      insights: [
        {
          id: 3,
          role: "Healthcare Administrator",
          growth: "+20%",
          avgSalary: "$85,000",
          topLocations: ["Houston", "Los Angeles", "Miami"],
          skills: ["Healthcare Management", "EHR Systems", "Operations"],
          demand: "High",
          imageUrl:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
          detailedAnalysis: {
            jobDescription:
              "Healthcare administrators manage healthcare facilities, departments, or practices.",
            industryTrends:
              "Increasing focus on efficiency, patient experience, and technological integration.",
            salaryRange:
              "$70,000 - $120,000 depending on facility size and location",
            careerPath: [
              "Administrative Assistant",
              "Department Manager",
              "Assistant Administrator",
              "Administrator",
              "Executive Director",
            ],
            keyCompanies: [
              "HCA Healthcare",
              "Kaiser Permanente",
              "Mayo Clinic",
              "Cleveland Clinic",
              "Ascension Health",
            ],
            futureOutlook:
              "Steady growth with increasing demand for administrators who can navigate complex regulatory environments and technology changes.",
          },
        },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddInsightForm, setShowAddInsightForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingInsight, setEditingInsight] = useState<MarketInsight | null>(
    null
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState("");

  // Form states
  const [categoryFormData, setCategoryFormData] = useState<
    Omit<Category, "id" | "insights">
  >({
    title: "",
    description: "",
  });

  const [insightFormData, setInsightFormData] = useState<
    Omit<MarketInsight, "id">
  >({
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
  });

  // Filter insights based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      insights: category.insights.filter(
        (insight) =>
          insight.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          insight.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          insight.topLocations.some((location) =>
            location.toLowerCase().includes(searchQuery.toLowerCase())
          )
      ),
    }))
    .filter(
      (category) =>
        category.insights.length > 0 ||
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsightInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setInsightFormData((prev) => {
        // Ensure we're spreading an object by checking if the parent property exists
        const parentObj = prev[parent as keyof typeof prev] || {};
        if (typeof parentObj === "object" && parentObj !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: value,
            },
          };
        }
        return prev;
      });
    } else {
      setInsightFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleListInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof MarketInsight | string
  ) => {
    const items = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setInsightFormData((prev) => {
        // Ensure we're spreading an object
        const parentObj = prev[parent as keyof typeof prev] || {};
        if (typeof parentObj === "object" && parentObj !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: items,
            },
          };
        }
        return prev;
      });
    } else {
      setInsightFormData((prev) => ({ ...prev, [field]: items }));
    }
  };

  const handleAddCategory = () => {
    const newId =
      categories.length > 0
        ? Math.max(...categories.map((cat) => cat.id)) + 1
        : 1;
    const newCategory = { id: newId, ...categoryFormData, insights: [] };

    setCategories([...categories, newCategory]);
    setShowAddCategoryForm(false);
    setCategoryFormData({ title: "", description: "" });
    setSuccessMessage("Category added successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    setCategories(
      categories.map((category) =>
        category.id === editingCategory.id
          ? {
              ...category,
              title: categoryFormData.title,
              description: categoryFormData.description,
            }
          : category
      )
    );

    setEditingCategory(null);
    setCategoryFormData({ title: "", description: "" });
    setSuccessMessage("Category updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
    setSuccessMessage("Category deleted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddInsight = () => {
    if (!selectedCategoryId) return;

    const newId =
      Math.max(
        ...categories.flatMap((cat) =>
          cat.insights.map((insight) => insight.id)
        ),
        0
      ) + 1;
    const newInsight = { id: newId, ...insightFormData };

    setCategories(
      categories.map((category) =>
        category.id === selectedCategoryId
          ? { ...category, insights: [...category.insights, newInsight] }
          : category
      )
    );

    setShowAddInsightForm(false);
    setSelectedCategoryId(null);
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
    });
    setSuccessMessage("Job market insight added successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateInsight = () => {
    if (!editingInsight) return;

    setCategories(
      categories.map((category) => ({
        ...category,
        insights: category.insights.map((insight) =>
          insight.id === editingInsight.id
            ? { id: insight.id, ...insightFormData }
            : insight
        ),
      }))
    );

    setEditingInsight(null);
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
    });
    setSuccessMessage("Job market insight updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteInsight = (insightId: number) => {
    setCategories(
      categories.map((category) => ({
        ...category,
        insights: category.insights.filter(
          (insight) => insight.id !== insightId
        ),
      }))
    );
    setSuccessMessage("Job market insight deleted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const startEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryFormData({
      title: category.title,
      description: category.description,
    });
  };

  const startEditInsight = (insight: MarketInsight) => {
    setEditingInsight(insight);
    setInsightFormData({
      role: insight.role,
      growth: insight.growth,
      avgSalary: insight.avgSalary,
      topLocations: [...insight.topLocations],
      skills: [...insight.skills],
      demand: insight.demand,
      imageUrl: insight.imageUrl,
      detailedAnalysis: {
        jobDescription: insight.detailedAnalysis.jobDescription,
        industryTrends: insight.detailedAnalysis.industryTrends,
        salaryRange: insight.detailedAnalysis.salaryRange,
        careerPath: [...insight.detailedAnalysis.careerPath],
        keyCompanies: [...insight.detailedAnalysis.keyCompanies],
        futureOutlook: insight.detailedAnalysis.futureOutlook,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Job Market Analysis
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
                setShowAddInsightForm(true);
                setSelectedCategoryId(categories[0]?.id || null);
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
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
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
                  placeholder="e.g., Tech Sector"
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

        {/* Add/Edit Insight Form */}
        {(showAddInsightForm || editingInsight) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingInsight
                ? "Edit Job Market Insight"
                : "Add New Job Market Insight"}
            </h2>

            {showAddInsightForm && !editingInsight && (
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
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Role
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Growth
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Salary
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Demand
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top Locations (comma-separated)
                </label>
                <textarea
                  value={insightFormData.topLocations.join(", ")}
                  onChange={(e) => handleListInputChange(e, "topLocations")}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., San Francisco, New York, Seattle"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma-separated)
                </label>
                <textarea
                  value={insightFormData.skills.join(", ")}
                  onChange={(e) => handleListInputChange(e, "skills")}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React, Python, Cloud Computing"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-4">
                  Detailed Analysis
                </h3>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry Trends
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Career Path (comma-separated)
                </label>
                <textarea
                  value={insightFormData.detailedAnalysis.careerPath.join(", ")}
                  onChange={(e) =>
                    handleListInputChange(e, "detailedAnalysis.careerPath")
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Junior Developer, Software Engineer, Senior Engineer"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Companies (comma-separated)
                </label>
                <textarea
                  value={insightFormData.detailedAnalysis.keyCompanies.join(
                    ", "
                  )}
                  onChange={(e) =>
                    handleListInputChange(e, "detailedAnalysis.keyCompanies")
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Google, Microsoft, Amazon"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Future Outlook
                </label>
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
                  setShowAddInsightForm(false);
                  setEditingInsight(null);
                  setSelectedCategoryId(null);
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
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingInsight ? handleUpdateInsight : handleAddInsight
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingInsight ? "Update Job Insight" : "Add Job Insight"}
              </button>
            </div>
          </div>
        )}

        {/* Categories and Insights List */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              No job market insights found. Try a different search or add new
              content.
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
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
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.insights.map((insight) => (
                  <div
                    key={insight.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {insight.role}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditInsight(insight)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteInsight(insight.id)}
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
                        Top Locations: {insight.topLocations.join(", ")}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Demand: {insight.demand}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {insight.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                        >
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
                    setShowAddInsightForm(true);
                    setSelectedCategoryId(category.id);
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
  );
}
