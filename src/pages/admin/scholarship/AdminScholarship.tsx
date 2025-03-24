"use client";

import type React from "react";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { useToast } from "../../../components/ui/use-toast";

interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  description: string;
  status: "active" | "draft" | "expired";
}

const AdminScholarshipsPage: React.FC = () => {
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([
    {
      id: "1",
      title: "Merit Excellence Scholarship",
      provider: "Global Education Foundation",
      amount: "$10,000",
      deadline: "2025-06-30",
      eligibility: ["GPA 3.5+", "STEM Major", "Undergraduate"],
      description:
        "Scholarship for outstanding students pursuing STEM degrees.",
      status: "active",
    },
    {
      id: "2",
      title: "Future Leaders Grant",
      provider: "Leadership Institute",
      amount: "$5,000",
      deadline: "2025-07-15",
      eligibility: ["Leadership Experience", "Community Service", "Any Major"],
      description:
        "Supporting students who demonstrate exceptional leadership potential.",
      status: "active",
    },
    {
      id: "3",
      title: "Diversity in Tech Scholarship",
      provider: "Tech Innovation Fund",
      amount: "$15,000",
      deadline: "2025-08-01",
      eligibility: [
        "Computer Science",
        "Underrepresented Groups",
        "Bachelor/Master",
      ],
      description:
        "Promoting diversity in technology fields through education.",
      status: "draft",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentScholarship, setCurrentScholarship] =
    useState<Scholarship | null>(null);
  const [formData, setFormData] = useState<Omit<Scholarship, "id">>({
    title: "",
    provider: "",
    amount: "",
    deadline: "",
    eligibility: [],
    description: "",
    status: "draft",
  });
  const [eligibilityInput, setEligibilityInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter scholarships based on search query and status
  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || scholarship.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEligibility = () => {
    if (eligibilityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        eligibility: [...prev.eligibility, eligibilityInput.trim()],
      }));
      setEligibilityInput("");
    }
  };

  const handleRemoveEligibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      eligibility: prev.eligibility.filter((_, i) => i !== index),
    }));
  };

  const handleAddScholarship = () => {
    const newScholarship: Scholarship = {
      ...formData,
      id: Date.now().toString(),
    };

    setScholarships((prev) => [...prev, newScholarship]);
    setIsAddDialogOpen(false);
    resetForm();

    toast({
      title: "Scholarship Added",
      description: `${newScholarship.title} has been successfully added.`,
    });
  };

  const handleEditScholarship = () => {
    if (!currentScholarship) return;

    setScholarships((prev) =>
      prev.map((scholarship) =>
        scholarship.id === currentScholarship.id
          ? { ...formData, id: currentScholarship.id }
          : scholarship
      )
    );

    setIsEditDialogOpen(false);
    resetForm();

    toast({
      title: "Scholarship Updated",
      description: `${formData.title} has been successfully updated.`,
    });
  };

  const handleDeleteScholarship = () => {
    if (!currentScholarship) return;

    setScholarships((prev) =>
      prev.filter((scholarship) => scholarship.id !== currentScholarship.id)
    );

    setIsDeleteDialogOpen(false);

    toast({
      title: "Scholarship Deleted",
      description: `${currentScholarship.title} has been successfully deleted.`,
    });
  };

  const openEditDialog = (scholarship: Scholarship) => {
    setCurrentScholarship(scholarship);
    setFormData({
      title: scholarship.title,
      provider: scholarship.provider,
      amount: scholarship.amount,
      deadline: scholarship.deadline,
      eligibility: [...scholarship.eligibility],
      description: scholarship.description,
      status: scholarship.status,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (scholarship: Scholarship) => {
    setCurrentScholarship(scholarship);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      provider: "",
      amount: "",
      deadline: "",
      eligibility: [],
      description: "",
      status: "draft",
    });
    setEligibilityInput("");
    setCurrentScholarship(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Scholarships</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Scholarship
        </Button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search scholarships..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Button
            variant="outline"
            className="w-full md:w-auto flex items-center justify-between"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter by Status
            {isFilterOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>

          {isFilterOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
              <div className="py-1">
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    statusFilter === "all" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setStatusFilter("all");
                    setIsFilterOpen(false);
                  }}
                >
                  All
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    statusFilter === "active" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setStatusFilter("active");
                    setIsFilterOpen(false);
                  }}
                >
                  Active
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    statusFilter === "draft" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setStatusFilter("draft");
                    setIsFilterOpen(false);
                  }}
                >
                  Draft
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    statusFilter === "expired" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setStatusFilter("expired");
                    setIsFilterOpen(false);
                  }}
                >
                  Expired
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {scholarship.title}
                      </h2>
                      <span
                        className={`ml-3 px-2 py-1 text-xs rounded-full ${
                          scholarship.status === "active"
                            ? "bg-green-100 text-green-800"
                            : scholarship.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {scholarship.status.charAt(0).toUpperCase() +
                          scholarship.status.slice(1)}
                      </span>
                    </div>
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

                <p className="mt-4 text-gray-600">{scholarship.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {scholarship.eligibility.map((criteria, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {criteria}
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
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(scholarship)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(scholarship)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No scholarships found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Add Scholarship Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Scholarship</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scholarship Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter scholarship title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <Input
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                placeholder="Enter provider name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <Input
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="e.g. $10,000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <Input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Enter scholarship description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligibility Criteria
              </label>
              <div className="flex space-x-2">
                <Input
                  value={eligibilityInput}
                  onChange={(e) => setEligibilityInput(e.target.value)}
                  placeholder="Add eligibility criteria"
                />
                <Button type="button" onClick={handleAddEligibility}>
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.eligibility.map((criteria, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                  >
                    <span className="text-sm">{criteria}</span>
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveEligibility(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddScholarship}>Add Scholarship</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Scholarship Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Scholarship</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scholarship Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter scholarship title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <Input
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                placeholder="Enter provider name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <Input
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="e.g. $10,000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <Input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Enter scholarship description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligibility Criteria
              </label>
              <div className="flex space-x-2">
                <Input
                  value={eligibilityInput}
                  onChange={(e) => setEligibilityInput(e.target.value)}
                  placeholder="Add eligibility criteria"
                />
                <Button type="button" onClick={handleAddEligibility}>
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.eligibility.map((criteria, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                  >
                    <span className="text-sm">{criteria}</span>
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveEligibility(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditScholarship}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Scholarship</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete "{currentScholarship?.title}"?
              This action cannot be undone.
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

export default AdminScholarshipsPage;
