"use client";

import { useState, useEffect } from "react";
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
  DialogDescription,
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
import type { ScholarshipDetails } from "../../../types/scholarship";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/api/v1",
  withCredentials: true,
});

type ScholarshipStatus = "Open" | "Closing Soon" | "Closed";
type ScholarshipType =
  | "Merit-based"
  | "Need-based"
  | "Research"
  | "Sports"
  | "Cultural";

const AdminScholarship = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<ScholarshipDetails[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentScholarship, setCurrentScholarship] = useState<ScholarshipDetails | null>(null);
  const [scholarshipToDelete, setScholarshipToDelete] = useState<{id: string, organizationName: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const emptyScholarship: Omit<ScholarshipDetails, '_id'> = {
    name: "",
    organizationName: "",
    amount: "",
    deadline: "",
    type: "Merit-based",
    status: "Open",
    coverImage: "",
    eligibleCountries: [],
    requirements: {
      minimumGPA: 0,
      preferredGPA: 0,
      competitiveGPA: 0,
      majorWeights: {},
      countryDiversity: {
        priority: [],
        weight: 0,
      },
    },
    vision: {
      purpose: "",
      impact: "",
      goals: "",
    },
    institution: {
      name: "",
      history: "",
      achievements: [],
      accreditation: [],
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
    statistics: {
      averageGPAAwarded: 0,
      totalApplications: 0,
      acceptanceRate: 0,
      majorDistribution: {},
    },
    applicationProcess: [],
    id: ""
  };

  const [newScholarship, setNewScholarship] = useState<Omit<ScholarshipDetails, '_id'>>(emptyScholarship);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await api.get("/scholarships");
        setScholarships(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch scholarships. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching scholarships:", err);
      }
    };

    fetchScholarships();
  }, []);

  const handleAddScholarship = async () => {
    try {
      const response = await api.post("/scholarships", newScholarship);
      setScholarships([...scholarships, response.data]);
      setIsAddDialogOpen(false);
      setNewScholarship(emptyScholarship);
    } catch (err) {
      console.error("Error adding scholarship:", err);
      setError("Failed to add scholarship. Please try again.");
    }
  };

  const handleEditScholarship = async () => {
    if (!currentScholarship) return;

    try {
      const response = await api.put(
        `/scholarships/organization/${encodeURIComponent(currentScholarship.organizationName)}`,
        currentScholarship
      );
      setScholarships(scholarships.map(s => 
        s._id === currentScholarship._id ? response.data : s
      ));
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("Error updating scholarship:", err);
      setError("Failed to update scholarship. Please try again.");
    }
  };

  const handleDeleteScholarship = async () => {
    if (!scholarshipToDelete) return;

    try {
      await api.delete(
        `/scholarships/organization/${encodeURIComponent(scholarshipToDelete.organizationName)}`
      );
      setScholarships(scholarships.filter((s) => s._id !== scholarshipToDelete.id));
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting scholarship:", err);
      setError("Failed to delete scholarship. Please try again.");
    }
  };

  const confirmDelete = (id: string, organizationName: string) => {
    setScholarshipToDelete({ id, organizationName });
    setIsDeleteDialogOpen(true);
  };

  const openEditDialog = (scholarship: ScholarshipDetails) => {
    setCurrentScholarship(scholarship);
    setIsEditDialogOpen(true);
  };

  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center">
          <p>Loading scholarships...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Scholarships</h1>
            <p className="mt-2 text-gray-600">Add, edit, or remove scholarship opportunities</p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search scholarships..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Scholarship
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredScholarships.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No scholarships found</p>
            </div>
          ) : (
            filteredScholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {scholarship.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      by {scholarship.organizationName}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {scholarship.amount}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-gray-600">{scholarship.vision?.purpose}</p>

                {scholarship.eligibleCountries && scholarship.eligibleCountries.length > 0 && (
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
                )}

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Deadline:{" "}
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-2">
                    <Button
                      onClick={() => openEditDialog(scholarship)}
                      variant="outline"
                      className="inline-flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => navigate(`/admin/scholarships/${encodeURIComponent(scholarship.organizationName)}`)}
                      className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => confirmDelete(scholarship._id, scholarship.organizationName)}
                      variant="destructive"
                      className="inline-flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Scholarship Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New Scholarship</DialogTitle>
            <DialogDescription>
              Fill in the details for the new scholarship
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Scholarship Name*</Label>
                <Input
                  id="name"
                  value={newScholarship.name}
                  onChange={(e) => setNewScholarship({...newScholarship, name: e.target.value})}
                  placeholder="Enter scholarship name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="organization">Organization Name*</Label>
                <Input
                  id="organization"
                  value={newScholarship.organizationName}
                  onChange={(e) => setNewScholarship({...newScholarship, organizationName: e.target.value})}
                  placeholder="Enter organization name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount*</Label>
                  <Input
                    id="amount"
                    value={newScholarship.amount}
                    onChange={(e) => setNewScholarship({...newScholarship, amount: e.target.value})}
                    placeholder="e.g. $10,000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline*</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newScholarship.deadline}
                    onChange={(e) => setNewScholarship({...newScholarship, deadline: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Scholarship Type*</Label>
                  <Select
                    value={newScholarship.type}
                    onValueChange={(value) => setNewScholarship({...newScholarship, type: value as ScholarshipType})}
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
                  <Label htmlFor="status">Status*</Label>
                  <Select
                    value={newScholarship.status}
                    onValueChange={(value) => setNewScholarship({...newScholarship, status: value as ScholarshipStatus})}
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
                <Label htmlFor="purpose">Purpose*</Label>
                <Textarea
                  id="purpose"
                  value={newScholarship.vision?.purpose || ""}
                  onChange={(e) => setNewScholarship({
                    ...newScholarship,
                    vision: {
                      ...newScholarship.vision,
                      purpose: e.target.value
                    }
                  })}
                  placeholder="Enter scholarship purpose"
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddScholarship}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={
                !newScholarship.name ||
                !newScholarship.organizationName ||
                !newScholarship.amount ||
                !newScholarship.deadline ||
                !newScholarship.vision?.purpose
              }
            >
              Add Scholarship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Scholarship Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>Edit Scholarship</DialogTitle>
            <DialogDescription>
              Update the details for this scholarship
            </DialogDescription>
          </DialogHeader>
          {currentScholarship && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="edit-name">Scholarship Name*</Label>
                <Input
                  id="edit-name"
                  value={currentScholarship.name}
                  onChange={(e) => setCurrentScholarship({...currentScholarship, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-organization">Organization Name*</Label>
                <Input
                  id="edit-organization"
                  value={currentScholarship.organizationName}
                  onChange={(e) => setCurrentScholarship({...currentScholarship, organizationName: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-amount">Amount*</Label>
                  <Input
                    id="edit-amount"
                    value={currentScholarship.amount}
                    onChange={(e) => setCurrentScholarship({...currentScholarship, amount: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-deadline">Deadline*</Label>
                  <Input
                    id="edit-deadline"
                    type="date"
                    value={currentScholarship.deadline}
                    onChange={(e) => setCurrentScholarship({...currentScholarship, deadline: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type">Scholarship Type*</Label>
                  <Select
                    value={currentScholarship.type}
                    onValueChange={(value) => setCurrentScholarship({...currentScholarship, type: value as ScholarshipType})}
                  >
                    <SelectTrigger id="edit-type">
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
                  <Label htmlFor="edit-status">Status*</Label>
                  <Select
                    value={currentScholarship.status}
                    onValueChange={(value) => setCurrentScholarship({...currentScholarship, status: value as ScholarshipStatus})}
                  >
                    <SelectTrigger id="edit-status">
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
                <Label htmlFor="edit-purpose">Purpose*</Label>
                <Textarea
                  id="edit-purpose"
                  value={currentScholarship.vision?.purpose || ""}
                  onChange={(e) => setCurrentScholarship({
                    ...currentScholarship,
                    vision: {
                      ...currentScholarship.vision,
                      purpose: e.target.value
                    }
                  })}
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditScholarship}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={
                !currentScholarship?.name ||
                !currentScholarship?.organizationName ||
                !currentScholarship?.amount ||
                !currentScholarship?.deadline ||
                !currentScholarship?.vision?.purpose
              }
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the scholarship.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this scholarship?</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteScholarship}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminScholarship;