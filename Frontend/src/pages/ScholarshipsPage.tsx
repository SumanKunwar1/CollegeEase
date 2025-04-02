import { useState, useEffect } from "react";
import { Search, Filter, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/api/v1",
  withCredentials: true,
});

type Scholarship = {
  _id: string;
  name: string;
  organizationName: string;
  amount: string;
  deadline: string;
  type: string;
  status: string;
  vision?: {
    purpose: string;
  };
  eligibleCountries?: string[];
  requirements?: {
    minimumGPA: number;
  };
};

const ScholarshipsPage = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
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
                  <button
                    onClick={() => navigate(`/scholarships/${scholarship.organizationName}`)}
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsPage;