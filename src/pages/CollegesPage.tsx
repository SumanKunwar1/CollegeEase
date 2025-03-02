import { Search, Filter, MapPin, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import type { College } from "../types";

const CollegesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    course: "",
    tuitionRange: "",
  });

  const colleges: College[] = [
    {
      id: "1",
      name: "Stanford University",
      location: "Stanford, CA",
      courses: ["Computer Science", "Engineering", "Business"],
      rating: 4.8,
      imageUrl:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      tuitionRange: "$50,000 - $60,000",
    },
    {
      id: "2",
      name: "MIT",
      location: "Cambridge, MA",
      courses: ["Engineering", "Physics", "Mathematics"],
      rating: 4.9,
      imageUrl:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      tuitionRange: "$55,000 - $65,000",
    },
    {
      id: "3",
      name: "Harvard University",
      location: "Cambridge, MA",
      courses: ["Law", "Medicine", "Business"],
      rating: 4.9,
      imageUrl: "/Assets/images/Harvard University.jpg",
      tuitionRange: "$54,000 - $64,000",
    },
  ];

  // Extract unique values for filters
  const locations = [...new Set(colleges.map((college) => college.location))];
  const allCourses = [
    ...new Set(colleges.flatMap((college) => college.courses)),
  ];
  const tuitionRanges = [
    ...new Set(colleges.map((college) => college.tuitionRange)),
  ];

  // Filter colleges based on search query and filters
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesSearch = college.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesLocation =
        !filters.location || college.location === filters.location;
      const matchesCourse =
        !filters.course || college.courses.includes(filters.course);
      const matchesTuition =
        !filters.tuitionRange || college.tuitionRange === filters.tuitionRange;

      return (
        matchesSearch && matchesLocation && matchesCourse && matchesTuition
      );
    });
  }, [colleges, searchQuery, filters]);

  const resetFilters = () => {
    setFilters({
      location: "",
      course: "",
      tuitionRange: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Find Your Perfect College
            </h1>
            <p className="mt-2 text-gray-600">
              Explore and compare colleges to make an informed decision
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 ${
                showFilters ? "bg-blue-50 border-blue-300" : "bg-white"
              }`}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter Colleges</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>
                <select
                  value={filters.course}
                  onChange={(e) =>
                    setFilters({ ...filters, course: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Courses</option>
                  {allCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tuition Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuition Range
                </label>
                <select
                  value={filters.tuitionRange}
                  onChange={(e) =>
                    setFilters({ ...filters, tuitionRange: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Ranges</option>
                  {tuitionRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(filters.location || filters.course || filters.tuitionRange) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.location && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {filters.location}
                <button
                  onClick={() => setFilters({ ...filters, location: "" })}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            )}
            {filters.course && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {filters.course}
                <button
                  onClick={() => setFilters({ ...filters, course: "" })}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            )}
            {filters.tuitionRange && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {filters.tuitionRange}
                <button
                  onClick={() => setFilters({ ...filters, tuitionRange: "" })}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredColleges.length}{" "}
            {filteredColleges.length === 1 ? "college" : "colleges"}
          </p>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={college.imageUrl}
                alt={college.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {college.name}
                  </h2>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {college.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {college.location}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Popular Courses:
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {college.courses.map((course) => (
                      <span
                        key={course}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Tuition range: {college.tuitionRange}
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => navigate(`/colleges/${college.id}`)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No colleges found matching your criteria. Try adjusting your
              filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesPage;
