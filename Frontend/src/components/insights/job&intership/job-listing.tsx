import type React from "react";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobListingProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
  };
}

export const JobListing: React.FC<JobListingProps> = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <Briefcase className="h-4 w-4 mr-2" />
        <span>{job.company}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin className="h-4 w-4 mr-2" />
        <span>{job.location}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-4">
        <Clock className="h-4 w-4 mr-2" />
        <span>{job.type}</span>
      </div>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <button
        onClick={() => navigate(`/insights/job-and-internship/${job.id}`)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Apply Now
      </button>
    </div>
  );
};
