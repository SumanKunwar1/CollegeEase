import { useState } from "react";
import { Briefcase, Users, Building, Search, ArrowRight } from "lucide-react";
import { JobListing } from "../../components/insights/job&intership/job-listing";
import { AuthModal } from "../../components/insights/job&intership/auth-modal";
import { SmartMatchingSection } from "../../components/insights/job&intership/smart-matching-section";
import { InstituteDashboard } from "../../components/insights/job&intership/institute-dashboard";
import { RecruiterDashboard } from "../../components/insights/job&intership/recruiter-dashboard";
import { StudentDashboard } from "../../components/insights/job&intership/student-dashboard";

const JobsAndPlacementPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userType, setUserType] = useState<
    "student" | "recruiter" | "institute" | null
  >(null);

  const jobListings = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Innovators Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Exciting opportunity for a skilled software engineer...",
    },
    {
      id: 2,
      title: "Data Scientist Intern",
      company: "Data Insights Co.",
      location: "New York, NY",
      type: "Internship",
      description: "Join our data science team for a summer internship...",
    },
    // Add more job listings as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Jobs & Placement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with opportunities, showcase your skills, and take the next
            step in your career journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Briefcase, label: "Active Job Listings", value: "1000+" },
            { icon: Users, label: "Registered Students", value: "10,000+" },
            { icon: Building, label: "Partner Companies", value: "500+" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Search Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Find Your Next Opportunity
            </h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                <Search className="inline-block mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Latest Job Listings
            </h2>
            <div className="space-y-6">
              {jobListings.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                View all job listings <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Smart Matching Section */}
        <SmartMatchingSection />

        {/* User-specific Dashboards */}
        {userType === "student" && <StudentDashboard />}
        {userType === "recruiter" && <RecruiterDashboard />}
        {userType === "institute" && <InstituteDashboard />}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join CollegeEase to access personalized job recommendations,
              connect with top companies, and accelerate your career growth.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Sign Up Now
            </button>
          </div>
        </div>

        {/* Auth Modal */}
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onUserTypeSelect={setUserType}
          />
        )}
      </div>
    </div>
  );
};

export default JobsAndPlacementPage;
