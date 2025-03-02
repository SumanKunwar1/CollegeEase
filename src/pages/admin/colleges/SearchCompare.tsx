import { useState } from "react";
import { Search, Filter, Plus, X } from "lucide-react";
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
} from "../../../components/ui/dialog";
import type { College } from "../../../types/college";
import { colleges as initialColleges } from "../../../data/colleges";

const AdminSearchCompare = () => {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [tuitionFilter, setTuitionFilter] = useState("all");
  const [colleges, setColleges] = useState<College[]>(initialColleges);

  // Handle text changes for colleges
  const handleTextChange = (
    collegeId: string,
    field: keyof College,
    value: string
  ) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.id === collegeId ? { ...college, [field]: value } : college
      )
    );
  };

  const handleSave = () => {
    console.log("Updated Colleges:", colleges);
    alert("Changes saved successfully!");
  };

  // Handle adding a new course to a college
  const addCourse = (collegeId: string, newCourse: string) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.id === collegeId
          ? { ...college, courses: [...college.courses, newCourse] }
          : college
      )
    );
  };

  // Handle removing a course from a college
  const removeCourse = (collegeId: string, course: string) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.id === collegeId
          ? {
              ...college,
              courses: college.courses.filter((c) => c !== course),
            }
          : college
      )
    );
  };

  // Handle comparison
  const handleCompare = () => {
    if (selectedColleges.length >= 2) {
      setShowComparison(true);
    }
  };

  // Toggle college selection
  const toggleCollegeSelection = (college: College) => {
    if (selectedColleges.find((c) => c.id === college.id)) {
      setSelectedColleges(selectedColleges.filter((c) => c.id !== college.id));
    } else if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  // Helper function to convert state abbreviation to full name
  const getLocationName = (stateCode: string): string => {
    const states: Record<string, string> = {
      ca: "California",
      ma: "Massachusetts",
      ny: "New York",
      all: "All Locations",
    };
    return states[stateCode] || stateCode;
  };

  // Helper function to extract numeric value from tuition range string
  const getTuitionValue = (tuitionRange: string): number => {
    const match = tuitionRange.match(/\$([0-9,]+)/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ""));
    }
    return 0;
  };

  // Filter colleges based on search query and filters
  const filteredColleges = colleges.filter((college) => {
    // Filter by search query (college name)
    if (
      searchQuery &&
      !college.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by location (skip if "all" is selected)
    if (
      locationFilter !== "all" &&
      !college.location
        .toLowerCase()
        .includes(getLocationName(locationFilter).toLowerCase())
    ) {
      return false;
    }

    // Filter by tuition range (skip if "all" is selected)
    if (tuitionFilter !== "all") {
      const tuition = getTuitionValue(college.tuitionRange);

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1
          contentEditable
          suppressContentEditableWarning
          className="text-3xl font-bold mb-4 outline-none"
        >
          Search & Compare Colleges
        </h1>
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
              key={college.id}
              className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                selectedColleges.find((c) => c.id === college.id)
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              {/* College Name */}
              <h3
                contentEditable
                suppressContentEditableWarning
                className="text-xl font-semibold mb-2 outline-none"
                onBlur={(e) =>
                  handleTextChange(college.id, "name", e.target.innerText)
                }
              >
                {college.name}
              </h3>

              {/* College Location */}
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-gray-600 mb-4 outline-none"
                onBlur={(e) =>
                  handleTextChange(college.id, "location", e.target.innerText)
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
                      handleTextChange(
                        college.id,
                        "tuitionRange",
                        e.target.innerText
                      )
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
                      handleTextChange(
                        college.id,
                        "acceptanceRate",
                        e.target.innerText
                      )
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
                      handleTextChange(
                        college.id,
                        "studentPopulation",
                        e.target.innerText
                      )
                    }
                  >
                    {college.studentPopulation}
                  </span>
                </p>
              </div>

              {/* Courses Section */}
              <div className="flex flex-wrap gap-2 mb-4">
                {college.courses.map((course) => (
                  <div
                    key={course}
                    className="flex items-center px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="outline-none"
                      onBlur={(e) => {
                        const updatedCourses = college.courses.map((c) =>
                          c === course ? e.target.innerText : c
                        );
                        setColleges((prev) =>
                          prev.map((c) =>
                            c.id === college.id
                              ? { ...c, courses: updatedCourses }
                              : c
                          )
                        );
                      }}
                    >
                      {course}
                    </span>
                    <button
                      onClick={() => removeCourse(college.id, course)}
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
                      addCourse(college.id, newCourse);
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
                  selectedColleges.find((c) => c.id === college.id)
                    ? "secondary"
                    : "outline"
                }
                className="w-full"
                onClick={() => toggleCollegeSelection(college)}
                disabled={
                  !selectedColleges.find((c) => c.id === college.id) &&
                  selectedColleges.length >= 3
                }
              >
                {selectedColleges.find((c) => c.id === college.id)
                  ? "Remove from Comparison"
                  : selectedColleges.length >= 3
                  ? "Max 3 Selected"
                  : "Add to Compare"}
              </Button>
            </div>
          ))}
        </div>
      )}

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
                    key={college.id}
                    className="px-3 py-1 bg-blue-100 rounded-full text-sm"
                  >
                    {college.name}
                  </span>
                ))}
              </div>
            </div>
            <Button
              onClick={handleCompare}
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
              <div key={college.id}>
                <div className="h-12 font-semibold">{college.name}</div>
                <div className="py-2">{college.location}</div>
                <div className="py-2">{college.tuitionRange}</div>
                <div className="py-2">{college.acceptanceRate}</div>
                <div className="py-2">{college.studentPopulation}</div>
                <div className="py-2">
                  <div className="flex flex-wrap gap-1">
                    {college.courses.map((course) => (
                      <span
                        key={course}
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

          {/* Save Update Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={handleSave}
              className="bg-blue-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Save Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Update Button at the bottom of the page */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4">
        <div className="container mx-auto flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Save Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSearchCompare;
