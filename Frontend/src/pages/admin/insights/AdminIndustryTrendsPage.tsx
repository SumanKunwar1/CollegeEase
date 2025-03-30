"use client";

import type React from "react";
import { useState } from "react";
import { Plus, Trash, Edit, Search, X, ExternalLink } from "lucide-react";

interface TrendDetail {
  overview: string;
  keyPoints: string[];
  supportLinks: {
    label: string;
    url: string;
  }[];
}

interface Trend {
  id: string;
  title: string;
  description: string;
  impact: string;
  imageUrl?: string;
  details: TrendDetail;
}

interface TrendCategory {
  id: number;
  category: string;
  trends: Trend[];
}

export function AdminIndustryTrendsPage() {
  const [categories, setCategories] = useState<TrendCategory[]>([
    {
      id: 1,
      category: "Emerging Technologies",
      trends: [
        {
          id: "ai-ml",
          title: "AI and Machine Learning",
          description:
            "Artificial Intelligence and Machine Learning are transforming industries across the board.",
          impact:
            "High impact on automation, decision-making, and customer experience",
          imageUrl:
            "https://images.unsplash.com/photo-1677442135968-6d89469c5f97?auto=format&fit=crop&q=80&w=400",
          details: {
            overview:
              "AI and ML technologies are rapidly evolving, with applications ranging from predictive analytics to natural language processing and computer vision.",
            keyPoints: [
              "Growing demand for AI specialists across all industries",
              "Ethical considerations becoming increasingly important",
              "Democratization of AI tools making them accessible to more businesses",
            ],
            supportLinks: [
              {
                label: "AI Career Paths Guide",
                url: "https://example.com/ai-careers",
              },
              {
                label: "Machine Learning Fundamentals",
                url: "https://example.com/ml-fundamentals",
              },
            ],
          },
        },
        {
          id: "blockchain",
          title: "Blockchain Technology",
          description:
            "Beyond cryptocurrency, blockchain is finding applications in supply chain, healthcare, and more.",
          impact:
            "Medium to high impact on data security, transparency, and decentralization",
          imageUrl:
            "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=400",
          details: {
            overview:
              "Blockchain technology provides a secure, decentralized way to record transactions and manage data, with implications far beyond cryptocurrency.",
            keyPoints: [
              "Enterprise blockchain solutions gaining traction",
              "Smart contracts automating business processes",
              "Increasing focus on scalability and energy efficiency",
            ],
            supportLinks: [
              {
                label: "Blockchain in Business",
                url: "https://example.com/blockchain-business",
              },
              {
                label: "Smart Contracts Explained",
                url: "https://example.com/smart-contracts",
              },
            ],
          },
        },
      ],
    },
    {
      id: 2,
      category: "Workplace Trends",
      trends: [
        {
          id: "remote-work",
          title: "Remote and Hybrid Work",
          description:
            "The pandemic accelerated the shift to remote work, leading to permanent changes in workplace models.",
          impact:
            "High impact on workplace flexibility, talent acquisition, and office space utilization",
          imageUrl:
            "https://images.unsplash.com/photo-1585974738771-84483dd9f89f?auto=format&fit=crop&q=80&w=400",
          details: {
            overview:
              "Remote and hybrid work models have become mainstream, offering flexibility but also presenting challenges in collaboration and company culture.",
            keyPoints: [
              "Companies adopting permanent hybrid policies",
              "Technology enabling seamless remote collaboration",
              "Impact on commercial real estate and urban planning",
            ],
            supportLinks: [
              {
                label: "Effective Remote Team Management",
                url: "https://example.com/remote-management",
              },
              {
                label: "Hybrid Work Best Practices",
                url: "https://example.com/hybrid-work",
              },
            ],
          },
        },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddTrendForm, setShowAddTrendForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TrendCategory | null>(
    null
  );
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState("");

  // Form states
  const [categoryFormData, setCategoryFormData] = useState<{
    category: string;
  }>({
    category: "",
  });

  const [trendFormData, setTrendFormData] = useState<Omit<Trend, "id">>({
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
  });

  // Filter categories and trends based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      trends: category.trends.filter(
        (trend) =>
          trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trend.impact.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.trends.length > 0 ||
        category.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryFormData({ category: e.target.value });
  };

  const handleTrendInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setTrendFormData((prev) => {
        // Ensure we're spreading an object
        const parentObj = prev[parent as keyof typeof prev];
        if (typeof parentObj === "object" && parentObj !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: e.target.value,
            },
          };
        }
        return prev;
      });
    } else {
      setTrendFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleKeyPointsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const keyPoints = e.target.value
      .split(",")
      .map((point) => point.trim())
      .filter((point) => point !== "");
    setTrendFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        keyPoints,
      },
    }));
  };

  const handleSupportLinkChange = (
    index: number,
    field: "label" | "url",
    value: string
  ) => {
    setTrendFormData((prev) => {
      const newLinks = [...prev.details.supportLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return {
        ...prev,
        details: {
          ...prev.details,
          supportLinks: newLinks,
        },
      };
    });
  };

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
    }));
  };

  const removeSupportLink = (index: number) => {
    setTrendFormData((prev) => {
      const newLinks = [...prev.details.supportLinks];
      newLinks.splice(index, 1);
      return {
        ...prev,
        details: {
          ...prev.details,
          supportLinks: newLinks,
        },
      };
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
      trends: [],
    };

    setCategories([...categories, newCategory]);
    setShowAddCategoryForm(false);
    setCategoryFormData({ category: "" });
    setSuccessMessage("Industry trend category added successfully!");

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
    setSuccessMessage("Industry trend category updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
    setSuccessMessage("Industry trend category deleted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddTrend = () => {
    if (!selectedCategoryId) return;

    // Generate a URL-friendly ID from the title
    const id = trendFormData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newTrend = { id, ...trendFormData };

    setCategories(
      categories.map((category) =>
        category.id === selectedCategoryId
          ? { ...category, trends: [...category.trends, newTrend] }
          : category
      )
    );

    setShowAddTrendForm(false);
    setSelectedCategoryId(null);
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
    });
    setSuccessMessage("Industry trend added successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateTrend = () => {
    if (!editingTrend) return;

    setCategories(
      categories.map((category) => ({
        ...category,
        trends: category.trends.map((trend) =>
          trend.id === editingTrend.id ? { ...trend, ...trendFormData } : trend
        ),
      }))
    );

    setEditingTrend(null);
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
    });
    setSuccessMessage("Industry trend updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteTrend = (trendId: string) => {
    setCategories(
      categories.map((category) => ({
        ...category,
        trends: category.trends.filter((trend) => trend.id !== trendId),
      }))
    );
    setSuccessMessage("Industry trend deleted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const startEditCategory = (category: TrendCategory) => {
    setEditingCategory(category);
    setCategoryFormData({ category: category.category });
  };

  const startEditTrend = (trend: Trend) => {
    setEditingTrend(trend);
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
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Industry Trends
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
                setShowAddTrendForm(true);
                setSelectedCategoryId(categories[0]?.id || null);
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
              {editingCategory
                ? "Edit Trend Category"
                : "Add New Trend Category"}
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
                  placeholder="e.g., Emerging Technologies"
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

        {/* Add/Edit Trend Form */}
        {(showAddTrendForm || editingTrend) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingTrend ? "Edit Industry Trend" : "Add New Industry Trend"}
            </h2>

            {showAddTrendForm && !editingTrend && (
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
                  Trend Title
                </label>
                <input
                  type="text"
                  value={trendFormData.title}
                  onChange={(e) => handleTrendInputChange(e, "title")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AI and Machine Learning"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impact
                </label>
                <input
                  type="text"
                  value={trendFormData.impact}
                  onChange={(e) => handleTrendInputChange(e, "impact")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., High impact on automation and decision-making"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={trendFormData.description}
                  onChange={(e) => handleTrendInputChange(e, "description")}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the trend"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={trendFormData.imageUrl}
                  onChange={(e) => handleTrendInputChange(e, "imageUrl")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL for trend image"
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-2">
                  Detailed Information
                </h3>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview
                </label>
                <textarea
                  value={trendFormData.details.overview}
                  onChange={(e) =>
                    handleTrendInputChange(e, "details.overview")
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed overview of the trend"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Points (comma-separated)
                </label>
                <textarea
                  value={trendFormData.details.keyPoints.join(", ")}
                  onChange={handleKeyPointsChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Growing demand for AI specialists, Ethical considerations becoming important"
                ></textarea>
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
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Link {index + 1}</h4>
                      {trendFormData.details.supportLinks.length > 1 && (
                        <button
                          onClick={() => removeSupportLink(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) =>
                            handleSupportLinkChange(
                              index,
                              "label",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., AI Career Paths Guide"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL
                        </label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            handleSupportLinkChange(
                              index,
                              "url",
                              e.target.value
                            )
                          }
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
                  setShowAddTrendForm(false);
                  setEditingTrend(null);
                  setSelectedCategoryId(null);
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
                  });
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
            <p className="text-gray-500">
              No industry trends found. Try a different search or add new
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
                {category.trends.map((trend) => (
                  <div
                    key={trend.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {trend.imageUrl && (
                          <img
                            src={trend.imageUrl || "/placeholder.svg"}
                            alt={trend.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {trend.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {trend.description}
                          </p>
                          <p className="text-blue-600 font-medium mt-1">
                            {trend.impact}
                          </p>
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
                          onClick={() => handleDeleteTrend(trend.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-1">
                        Key Points:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {trend.details.keyPoints
                          .slice(0, 2)
                          .map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        {trend.details.keyPoints.length > 2 && (
                          <li>
                            ...and {trend.details.keyPoints.length - 2} more
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-1">
                        Support Links:
                      </h4>
                      <div className="space-y-1">
                        {trend.details.supportLinks.map((link, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm"
                          >
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
                    setShowAddTrendForm(true);
                    setSelectedCategoryId(category.id);
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
  );
}
