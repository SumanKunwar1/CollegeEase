import { useState, useEffect } from "react";
import { Search, Filter, Plus, X, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import type { College, NewCollege } from "../../../types/searchCompare";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminSearchCompare = () => {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [tuitionFilter, setTuitionFilter] = useState("all");
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddCollegeDialog, setShowAddCollegeDialog] = useState(false);
  const [newCollege, setNewCollege] = useState<NewCollege>({
    organizationName: "",
    location: "",
    tuitionRange: "$0",
    acceptanceRate: "0%",
    studentPopulation: "0",
    courses: [],
  });
  const [newCoursesInput, setNewCoursesInput] = useState("");

  // Fetch colleges from backend
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/search-compare`);
        if (!response.ok) throw new Error("Failed to fetch colleges");
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColleges();
  }, []);

  // Handle text changes for colleges
  const handleTextChange = async (
    collegeId: string,
    field: keyof College,
    value: string
  ) => {
    try {
      const updatedColleges = colleges.map((college) =>
        college._id === collegeId ? { ...college, [field]: value } : college
      );
      setColleges(updatedColleges);

      const collegeToUpdate = updatedColleges.find((c) => c._id === collegeId);
      if (!collegeToUpdate) return;

      const response = await fetch(`${API_BASE_URL}/search-compare/${collegeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collegeToUpdate),
      });

      if (!response.ok) throw new Error("Failed to update college");
    } catch (error) {
      console.error("Error updating college:", error);
    }
  };

  // Handle adding a new course to a college
  const addCourse = async (collegeId: string, newCourse: string) => {
    if (!newCourse.trim()) return;

    try {
      const college = colleges.find((c) => c._id === collegeId);
      if (!college) return;

      const updatedCollege = {
        ...college,
        courses: [...college.courses, newCourse.trim()],
      };

      const response = await fetch(`${API_BASE_URL}/search-compare/${collegeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCollege),
      });

      if (!response.ok) throw new Error("Failed to add course");

      setColleges((prev) =>
        prev.map((c) => (c._id === collegeId ? updatedCollege : c))
      );
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Handle removing a course from a college
  const removeCourse = async (collegeId: string, courseIndex: number) => {
    try {
      const college = colleges.find((c) => c._id === collegeId);
      if (!college) return;

      const updatedCourses = [...college.courses];
      updatedCourses.splice(courseIndex, 1);

      const updatedCollege = {
        ...college,
        courses: updatedCourses,
      };

      const response = await fetch(`${API_BASE_URL}/search-compare/${collegeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCollege),
      });

      if (!response.ok) throw new Error("Failed to remove course");

      setColleges((prev) =>
        prev.map((c) => (c._id === collegeId ? updatedCollege : c))
      );
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

  // Create a new college
  const handleCreateCollege = async () => {
    try {
      // Process courses input
      const courses = newCoursesInput
        .split(",")
        .map((course) => course.trim())
        .filter((course) => course.length > 0);

      const collegeToCreate = {
        ...newCollege,
        courses,
      };

      const response = await fetch(`${API_BASE_URL}/search-compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collegeToCreate),
      });

      if (!response.ok) throw new Error("Failed to create college");

      const createdCollege = await response.json();
      setColleges((prev) => [...prev, createdCollege]);
      setNewCollege({
        organizationName: "",
        location: "",
        tuitionRange: "$0",
        acceptanceRate: "0%",
        studentPopulation: "0",
        courses: [],
      });
      setNewCoursesInput("");
      setShowAddCollegeDialog(false);
    } catch (error) {
      console.error("Error creating college:", error);
      alert("Failed to create college. Please try again.");
    }
  };

  // Delete a college
  const handleDeleteCollege = async (collegeId: string) => {
    if (!window.confirm("Are you sure you want to delete this college?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/search-compare/${collegeId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete college");

      setColleges((prev) => prev.filter((c) => c._id !== collegeId));
      setSelectedColleges((prev) => prev.filter((c) => c._id !== collegeId));
    } catch (error) {
      console.error("Error deleting college:", error);
      alert("Failed to delete college. Please try again.");
    }
  };

  // Toggle college selection
  const toggleCollegeSelection = (college: College) => {
    if (selectedColleges.some((c) => c._id === college._id)) {
      setSelectedColleges(selectedColleges.filter((c) => c._id !== college._id));
    } else if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  // Filter colleges based on search query and filters
  const filteredColleges = colleges.filter((college) => {
    // Filter by search query (college name)
    if (
      searchQuery &&
      !college.organizationName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by location (skip if "all" is selected)
    if (
      locationFilter !== "all" &&
      !college.location.toLowerCase().includes(locationFilter.toLowerCase())
    ) {
      return false;
    }

    // Filter by tuition range (skip if "all" is selected)
    if (tuitionFilter !== "all") {
      const tuition = parseFloat(college.tuitionRange.replace(/[^0-9.]/g, "")) || 0;

      if (tuitionFilter === "0-25000" && tuition > 25000) {
        return false;
      } else if (
        tuitionFilter === "25000-50000" &&
        (tuition <= 25000 || tuition > 50000)
      ) {
        return false;
      } else if (tuitionFilter === "50000+" && tuition <= 50000) {
        return false;
      }
    }

    return true;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setLocationFilter("all");
    setTuitionFilter("all");
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading colleges...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search & Compare Colleges</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search colleges..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="ca">California</SelectItem>
              <SelectItem value="ma">Massachusetts</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tuitionFilter} onValueChange={setTuitionFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tuition Range" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Tuition Ranges</SelectItem>
              <SelectItem value="0-25000">$0 - $25,000</SelectItem>
              <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
              <SelectItem value="50000+">$50,000+</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="w-[120px]"
            onClick={resetFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
          <Button
            className="w-[180px]"
            onClick={() => setShowAddCollegeDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New College
          </Button>
        </div>
      </div>

      {/* College List */}
      {filteredColleges.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No colleges match your filters
          </p>
          <Button className="mt-4" onClick={resetFilters}>
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college._id}
              className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                selectedColleges.some((c) => c._id === college._id)
                  ? "border-blue-500"
                  : "border-transparent"
              } relative`}
            >
              {/* Delete button */}
              <button
                onClick={() => handleDeleteCollege(college._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Delete college"
              >
                <Trash2 className="h-5 w-5" />
              </button>

              {/* College Name */}
              <h3
                contentEditable
                suppressContentEditableWarning
                className="text-xl font-semibold mb-2 outline-none pr-6"
                onBlur={(e) =>
                  handleTextChange(college._id, "organizationName", e.target.innerText)
                }
              >
                {college.organizationName}
              </h3>

              {/* College Location */}
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-gray-600 mb-4 outline-none"
                onBlur={(e) =>
                  handleTextChange(college._id, "location", e.target.innerText)
                }
              >
                {college.location}
              </p>

              {/* College Details */}
              <div className="space-y-2 mb-4">
                <p>
                  <span className="font-medium">Tuition:</span>{" "}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="outline-none"
                    onBlur={(e) =>
                      handleTextChange(college._id, "tuitionRange", e.target.innerText)
                    }
                  >
                    {college.tuitionRange}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Acceptance Rate:</span>{" "}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="outline-none"
                    onBlur={(e) =>
                      handleTextChange(college._id, "acceptanceRate", e.target.innerText)
                    }
                  >
                    {college.acceptanceRate}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Student Population:</span>{" "}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="outline-none"
                    onBlur={(e) =>
                      handleTextChange(college._id, "studentPopulation", e.target.innerText)
                    }
                  >
                    {college.studentPopulation}
                  </span>
                </p>
              </div>

              {/* Courses Section */}
              <div className="flex flex-wrap gap-2 mb-4">
                {college.courses.map((course, index) => (
                  <div
                    key={`${college._id}-${index}`}
                    className="flex items-center px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="outline-none"
                      onBlur={(e) => {
                        const updatedCourses = [...college.courses];
                        updatedCourses[index] = e.target.innerText;
                        const updatedCollege = {
                          ...college,
                          courses: updatedCourses,
                        };
                        setColleges((prev) =>
                          prev.map((c) => (c._id === college._id ? updatedCollege : c))
                        );
                      }}
                    >
                      {course}
                    </span>
                    <button
                      onClick={() => removeCourse(college._id, index)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newCourse = prompt("Enter a new course:");
                    if (newCourse) {
                      addCourse(college._id, newCourse);
                    }
                  }}
                  className="flex items-center px-2 py-1 bg-green-100 rounded-full text-sm text-green-800 hover:bg-green-200"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Course
                </button>
              </div>

              {/* Add to Compare Button */}
              <Button
                variant={
                  selectedColleges.some((c) => c._id === college._id)
                    ? "secondary"
                    : "outline"
                }
                className="w-full"
                onClick={() => toggleCollegeSelection(college)}
                disabled={
                  !selectedColleges.some((c) => c._id === college._id) &&
                  selectedColleges.length >= 3
                }
              >
                {selectedColleges.some((c) => c._id === college._id)
                  ? "Remove from Comparison"
                  : selectedColleges.length >= 3
                  ? "Max 3 Selected"
                  : "Add to Compare"}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add College Dialog */}
      <Dialog open={showAddCollegeDialog} onOpenChange={setShowAddCollegeDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle>Add New College</DialogTitle>
            <DialogDescription>
              Fill in the details for the new college
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">College Name*</label>
              <Input
                value={newCollege.organizationName}
                onChange={(e) => setNewCollege({...newCollege, organizationName: e.target.value})}
                placeholder="Enter college name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location*</label>
              <Input
                value={newCollege.location}
                onChange={(e) => setNewCollege({...newCollege, location: e.target.value})}
                placeholder="Enter location"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tuition Range*</label>
              <Input
                value={newCollege.tuitionRange}
                onChange={(e) => setNewCollege({...newCollege, tuitionRange: e.target.value})}
                placeholder="e.g., $10,000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Acceptance Rate*</label>
              <Input
                value={newCollege.acceptanceRate}
                onChange={(e) => setNewCollege({...newCollege, acceptanceRate: e.target.value})}
                placeholder="e.g., 25%"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Student Population*</label>
              <Input
                value={newCollege.studentPopulation}
                onChange={(e) => setNewCollege({...newCollege, studentPopulation: e.target.value})}
                placeholder="e.g., 5000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Courses (comma separated)</label>
              <Input
                value={newCoursesInput}
                onChange={(e) => setNewCoursesInput(e.target.value)}
                placeholder="e.g., Computer Science, Business, Engineering"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddCollegeDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateCollege}
                disabled={!newCollege.organizationName || !newCollege.location}
              >
                Add College
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Comparison Footer */}
      {selectedColleges.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                {selectedColleges.length} college
                {selectedColleges.length !== 1 ? "s" : ""} selected
              </span>
              <div className="flex gap-2">
                {selectedColleges.map((college) => (
                  <span
                    key={college._id}
                    className="px-3 py-1 bg-blue-100 rounded-full text-sm"
                  >
                    {college.organizationName}
                  </span>
                ))}
              </div>
            </div>
            <Button
              onClick={() => setShowComparison(true)}
              disabled={selectedColleges.length < 2}
            >
              Compare Colleges
            </Button>
          </div>
        </div>
      )}

      {/* Comparison Dialog */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>College Comparison</DialogTitle>
            <DialogDescription>
              Compare up to 3 colleges side by side
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-[auto,1fr,1fr,1fr] gap-4">
            {/* Header Row */}
            <div className="font-medium">
              <div className="h-12"></div>
              <div className="py-2">Location</div>
              <div className="py-2">Tuition Range</div>
              <div className="py-2">Acceptance Rate</div>
              <div className="py-2">Student Population</div>
              <div className="py-2">Courses</div>
            </div>

            {/* College Data Rows */}
            {selectedColleges.map((college) => (
              <div key={college._id}>
                <div className="h-12 font-semibold">{college.organizationName}</div>
                <div className="py-2">{college.location}</div>
                <div className="py-2">{college.tuitionRange}</div>
                <div className="py-2">{college.acceptanceRate}</div>
                <div className="py-2">{college.studentPopulation}</div>
                <div className="py-2">
                  <div className="flex flex-wrap gap-1">
                    {college.courses.map((course, index) => (
                      <span
                        key={`${college._id}-${index}`}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSearchCompare;