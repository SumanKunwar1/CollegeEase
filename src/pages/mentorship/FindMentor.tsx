import { useState } from "react";
import { Search, Star, MapPin, Clock, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mentorData } from "../../data/findmentor"; // Importing data

const mentors = [
  {
    id: mentorData.id,
    name: mentorData.name,
    title: mentorData.title,
    university: mentorData.university,
    expertise: mentorData.expertise.map((e) => e.skill),
    rating: 5.0, // You can add real ratings later
    reviews: 150, // Example placeholder
    location: mentorData.location,
    imageUrl: mentorData.imageUrl,
    availability: mentorData.availability,
    price: `$${mentorData.pricePerHour}/hour`,
  },
];

const FindMentor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const navigate = useNavigate();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
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
                      {mentor.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({mentor.reviews} reviews)
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
                    {mentor.price}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() =>
                      navigate(
                        `/mentorship/find-mentor/${mentor.id}/book-a-session`
                      )
                    }
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Book Session
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/mentorship/find-mentor/${mentor.id}`)
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
      </div>
    </div>
  );
};

export default FindMentor;
