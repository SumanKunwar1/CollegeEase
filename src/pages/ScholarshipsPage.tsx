import { Search, Filter, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Scholarship } from "../types";

const scholarships: Scholarship[] = [
  {
    id: "1",
    title: "Merit Excellence Scholarship",
    provider: "Global Education Foundation",
    amount: "$10,000",
    deadline: "2025-06-30",
    eligibility: ["GPA 3.5+", "STEM Major", "Undergraduate"],
    description: "Scholarship for outstanding students pursuing STEM degrees.",
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
    description: "Promoting diversity in technology fields through education.",
  },
];

const ScholarshipsPage = () => {
  const navigate = useNavigate(); // Add navigation hook

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Scholarship Opportunities
            </h1>
            <p className="mt-2 text-gray-600">
              Find scholarships that match your profile and aspirations
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
                    {scholarship.title}
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

              <p className="mt-4 text-gray-600">{scholarship.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {scholarship.eligibility.map((criteria) => (
                  <span
                    key={criteria}
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
                <button
                  onClick={() => navigate(`/scholarships/${scholarship.id}`)} // Add onClick for navigation
                  className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsPage;
