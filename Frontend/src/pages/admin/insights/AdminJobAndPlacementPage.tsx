"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Briefcase, Plus, Trash, Edit, Search, X } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  requirements: string[];
  responsibilities: string[];
  whyJoinUs: string;
}

export function AdminJobAndPlacementPage() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Innovators Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Exciting opportunity for a skilled software engineer...",
      salary: "$120,000 - $150,000",
      requirements: [
        "5+ years of experience with JavaScript",
        "Experience with React and Node.js",
        "Bachelor's degree in Computer Science or related field",
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams",
        "Optimize application performance",
      ],
      whyJoinUs:
        "Great benefits. Flexible work hours. Innovative projects. Career growth opportunities.",
    },
    {
      id: 2,
      title: "Data Scientist Intern",
      company: "Data Insights Co.",
      location: "New York, NY",
      type: "Internship",
      description: "Join our data science team for a summer internship...",
      salary: "$30/hour",
      requirements: [
        "Currently pursuing a degree in Data Science, Statistics, or related field",
        "Knowledge of Python and data analysis libraries",
        "Strong analytical skills",
      ],
      responsibilities: [
        "Assist in data collection and cleaning",
        "Perform exploratory data analysis",
        "Create data visualizations",
      ],
      whyJoinUs:
        "Mentorship from industry experts. Real-world projects. Networking opportunities.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Form state
  const [formData, setFormData] = useState<Omit<Job, "id">>({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    salary: "",
    requirements: [],
    responsibilities: [],
    whyJoinUs: "",
  });

  // Reset form when switching between add/edit modes
  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title,
        company: editingJob.company,
        location: editingJob.location,
        type: editingJob.type,
        description: editingJob.description,
        salary: editingJob.salary,
        requirements: [...editingJob.requirements],
        responsibilities: [...editingJob.responsibilities],
        whyJoinUs: editingJob.whyJoinUs,
      });
    } else if (!showAddForm) {
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        salary: "",
        requirements: [],
        responsibilities: [],
        whyJoinUs: "",
      });
    }
  }, [editingJob, showAddForm]);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: "requirements" | "responsibilities"
  ) => {
    const items = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  const handleAddJob = () => {
    const newId =
      jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1;
    const newJob = { id: newId, ...formData };

    setJobs([...jobs, newJob]);
    setShowAddForm(false);
    setSuccessMessage("Job listing added successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUpdateJob = () => {
    if (!editingJob) return;

    setJobs(
      jobs.map((job) =>
        job.id === editingJob.id ? { ...job, ...formData } : job
      )
    );

    setEditingJob(null);
    setSuccessMessage("Job listing updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
    setSuccessMessage("Job listing deleted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Jobs & Placements
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add New Job
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
              placeholder="Search jobs by title, company, or location..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingJob) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingJob ? "Edit Job Listing" : "Add New Job Listing"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Tech Innovators Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., $120,000 - $150,000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the job"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements (comma-separated)
                </label>
                <textarea
                  value={formData.requirements.join(", ")}
                  onChange={(e) => handleListInputChange(e, "requirements")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5+ years of experience with JavaScript, Experience with React and Node.js"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsibilities (comma-separated)
                </label>
                <textarea
                  value={formData.responsibilities.join(", ")}
                  onChange={(e) => handleListInputChange(e, "responsibilities")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Develop and maintain web applications, Collaborate with cross-functional teams"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why Join Us
                </label>
                <textarea
                  name="whyJoinUs"
                  value={formData.whyJoinUs}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Great benefits. Flexible work hours. Innovative projects."
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Separate points with periods for automatic formatting
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingJob(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingJob ? handleUpdateJob : handleAddJob}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingJob ? "Update Job" : "Add Job"}
              </button>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">
                No job listings found. Try a different search or add a new job.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                    </div>
                    <p className="text-gray-600 mt-1">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingJob(job)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700">{job.description}</p>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Requirements:</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Responsibilities:
                    </h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
