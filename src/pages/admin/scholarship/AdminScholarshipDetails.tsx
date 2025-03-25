/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Globe,
  Award,
  CheckCircle,
  DollarSign,
  Star,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { scholarshipsData } from "../../../data/scholarshipdata";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import type { ScholarshipDetails } from "../../../types/scholarship";

// Define the allowed types for status and scholarship type
type ScholarshipStatus = "Open" | "Closing Soon" | "Closed";
type ScholarshipType =
  | "Merit-based"
  | "Need-based"
  | "Research"
  | "Sports"
  | "Cultural";

type EditableListProps = {
  items: string[];
  onAdd: (item: string) => void;
  onEdit: (index: number, newValue: string) => void;
  onDelete: (index: number) => void;
  icon?: React.ReactNode;
  title: string;
};

const EditableList = ({
  items,
  onAdd,
  onEdit,
  onDelete,
  icon,
  title,
}: EditableListProps) => {
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem);
      setNewItem("");
      setIsAddingItem(false);
    }
  };

  const startEdit = (index: number, value: string) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const saveEdit = () => {
    if (editIndex !== null && editValue.trim()) {
      onEdit(editIndex, editValue);
      setEditIndex(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingItem(true)}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Item
        </Button>
      </div>

      {isAddingItem && (
        <div className="flex items-center gap-2 mb-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add new ${title.toLowerCase()} item`}
            className="flex-1"
          />
          <Button size="sm" onClick={handleAdd}>
            Add
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddingItem(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start space-x-3 group">
            {icon && icon}
            {editIndex === index ? (
              <div className="flex-1 flex items-center gap-2">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={saveEdit}>
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <span className="text-gray-600 flex-1">{item}</span>
                <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(index, item)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(index)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom component for numbered items
const NumberedIcon = ({ number }: { number: number }) => (
  <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-medium">
    {number}
  </div>
);

const AdminScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialScholarship = scholarshipsData.find((s) => s.id === id);

  if (!initialScholarship) {
    return <div>Scholarship not found</div>;
  }

  const [scholarship, setScholarship] = useState<ScholarshipDetails>({
    ...initialScholarship,
  });
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(scholarship.coverImage || "");
  const [hasChanges, setHasChanges] = useState(false);

  const updateScholarship = (updates: Partial<ScholarshipDetails>) => {
    setScholarship((prev) => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleSaveImage = () => {
    updateScholarship({ coverImage: imageUrl });
    setIsImageDialogOpen(false);
  };

  const handleSaveChanges = () => {
    // In a real application, this would save to a database
    alert("Changes saved successfully!");
    setHasChanges(false);
  };

  // Helper functions for updating nested properties
  const updateEligibilityAcademic = (items: string[]) => {
    updateScholarship({
      eligibility: {
        ...scholarship.eligibility,
        academicRequirements: items,
      },
    });
  };

  const updateBenefitsCoverage = (items: string[]) => {
    updateScholarship({
      benefits: {
        ...scholarship.benefits,
        coverage: items,
      },
    });
  };

  const updateBenefitsPerks = (items: string[]) => {
    updateScholarship({
      benefits: {
        ...scholarship.benefits,
        additionalPerks: items,
      },
    });
  };

  const updateApplicationProcess = (items: string[]) => {
    updateScholarship({
      applicationProcess: items,
    });
  };

  const updateInstitutionAchievements = (items: string[]) => {
    updateScholarship({
      institution: {
        ...scholarship.institution,
        achievements: items,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <img
          src={
            scholarship.coverImage ||
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          }
          alt="Scholarship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="p-8 text-white w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold">{scholarship.name}</h1>
              <Button
                onClick={() => setIsImageDialogOpen(true)}
                variant="outline"
                className="text-white border-white hover:bg-white/20"
              >
                Change Cover Image
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-1" />
                <Input
                  value={scholarship.provider}
                  onChange={(e) =>
                    updateScholarship({ provider: e.target.value })
                  }
                  className="bg-transparent border-white text-white w-auto"
                />
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-400 mr-1" />
                <Input
                  value={scholarship.amount}
                  onChange={(e) =>
                    updateScholarship({ amount: e.target.value })
                  }
                  className="bg-transparent border-white text-white w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => navigate("/admin/scholarships/scholarships-finder")}
            variant="outline"
          >
            Back to Scholarships
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className="bg-green-600 hover:bg-green-700 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
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
              <div className="mb-4">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea
                  id="purpose"
                  value={scholarship.vision.purpose}
                  onChange={(e) =>
                    updateScholarship({
                      vision: {
                        ...scholarship.vision,
                        purpose: e.target.value,
                      },
                    })
                  }
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <Input
                      id="deadline"
                      type="date"
                      value={scholarship.deadline.split("T")[0]}
                      onChange={(e) =>
                        updateScholarship({ deadline: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="countries">Eligible Countries</Label>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <Input
                      id="countries"
                      value={scholarship.eligibleCountries.join(", ")}
                      onChange={(e) =>
                        updateScholarship({
                          eligibleCountries: e.target.value
                            .split(",")
                            .map((c) => c.trim()),
                        })
                      }
                      placeholder="Countries separated by commas"
                    />
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
                <EditableList
                  title="Academic Requirements"
                  items={scholarship.eligibility.academicRequirements}
                  onAdd={(item) => {
                    const newItems = [
                      ...scholarship.eligibility.academicRequirements,
                      item,
                    ];
                    updateEligibilityAcademic(newItems);
                  }}
                  onEdit={(index, newValue) => {
                    const newItems = [
                      ...scholarship.eligibility.academicRequirements,
                    ];
                    newItems[index] = newValue;
                    updateEligibilityAcademic(newItems);
                  }}
                  onDelete={(index) => {
                    const newItems = [
                      ...scholarship.eligibility.academicRequirements,
                    ];
                    newItems.splice(index, 1);
                    updateEligibilityAcademic(newItems);
                  }}
                  icon={
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  }
                />

                <div>
                  <Label htmlFor="studyLevels">Study Levels</Label>
                  <Input
                    id="studyLevels"
                    value={scholarship.eligibility.studyLevel.join(", ")}
                    onChange={(e) =>
                      updateScholarship({
                        eligibility: {
                          ...scholarship.eligibility,
                          studyLevel: e.target.value
                            .split(",")
                            .map((level) => level.trim()),
                        },
                      })
                    }
                    placeholder="Study levels separated by commas"
                    className="mt-2"
                  />
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Scholarship Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <EditableList
                  title="Financial Coverage"
                  items={scholarship.benefits.coverage}
                  onAdd={(item) => {
                    const newItems = [...scholarship.benefits.coverage, item];
                    updateBenefitsCoverage(newItems);
                  }}
                  onEdit={(index, newValue) => {
                    const newItems = [...scholarship.benefits.coverage];
                    newItems[index] = newValue;
                    updateBenefitsCoverage(newItems);
                  }}
                  onDelete={(index) => {
                    const newItems = [...scholarship.benefits.coverage];
                    newItems.splice(index, 1);
                    updateBenefitsCoverage(newItems);
                  }}
                  icon={
                    <DollarSign className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  }
                />

                <EditableList
                  title="Additional Perks"
                  items={scholarship.benefits.additionalPerks}
                  onAdd={(item) => {
                    const newItems = [
                      ...scholarship.benefits.additionalPerks,
                      item,
                    ];
                    updateBenefitsPerks(newItems);
                  }}
                  onEdit={(index, newValue) => {
                    const newItems = [...scholarship.benefits.additionalPerks];
                    newItems[index] = newValue;
                    updateBenefitsPerks(newItems);
                  }}
                  onDelete={(index) => {
                    const newItems = [...scholarship.benefits.additionalPerks];
                    newItems.splice(index, 1);
                    updateBenefitsPerks(newItems);
                  }}
                  icon={
                    <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  }
                />
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
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={scholarship.status}
                    onValueChange={(value) =>
                      updateScholarship({ status: value as ScholarshipStatus })
                    }
                  >
                    <SelectTrigger id="status" className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Closing Soon">Closing Soon</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={scholarship.type}
                    onValueChange={(value) =>
                      updateScholarship({ type: value as ScholarshipType })
                    }
                  >
                    <SelectTrigger id="type" className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Merit-based">Merit-based</SelectItem>
                      <SelectItem value="Need-based">Need-based</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ageLimit">Age Limit</Label>
                  <Input
                    id="ageLimit"
                    value={scholarship.eligibility.ageLimit}
                    onChange={(e) =>
                      updateScholarship({
                        eligibility: {
                          ...scholarship.eligibility,
                          ageLimit: e.target.value,
                        },
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Application Steps
              </h3>
              <EditableList
                title="Application Process"
                items={scholarship.applicationProcess}
                onAdd={(item) => {
                  const newItems = [...scholarship.applicationProcess, item];
                  updateApplicationProcess(newItems);
                }}
                onEdit={(index, newValue) => {
                  const newItems = [...scholarship.applicationProcess];
                  newItems[index] = newValue;
                  updateApplicationProcess(newItems);
                }}
                onDelete={(index) => {
                  const newItems = [...scholarship.applicationProcess];
                  newItems.splice(index, 1);
                  updateApplicationProcess(newItems);
                }}
                icon={<NumberedIcon number={1} />}
              />
            </div>

            {/* Institution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About the Institution
              </h3>
              <div className="mb-4">
                <Label htmlFor="institutionHistory">Institution History</Label>
                <Textarea
                  id="institutionHistory"
                  value={scholarship.institution.history}
                  onChange={(e) =>
                    updateScholarship({
                      institution: {
                        ...scholarship.institution,
                        history: e.target.value,
                      },
                    })
                  }
                  className="min-h-[100px] mt-2"
                />
              </div>
              <EditableList
                title="Institution Achievements"
                items={scholarship.institution.achievements}
                onAdd={(item) => {
                  const newItems = [
                    ...scholarship.institution.achievements,
                    item,
                  ];
                  updateInstitutionAchievements(newItems);
                }}
                onEdit={(index, newValue) => {
                  const newItems = [...scholarship.institution.achievements];
                  newItems[index] = newValue;
                  updateInstitutionAchievements(newItems);
                }}
                onDelete={(index) => {
                  const newItems = [...scholarship.institution.achievements];
                  newItems.splice(index, 1);
                  updateInstitutionAchievements(newItems);
                }}
                icon={
                  <Award className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Update Cover Image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            {imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-[200px] object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsImageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveImage}>Save Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminScholarshipDetails;
