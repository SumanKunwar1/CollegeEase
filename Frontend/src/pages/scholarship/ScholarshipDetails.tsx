import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Calendar,
  Globe,
  Award,
  CheckCircle,
  DollarSign,
  Star,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { scholarshipsData } from "../../data/scholarshipdata";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const scholarship = scholarshipsData.find((s) => s.id === id);

  if (!scholarship) {
    return <div>Scholarship not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt="Scholarship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{scholarship.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-1" />
                {scholarship.provider}
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

export default ScholarshipDetails;
