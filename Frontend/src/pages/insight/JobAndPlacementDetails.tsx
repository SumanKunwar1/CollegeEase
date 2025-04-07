// src/components/insights/job&intership/JobAndPlacementDetails.tsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEnhancedToast } from "../../components/ui/enhanced-toast";
import ApplicationForm from "./ApplicationForm";
import { IJob } from "../../types/job";

const JobAndPlacementDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<IJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { toast } = useEnhancedToast();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`
        );
        setJob(response.data.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch job details",
          variant: "destructive",
        });
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <p className="text-gray-500">Job not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Background */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {job.company}
          </h1>
          <p className="text-gray-600">{job.description}</p>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Job Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-600">
                <strong>Salary:</strong> {job.salary}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Working Type:</strong> {job.type}
              </p>
              <p className="text-gray-600">
                <strong>Job Type:</strong> Full-time
              </p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        {/* Responsibilities */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Responsibilities
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>

        {/* Why Join Us */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Why Join Us
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {job.whyJoinUs.split(". ").map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Apply Now Button */}
        <div className="text-center">
          <button
            onClick={() => setShowApplicationForm(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Apply Now
          </button>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <ApplicationForm 
            jobId={job._id} 
            onClose={() => setShowApplicationForm(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default JobAndPlacementDetails;