import React, { useState } from "react";
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

function AddNewScholarship() {
  const [coverImage, setCoverImage] = useState<string>("");
  const [academicRequirements, setAcademicRequirements] = useState([""]);
  const [studyLevels, setStudyLevels] = useState([""]);
  const [coverage, setCoverage] = useState([""]);
  const [additionalPerks, setAdditionalPerks] = useState([""]);
  const [applicationSteps, setApplicationSteps] = useState([""]);
  const [achievements, setAchievements] = useState([""]);

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

  const handleListChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  const addListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    setter([...list, ""]);
  };

  const removeListItem = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    const newList = list.filter((_, i) => i !== index);
    setter(newList);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0">
          {coverImage ? (
            <img
              src={coverImage}
              alt="Cover"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end">
            <div className="p-8 text-white w-full">
              <input
                type="text"
                placeholder="Scholarship Name"
                className="text-4xl font-bold mb-4 bg-transparent border-b border-white/30 placeholder-white/50 w-full focus:outline-none focus:border-white/70 transition-colors"
              />
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-white/70" />
                  <input
                    type="text"
                    placeholder="Provider"
                    className="bg-transparent border-b border-white/30 placeholder-white/50 focus:outline-none focus:border-white/70 transition-colors text-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <input
                    type="text"
                    placeholder="Amount"
                    className="bg-transparent border-b border-white/30 placeholder-white/50 focus:outline-none focus:border-white/70 transition-colors text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          {coverImage && (
            <button
              onClick={() => setCoverImage("")}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Scholarship Overview
              </h2>
              <textarea
                placeholder="Enter scholarship purpose and vision..."
                className="w-full h-32 p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    className="border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Deadline"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="border rounded-md p-1 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Eligible Countries (comma-separated)"
                  />
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
                  <div className="space-y-2">
                    {academicRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <input
                          type="text"
                          value={req}
                          onChange={(e) =>
                            handleListChange(
                              index,
                              e.target.value,
                              setAcademicRequirements,
                              academicRequirements
                            )
                          }
                          className="flex-1 border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter requirement"
                        />
                        <button
                          onClick={() =>
                            removeListItem(
                              index,
                              setAcademicRequirements,
                              academicRequirements
                            )
                          }
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addListItem(
                          setAcademicRequirements,
                          academicRequirements
                        )
                      }
                      className="flex items-center text-blue-500 hover:text-blue-600 transition-colors mt-2"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Requirement
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Study Levels
                  </h3>
                  <div className="space-y-2">
                    {studyLevels.map((level, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={level}
                          onChange={(e) =>
                            handleListChange(
                              index,
                              e.target.value,
                              setStudyLevels,
                              studyLevels
                            )
                          }
                          className="flex-1 border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter study level"
                        />
                        <button
                          onClick={() =>
                            removeListItem(index, setStudyLevels, studyLevels)
                          }
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addListItem(setStudyLevels, studyLevels)}
                      className="flex items-center text-blue-500 hover:text-blue-600 transition-colors mt-2"
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
                    {coverage.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleListChange(
                              index,
                              e.target.value,
                              setCoverage,
                              coverage
                            )
                          }
                          className="flex-1 border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter coverage detail"
                        />
                        <button
                          onClick={() =>
                            removeListItem(index, setCoverage, coverage)
                          }
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addListItem(setCoverage, coverage)}
                      className="flex items-center text-blue-500 hover:text-blue-600 transition-colors mt-2"
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
                    {additionalPerks.map((perk, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <input
                          type="text"
                          value={perk}
                          onChange={(e) =>
                            handleListChange(
                              index,
                              e.target.value,
                              setAdditionalPerks,
                              additionalPerks
                            )
                          }
                          className="flex-1 border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter additional perk"
                        />
                        <button
                          onClick={() =>
                            removeListItem(
                              index,
                              setAdditionalPerks,
                              additionalPerks
                            )
                          }
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addListItem(setAdditionalPerks, additionalPerks)
                      }
                      className="flex items-center text-blue-500 hover:text-blue-600 transition-colors mt-2"
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
                  <select className="border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type</span>
                  <input
                    type="text"
                    className="border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Scholarship type"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Age Limit</span>
                  <input
                    type="number"
                    className="border rounded-md p-1 w-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Age"
                  />
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Steps
              </h3>
              <div className="space-y-2">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-medium">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) =>
                        handleListChange(
                          index,
                          e.target.value,
                          setApplicationSteps,
                          applicationSteps
                        )
                      }
                      className="flex-1 border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter application step"
                    />
                    <button
                      onClick={() =>
                        removeListItem(
                          index,
                          setApplicationSteps,
                          applicationSteps
                        )
                      }
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    addListItem(setApplicationSteps, applicationSteps)
                  }
                  className="flex items-center text-blue-500 hover:text-blue-600 transition-colors mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Step
                </button>
              </div>
            </div>

            {/* Institution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About the Institution
              </h3>
              <textarea
                placeholder="Enter institution history..."
                className="w-full h-32 p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Award className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-2" />
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) =>
                        handleListChange(
                          index,
                          e.target.value,
                          setAchievements,
                          achievements
                        )
                      }
                      className="flex-1 border rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter achievement"
                    />
                    <button
                      onClick={() =>
                        removeListItem(index, setAchievements, achievements)
                      }
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addListItem(setAchievements, achievements)}
                  className="flex items-center text-blue-500 hover:text-blue-600 transition-colors mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Achievement
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => {
              // Handle save logic here
              console.log("Saving scholarship...");
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Save Scholarship</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewScholarship;
