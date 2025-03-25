"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { scholarshipsData } from "../../../data/scholarshipdata";
import type { ScholarshipDetails } from "../../../types/scholarship";

// Define the allowed types for status and scholarship type
type ScholarshipStatus = "Open" | "Closing Soon" | "Closed";
type ScholarshipType =
  | "Merit-based"
  | "Need-based"
  | "Research"
  | "Sports"
  | "Cultural";

const AdminScholarship = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] =
    useState<ScholarshipDetails[]>(scholarshipsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [scholarshipToDelete, setScholarshipToDelete] = useState<string | null>(
    null
  );
  const [newScholarship, setNewScholarship] = useState<
    Partial<ScholarshipDetails>
  >({
    name: "",
    provider: "",
    amount: "",
    deadline: "",
    type: "Merit-based",
    status: "Open",
    eligibleCountries: [],
    vision: {
      purpose: "",
      impact: "", // Add empty strings for required fields
      goals: "", // Add empty strings for required fields
    },
  });

  const handleAddScholarship = () => {
    const id = (
      Math.max(...scholarships.map((s) => parseInt(s.id))) + 1
    ).toString();
    const scholarship: ScholarshipDetails = {
      id,
      coverImage: "",
      name: newScholarship.name || "",
      provider: newScholarship.provider || "",
      type: (newScholarship.type as ScholarshipType) || "Merit-based",
      deadline:
        newScholarship.deadline || new Date().toISOString().split("T")[0],
      amount: newScholarship.amount || "$0",
      eligibleCountries: newScholarship.eligibleCountries || [],
      requirements: {
        minimumGPA: 3.0,
        preferredGPA: 3.5,
        competitiveGPA: 3.8,
        majorWeights: {},
        countryDiversity: { priority: [], weight: 1 },
      },
      vision: {
        purpose: newScholarship.vision?.purpose || "",
        impact: newScholarship.vision?.impact || "", // Ensure impact is provided
        goals: newScholarship.vision?.goals || "", // Ensure goals is provided
      },
      institution: {
        name: "",
        history: "",
        achievements: [],
        accreditation: [],
      },
      statistics: {
        averageGPAAwarded: 0,
        totalApplications: 0,
        acceptanceRate: 0,
        majorDistribution: {},
      },
      eligibility: {
        academicRequirements: [],
        financialNeed: "",
        nationality: [],
        ageLimit: "",
        studyLevel: [],
        languageRequirements: [],
        specialRequirements: [],
      },
      benefits: {
        coverage: [],
        additionalPerks: [],
      },
      applicationProcess: [],
      status: (newScholarship.status as ScholarshipStatus) || "Open",
    };

    setScholarships([...scholarships, scholarship]);
    setIsAddDialogOpen(false);
    setNewScholarship({
      name: "",
      provider: "",
      amount: "",
      deadline: "",
      type: "Merit-based",
      status: "Open",
      eligibleCountries: [],
      vision: {
        purpose: "",
        impact: "",
        goals: "",
      },
    });
  };

  const handleDeleteScholarship = () => {
    if (scholarshipToDelete) {
      setScholarships(scholarships.filter((s) => s.id !== scholarshipToDelete));
      setScholarshipToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const confirmDelete = (id: string) => {
    setScholarshipToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Scholarships
            </h1>
            <p className="mt-2 text-gray-600">
              Add, edit, or remove scholarship opportunities
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search scholarships..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Scholarship
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {scholarship.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    by {scholarship.provider}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {scholarship.amount}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{scholarship.vision.purpose}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {scholarship.eligibleCountries.map((country) => (
                  <span
                    key={country}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {country}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Deadline:{" "}
                  {new Date(scholarship.deadline).toLocaleDateString()}
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                  <Button
                    onClick={() =>
                      navigate(`/admin/scholarships/${scholarship.id}/edit`)
                    }
                    variant="outline"
                    className="inline-flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(`/admin/scholarships/${scholarship.id}`)
                    }
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => confirmDelete(scholarship.id)}
                    variant="destructive"
                    className="inline-flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Scholarship Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Add New Scholarship</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Scholarship Name</Label>
                <Input
                  id="name"
                  value={newScholarship.name || ""}
                  onChange={(e) =>
                    setNewScholarship({
                      ...newScholarship,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter scholarship name"
                />
              </div>
              <div>
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  value={newScholarship.provider || ""}
                  onChange={(e) =>
                    setNewScholarship({
                      ...newScholarship,
                      provider: e.target.value,
                    })
                  }
                  placeholder="Enter provider name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={newScholarship.amount || ""}
                    onChange={(e) =>
                      setNewScholarship({
                        ...newScholarship,
                        amount: e.target.value,
                      })
                    }
                    placeholder="e.g. $10,000"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newScholarship.deadline || ""}
                    onChange={(e) =>
                      setNewScholarship({
                        ...newScholarship,
                        deadline: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Scholarship Type</Label>
                  <Select
                    value={newScholarship.type || "Merit-based"}
                    onValueChange={(value) =>
                      setNewScholarship({
                        ...newScholarship,
                        type: value as ScholarshipType,
                      })
                    }
                  >
                    <SelectTrigger id="type">
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
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newScholarship.status || "Open"}
                    onValueChange={(value) =>
                      setNewScholarship({
                        ...newScholarship,
                        status: value as ScholarshipStatus,
                      })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Closing Soon">Closing Soon</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newScholarship.vision?.purpose || ""}
                  onChange={(e) =>
                    setNewScholarship({
                      ...newScholarship,
                      vision: {
                        purpose: e.target.value,
                        impact: newScholarship.vision?.impact || "",
                        goals: newScholarship.vision?.goals || "",
                      },
                    })
                  }
                  placeholder="Enter scholarship description"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border border-gray-300 text-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddScholarship}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Scholarship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete this scholarship? This action
              cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteScholarship}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminScholarship;
