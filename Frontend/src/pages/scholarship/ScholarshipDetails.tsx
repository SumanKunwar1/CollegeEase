import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Globe,
  Award,
  CheckCircle,
  DollarSign,
  Star,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/api/v1",
  withCredentials: true,
});

type ScholarshipDetails = {
  _id: string;
  name: string;
  organizationName: string;
  amount: string;
  deadline: string;
  type: string;
  status: string;
  coverImage?: string;
  eligibleCountries: string[];
  vision: {
    purpose: string;
  };
  eligibility: {
    academicRequirements: string[];
    studyLevel: string[];
    ageLimit: string;
  };
  benefits: {
    coverage: string[];
    additionalPerks: string[];
  };
  applicationProcess: string[];
  institution: {
    history: string;
    achievements: string[];
  };
};

const ScholarshipDetails = () => {
  const { organizationName } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState<ScholarshipDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        if (!organizationName) {
          throw new Error("Organization name is required");
        }
        
        const response = await api.get(
          `/scholarships/organization/${encodeURIComponent(organizationName)}`
        );
        setScholarship(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch scholarship details. Please try again.");
        setIsLoading(false);
        console.error("Error fetching scholarship:", err);
      }
    };

    fetchScholarship();
  }, [organizationName]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center">
          <p>Loading scholarship details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center">
          <p>Scholarship not found</p>
          <Button 
            onClick={() => navigate("/scholarships")} 
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Back to Scholarships
          </Button>
        </div>
      </div>
    );
  }

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
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{scholarship.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-1" />
                {scholarship.organizationName}
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-400 mr-1" />
                {scholarship.amount}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={() => navigate("/scholarships")}
          variant="outline"
          className="mb-8"
        >
          Back to Scholarships
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Scholarship Overview
              </h2>
              <p className="text-gray-600 mb-4">{scholarship.vision.purpose}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>
                    Deadline:{" "}
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <span>
                      Eligible Countries:{" "}
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
                          <span className="text-gray-600">{req}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Study Levels
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.eligibility.studyLevel.map((level) => (
                      <span
                        key={level}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {level}
                      </span>
                    ))}
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
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
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
                        <span className="text-gray-600">{perk}</span>
                      </div>
                    ))}
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {scholarship.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{scholarship.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Age Limit</span>
                  <span className="font-medium">
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
                    <span className="text-gray-600">{step}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() =>
                  navigate(`/scholarships/${scholarship._id}/apply`)
                }
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
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

export default ScholarshipDetails;