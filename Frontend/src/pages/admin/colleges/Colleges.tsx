import { Search, Filter, MapPin, Star, X, Plus, Trash2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import type { College } from "../../../types/college";
import axios, { AxiosError } from "axios";


const AdminCollegesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    course: "",
    tuitionRange: "",
  });
  const [showAddCollegeModal, setShowAddCollegeModal] = useState(false);
  const [newCollege, setNewCollege] = useState<Partial<College>>({
    organizationName: "",
    location: "",
    courses: [],
    rating: 0,
    imageUrl: "",
    tuitionRange: "",
  });
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch colleges from backend
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/admin/colleges");
        setColleges(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setError("Failed to fetch colleges. Please try again later.");
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Extract unique values for filters
  const locations = [...new Set(colleges.map((college) => college.location))];
  const allCourses = [...new Set(colleges.flatMap((college) => college.courses || []))];
  const tuitionRanges = [...new Set(colleges.map((college) => college.tuitionRange || ""))].filter(Boolean);

  // Filter colleges based on search query and filters
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const orgName = college?.organizationName?.toLowerCase() || '';
      const loc = college?.location || '';
      const collegeCourses = college?.courses || [];
      const tuition = college?.tuitionRange || '';

      const matchesSearch = orgName.includes(searchQuery.toLowerCase());
      const matchesLocation = !filters.location || loc === filters.location;
      const matchesCourse = !filters.course || collegeCourses.includes(filters.course);
      const matchesTuition = !filters.tuitionRange || tuition === filters.tuitionRange;

      return matchesSearch && matchesLocation && matchesCourse && matchesTuition;
    });
  }, [colleges, searchQuery, filters]);

  const resetFilters = () => {
    setFilters({
      location: "",
      course: "",
      tuitionRange: "",
    });
  };

  // Update college data
  const updateCollege = async (organizationName: string, updates: Partial<College>) => {
    if (!organizationName) {
      alert("College identifier is missing");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4001/api/v1/admin/colleges/${encodeURIComponent(organizationName)}`,
        updates
      );
      
      // Create new array to avoid mutation
      setColleges(prevColleges => 
        prevColleges.map(college => 
          college.organizationName === organizationName ? { ...college, ...response.data } : college
        )
      );
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : "Failed to update college";
      alert(errorMessage);
      throw error;
    }
  };

  // Handle field updates
  const handleFieldUpdate = async (
    organizationName: string,
    field: keyof College,
    value: string | number
  ) => {
    try {
      await updateCollege(organizationName, { [field]: value });
    } catch (error) {
      // Revert UI if update fails
      setColleges(prevColleges => 
        prevColleges.map(college => 
          college.organizationName === organizationName 
            ? { ...college, [field]: prevColleges.find(c => c.organizationName === organizationName)?.[field] } 
            : college
        )
      );
    }
  };

// In Colleges.tsx, modify these functions:

// Add a new course to a college
const addCourse = async (organizationName: string) => {
  const newCourse = prompt("Enter new course name:");
  if (!newCourse?.trim()) return;
  
  try {
    const response = await axios.post(
      `http://localhost:4001/api/v1/admin/colleges/${encodeURIComponent(organizationName)}/courses`,
      { course: newCourse.trim() }
    );
    setColleges(prevColleges => 
      prevColleges.map(college => 
        college.organizationName === organizationName ? response.data : college
      )
    );
  } catch (error) {
    const errorMessage = error instanceof AxiosError
      ? error.response?.data?.message || error.message
      : "Failed to add course";
    alert(errorMessage);
  }
};

// Remove a course from a college
const removeCourse = async (organizationName: string, course: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:4001/api/v1/admin/colleges/${encodeURIComponent(organizationName)}/courses`,
      { data: { course } }
    );
    setColleges(prevColleges => 
      prevColleges.map(college => 
        college.organizationName === organizationName ? response.data : college
      )
    );
  } catch (error) {
    const errorMessage = error instanceof AxiosError
      ? error.response?.data?.message || error.message
      : "Failed to remove course";
    alert(errorMessage);
  }
};

  // Create a new college
  const handleAddCollege = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/admin/colleges",
        {
          organizationName: newCollege.organizationName,
          location: newCollege.location,
          imageUrl: newCollege.imageUrl || '',
          courses: newCollege.courses?.filter(course => course.trim()) || [],
          tuitionRange: newCollege.tuitionRange || ''
        }
      );
      setColleges(prevColleges => [...prevColleges, response.data]);
      setShowAddCollegeModal(false);
      setNewCollege({
        organizationName: "",
        location: "",
        courses: [],
        rating: 0,
        imageUrl: "",
        tuitionRange: ""
      });
    } catch (error) {
      const errorMessage = error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : "Failed to create college";
      alert(errorMessage);
    }
  };

  // Delete a college
  const deleteCollege = async (organizationName: string) => {
    if (!confirm("Are you sure you want to delete this college?")) return;
    
    try {
      await axios.delete(
        `http://localhost:4001/api/v1/admin/colleges/${encodeURIComponent(organizationName)}`
      );
      setColleges(prevColleges => 
        prevColleges.filter(college => college.organizationName !== organizationName)
      );
    } catch (error) {
      const errorMessage = error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : "Failed to delete college";
      alert(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading colleges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
            <h1 className="text-3xl font-bold text-gray-900">Manage Colleges</h1>
            <p className="mt-2 text-gray-600">Add, edit, or remove colleges from the system</p>
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
            <button
              onClick={() => setShowAddCollegeModal(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add College
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter Colleges</h2>
              <button onClick={resetFilters} className="text-sm text-blue-600 hover:text-blue-800">
                Reset Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={filters.course}
                  onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Courses</option>
                  {allCourses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tuition Range</label>
                <select
                  value={filters.tuitionRange}
                  onChange={(e) => setFilters({ ...filters, tuitionRange: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Ranges</option>
                  {tuitionRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredColleges.length} {filteredColleges.length === 1 ? "college" : "colleges"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <div
              key={`college-${college.organizationName}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={college.imageUrl || "/Assets/images/default-college.jpg"}
                  alt={college.organizationName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => deleteCollege(college.organizationName)}
                    className="bg-red-500 text-white p-1 rounded-md shadow-sm hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <input
                    type="text"
                    value={college.organizationName}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setColleges(prev => 
                        prev.map(c => 
                          c.organizationName === college.organizationName 
                            ? {...c, organizationName: newValue} 
                            : c
                        )
                      );
                    }}
                    onBlur={(e) => handleFieldUpdate(college.organizationName, 'organizationName', e.target.value)}
                    className="text-xl font-semibold text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                  />
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={college.rating}
                      onChange={(e) => {
                        const newValue = parseFloat(e.target.value) || 0;
                        setColleges(prev => 
                          prev.map(c => 
                            c.organizationName === college.organizationName 
                              ? {...c, rating: newValue} 
                              : c
                          )
                        );
                      }}
                      onBlur={(e) => handleFieldUpdate(college.organizationName, 'rating', parseFloat(e.target.value))}
                      className="ml-1 text-sm text-gray-600 w-12 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <input
                    type="text"
                    value={college.location}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setColleges(prev => 
                        prev.map(c => 
                          c.organizationName === college.organizationName 
                            ? {...c, location: newValue} 
                            : c
                        )
                      );
                    }}
                    onBlur={(e) => handleFieldUpdate(college.organizationName, 'location', e.target.value)}
                    className="border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">Popular Courses:</h3>
                    <button
                      onClick={() => addCourse(college.organizationName)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Add Course
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {college.courses?.map((course, index) => (
                      <div key={`${college.organizationName}-${course}-${index}`} className="relative group">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course}
                          <button
                            onClick={() => removeCourse(college.organizationName, course)}
                            className="ml-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={college.imageUrl || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setColleges(prev => 
                        prev.map(c => 
                          c.organizationName === college.organizationName 
                            ? {...c, imageUrl: newValue} 
                            : c
                        )
                      );
                    }}
                    onBlur={(e) => handleFieldUpdate(college.organizationName, 'imageUrl', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Tuition range:{" "}
                  <input
                    type="text"
                    value={college.tuitionRange || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setColleges(prev => 
                        prev.map(c => 
                          c.organizationName === college.organizationName 
                            ? {...c, tuitionRange: newValue} 
                            : c
                        )
                      );
                    }}
                    onBlur={(e) => handleFieldUpdate(college.organizationName, 'tuitionRange', e.target.value)}
                    className="border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredColleges.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No colleges found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {showAddCollegeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New College</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddCollege(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organization Name*</label>
                  <input
                    type="text"
                    value={newCollege.organizationName}
                    onChange={(e) => setNewCollege({...newCollege, organizationName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location*</label>
                  <input
                    type="text"
                    value={newCollege.location}
                    onChange={(e) => setNewCollege({...newCollege, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={newCollege.imageUrl || ""}
                    onChange={(e) => setNewCollege({...newCollege, imageUrl: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Courses (comma separated)</label>
                  <input
                    type="text"
                    value={newCollege.courses?.join(", ") || ""}
                    onChange={(e) => setNewCollege({
                      ...newCollege,
                      courses: e.target.value.split(",").map(c => c.trim()),
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Computer Science, Business, Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={newCollege.rating || 0}
                    onChange={(e) => setNewCollege({
                      ...newCollege,
                      rating: parseFloat(e.target.value),
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tuition Range</label>
                  <input
                    type="text"
                    value={newCollege.tuitionRange || ""}
                    onChange={(e) => setNewCollege({
                      ...newCollege,
                      tuitionRange: e.target.value,
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="$30,000 - $50,000"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddCollegeModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCollegesPage;