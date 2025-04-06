import { useState, useEffect } from "react";
import { Search, Star, MapPin, Clock, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mentor } from "../../types/mentor";

const FindMentor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  const filters = [
    "Computer Science",
    "Medical School",
    "Business",
    "Engineering",
    "Law School",
    "Career Guidance",
    "Research",
    "Interview Prep",
  ];

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await apiClient.get("/mentors");
        setMentors(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(e => e.skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilters = selectedFilters.length === 0 || 
      mentor.expertise.some(e => selectedFilters.includes(e.skill));

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Mentor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced mentors who can guide you through your
            academic and career journey.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, expertise, or university..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedFilters.includes(filter)
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedFilters(
                        selectedFilters.includes(filter)
                          ? selectedFilters.filter((f) => f !== filter)
                          : [...selectedFilters, filter]
                      );
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading mentors...</p>
          </div>
        ) : filteredMentors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No mentors found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                      <p className="text-sm text-gray-600">{mentor.university}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">
                        {mentor.testimonials.length > 0 
                          ? (mentor.testimonials.reduce((acc, t) => acc + t.rating, 0)) / mentor.testimonials.length
                          : "No ratings"}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({mentor.testimonials.length} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {mentor.availability}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2" />
                      ${mentor.pricePerHour}/hour
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                        >
                          {skill.skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/mentorship/find-mentor/${mentor._id}/book-a-session`
                        )
                      }
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Book Session
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/mentorship/find-mentor/${mentor._id}`)
                      }
                      className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindMentor;