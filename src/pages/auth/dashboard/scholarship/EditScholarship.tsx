import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Calendar,
  Globe,
  Award,
  CheckCircle,
  DollarSign,
  Star,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { scholarshipsData } from "../../../../data/scholarshipdata";

const EditScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<string>("");
  const [scholarship, setScholarship] = useState(() => {
    const foundScholarship = scholarshipsData.find((s) => s.id === id);
    if (!foundScholarship) {
      navigate("/not-found"); // Redirect if scholarship not found
    }
    return foundScholarship!;
  });

  if (!scholarship) {
    return <div>Scholarship not found</div>;
  }

  // Handle cover image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text updates
  const handleTextUpdate = (field: string, value: string) => {
    setScholarship((prev) => ({ ...prev, [field]: value }));
  };

  // Utility function to update nested fields
  const updateNestedField = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  };

  // Handle list updates (e.g., academic requirements, study levels, etc.)
  const handleListUpdate = (
    field: string,
    index: number,
    value: string,
    list: string[]
  ) => {
    const newList = [...list];
    newList[index] = value;
    setScholarship((prev) => {
      const updatedScholarship = { ...prev };
      updateNestedField(updatedScholarship, field, newList);
      return updatedScholarship;
    });
  };

  // Add a new item to a list
  const addListItem = (field: string, list: string[]) => {
    const newList = [...list, ""];
    setScholarship((prev) => {
      const updatedScholarship = { ...prev };
      updateNestedField(updatedScholarship, field, newList);
      return updatedScholarship;
    });
  };

  // Remove an item from a list
  const removeListItem = (field: string, index: number, list: string[]) => {
    const newList = list.filter((_, i) => i !== index);
    setScholarship((prev) => {
      const updatedScholarship = { ...prev };
      updateNestedField(updatedScholarship, field, newList);
      return updatedScholarship;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      {/* Hero Section */}
      <div className="relative h-80 rounded-xl overflow-hidden mb-8">
        {coverImage || scholarship.coverImage ? (
          <img
            src={coverImage || scholarship.coverImage}
            alt="Scholarship Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center group cursor-pointer">
            <label
              htmlFor="coverImageUpload"
              className="cursor-pointer flex flex-col items-center p-6 bg-white bg-opacity-50 rounded-lg shadow-sm transition-all duration-200 hover:bg-opacity-100 hover:shadow-md"
              style={{ zIndex: 10 }} // Ensure the label is above other elements
            >
              <Upload className="h-12 w-12 text-blue-500 mb-2" />
              <span className="text-gray-700 font-medium">
                Upload Cover Image
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Click to browse
              </span>
            </label>
            <input
              id="coverImageUpload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              onClick={(e) => (e.currentTarget.value = "")}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="p-8 text-white">
            <h1
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleTextUpdate("name", e.currentTarget.textContent || "")
              }
              className="text-4xl font-bold mb-2 outline-none"
            >
              {scholarship.name}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-1" />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleTextUpdate(
                      "provider",
                      e.currentTarget.textContent || ""
                    )
                  }
                  className="outline-none"
                >
                  {scholarship.provider}
                </span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-400 mr-1" />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleTextUpdate(
                      "amount",
                      e.currentTarget.textContent || ""
                    )
                  }
                  className="outline-none"
                >
                  {scholarship.amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Scholarship Overview
              </h2>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleTextUpdate(
                    "vision.purpose",
                    e.currentTarget.textContent || ""
                  )
                }
                className="text-gray-600 mb-4 outline-none"
              >
                {scholarship.vision.purpose}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleTextUpdate(
                        "deadline",
                        e.currentTarget.textContent || ""
                      )
                    }
                    className="outline-none"
                  >
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleTextUpdate(
                          "eligibleCountries",
                          e.currentTarget.textContent || ""
                        )
                      }
                      className="outline-none"
                    >
                      {scholarship.eligibleCountries.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Eligibility */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Eligibility Requirements
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Academic Requirements
                  </h3>
                  <div className="grid gap-4">
                    {scholarship.eligibility.academicRequirements.map(
                      (req, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              handleListUpdate(
                                "eligibility.academicRequirements",
                                index,
                                e.currentTarget.textContent || "",
                                scholarship.eligibility.academicRequirements
                              )
                            }
                            className="text-gray-600 outline-none"
                          >
                            {req}
                          </span>
                          <button
                            onClick={() =>
                              removeListItem(
                                "eligibility.academicRequirements",
                                index,
                                scholarship.eligibility.academicRequirements
                              )
                            }
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    )}
                    <button
                      onClick={() =>
                        addListItem(
                          "eligibility.academicRequirements",
                          scholarship.eligibility.academicRequirements
                        )
                      }
                      className="flex items-center text-blue-500 hover:text-blue-600"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Requirement
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Study Levels
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.eligibility.studyLevel.map((level, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleListUpdate(
                              "eligibility.studyLevel",
                              index,
                              e.currentTarget.textContent || "",
                              scholarship.eligibility.studyLevel
                            )
                          }
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 outline-none"
                        >
                          {level}
                        </span>
                        <button
                          onClick={() =>
                            removeListItem(
                              "eligibility.studyLevel",
                              index,
                              scholarship.eligibility.studyLevel
                            )
                          }
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addListItem(
                          "eligibility.studyLevel",
                          scholarship.eligibility.studyLevel
                        )
                      }
                      className="flex items-center text-blue-500 hover:text-blue-600"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Study Level
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Scholarship Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Financial Coverage
                  </h3>
                  <div className="space-y-2">
                    {scholarship.benefits.coverage.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleListUpdate(
                              "benefits.coverage",
                              index,
                              e.currentTarget.textContent || "",
                              scholarship.benefits.coverage
                            )
                          }
                          className="text-gray-600 outline-none"
                        >
                          {benefit}
                        </span>
                        <button
                          onClick={() =>
                            removeListItem(
                              "benefits.coverage",
                              index,
                              scholarship.benefits.coverage
                            )
                          }
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addListItem(
                          "benefits.coverage",
                          scholarship.benefits.coverage
                        )
                      }
                      className="flex items-center text-blue-500 hover:text-blue-600"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Coverage
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Additional Perks
                  </h3>
                  <div className="space-y-2">
                    {scholarship.benefits.additionalPerks.map((perk, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleListUpdate(
                              "benefits.additionalPerks",
                              index,
                              e.currentTarget.textContent || "",
                              scholarship.benefits.additionalPerks
                            )
                          }
                          className="text-gray-600 outline-none"
                        >
                          {perk}
                        </span>
                        <button
                          onClick={() =>
                            removeListItem(
                              "benefits.additionalPerks",
                              index,
                              scholarship.benefits.additionalPerks
                            )
                          }
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addListItem(
                          "benefits.additionalPerks",
                          scholarship.benefits.additionalPerks
                        )
                      }
                      className="flex items-center text-blue-500 hover:text-blue-600"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Perk
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleTextUpdate(
                        "status",
                        e.currentTarget.textContent || ""
                      )
                    }
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 outline-none"
                  >
                    {scholarship.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type</span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleTextUpdate(
                        "type",
                        e.currentTarget.textContent || ""
                      )
                    }
                    className="font-medium outline-none"
                  >
                    {scholarship.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Age Limit</span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleTextUpdate(
                        "eligibility.ageLimit",
                        e.currentTarget.textContent || ""
                      )
                    }
                    className="font-medium outline-none"
                  >
                    {scholarship.eligibility.ageLimit}
                  </span>
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Steps
              </h3>
              <div className="space-y-4">
                {scholarship.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-medium">
                      {index + 1}
                    </div>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleListUpdate(
                          "applicationProcess",
                          index,
                          e.currentTarget.textContent || "",
                          scholarship.applicationProcess
                        )
                      }
                      className="text-gray-600 outline-none"
                    >
                      {step}
                    </span>
                    <button
                      onClick={() =>
                        removeListItem(
                          "applicationProcess",
                          index,
                          scholarship.applicationProcess
                        )
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    addListItem(
                      "applicationProcess",
                      scholarship.applicationProcess
                    )
                  }
                  className="flex items-center text-blue-500 hover:text-blue-600"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Step
                </button>
              </div>
              <Button
                onClick={() =>
                  navigate(`/scholarships/${scholarship.id}/apply`)
                }
                className="w-full mt-6 bg-blue-600 text-white"
              >
                Apply Now
              </Button>
            </div>

            {/* Institution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About the Institution
              </h3>
              <p className="text-gray-600 mb-4">
                {scholarship.institution.history}
              </p>
              <div className="space-y-2">
                {scholarship.institution.achievements.map(
                  (achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{achievement}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditScholarship;
