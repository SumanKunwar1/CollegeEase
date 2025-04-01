import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import type { College } from "../../types/college";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchCompare = () => {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [tuitionFilter, setTuitionFilter] = useState("all");
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch colleges from backend
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/search-compare`);
        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }
        const data = await response.json();
        setColleges(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching colleges:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const handleCompare = () => {
    if (selectedColleges.length >= 2) {
      setShowComparison(true);
    }
  };

  const toggleCollegeSelection = (college: College) => {
    if (selectedColleges.some((c) => c._id === college._id)) {
      setSelectedColleges(selectedColleges.filter((c) => c._id !== college._id));
    } else if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };


  // Helper function to extract numeric value from tuition range string
  function getTuitionValue(tuitionRange: string): number {
    const match = tuitionRange.match(/\$([0-9,]+)/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ""));
    }
    return 0;
  }

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p>Loading colleges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading colleges: {error}</p>
          <Button
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
        </div>
      </div>

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
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{college.organizationName}</h3>
              <p className="text-gray-600 mb-4">{college.location}</p>
              <div className="space-y-2 mb-4">
                <p>
                  <span className="font-medium">Tuition:</span>{" "}
                  {college.tuitionRange}
                </p>
                <p>
                  <span className="font-medium">Acceptance Rate:</span>{" "}
                  {college.acceptanceRate}
                </p>
                <p>
                  <span className="font-medium">Student Population:</span>{" "}
                  {college.studentPopulation}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {college.courses.map((course, index) => (
                  <span
                    key={`${college._id}-${index}`}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
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
              onClick={handleCompare}
              disabled={selectedColleges.length < 2}
            >
              Compare Colleges
            </Button>
          </div>
        </div>
      )}

      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>College Comparison</DialogTitle>
            <DialogDescription>
              Compare up to 3 colleges side by side
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-[auto,1fr,1fr,1fr] gap-4">
            <div className="font-medium">
              <div className="h-12"></div>
              <div className="py-2">Location</div>
              <div className="py-2">Tuition Range</div>
              <div className="py-2">Acceptance Rate</div>
              <div className="py-2">Student Population</div>
              <div className="py-2">Courses</div>
            </div>
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

export default SearchCompare;