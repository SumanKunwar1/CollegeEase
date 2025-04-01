import { useState, useEffect } from "react";
import { Search, Play } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import type { College } from "../../types/virtualTour";
import {
  fetchColleges,
  fetchLocations,
} from "../../services/virtualTour.service";
import { Skeleton } from "../../components/ui/skeleton";

const VirtualTours = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedTourIndex, setSelectedTourIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [collegesData, locationsData] = await Promise.all([
          fetchColleges(),
          fetchLocations()
        ]);
        
        setColleges(collegesData);
        setLocations(locationsData);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load virtual tours. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter colleges based on search and location
  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.organizationName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === "all" 
      ? true 
      : college.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Virtual Campus Tours</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-10 w-full md:w-2/3" />
            <Skeleton className="h-10 w-full md:w-1/3" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Skeleton className="w-full h-48" />
              <div className="p-6 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Virtual Campus Tours</h1>
          <p className="text-gray-600 mb-6">
            Experience college campuses from anywhere in the world
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
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
        <h1 className="text-3xl font-bold mb-4">Virtual Campus Tours</h1>
        <p className="text-gray-600 mb-6">
          Experience college campuses from anywhere in the world
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
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
          <Select 
            value={locationFilter} 
            onValueChange={setLocationFilter}
            disabled={locations.length === 0}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={locations.length ? "All Locations" : "Loading..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={
                    college.imageUrl || 
                    college.virtualTours?.[0]?.thumbnail || 
                    "/placeholder-college.jpg"
                  }
                  alt={college.organizationName}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-college.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black"
                    onClick={() => {
                      setSelectedCollege(college);
                      setSelectedTourIndex(0);
                    }}
                    disabled={!college.virtualTours?.length}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    {college.virtualTours?.length ? "Start Tour" : "No Tours Available"}
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{college.organizationName}</h3>
                <p className="text-gray-600 mb-4">{college.location}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {college.virtualTours?.length || 0} Tours
                  </span>
                  {college.rating && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ★ {college.rating.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No colleges found
          </h3>
          <p className="text-gray-600">
            {searchQuery || locationFilter !== "all"
              ? "Try adjusting your search filters"
              : "No virtual tours available at this time"}
          </p>
        </div>
      )}

      <Dialog
        open={selectedCollege !== null}
        onOpenChange={(open) => !open && setSelectedCollege(null)}
      >
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>{selectedCollege?.organizationName} - Virtual Tour</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {selectedCollege?.virtualTours?.[selectedTourIndex]?.url ? (
              <iframe
                src={selectedCollege.virtualTours[selectedTourIndex].url}
                className="w-full h-full"
                allowFullScreen
                title={`Virtual Tour - ${selectedCollege.virtualTours[selectedTourIndex].title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-gray-600">
                  No virtual tour available for this college
                </p>
                <Button variant="outline" onClick={() => setSelectedCollege(null)}>
                  Close
                </Button>
              </div>
            )}
          </div>
          {selectedCollege?.virtualTours &&
            selectedCollege.virtualTours.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {selectedCollege.virtualTours.map((tour, index) => (
                  <Button
                    key={tour._id}
                    variant={selectedTourIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTourIndex(index)}
                    className="whitespace-nowrap"
                  >
                    {tour.title}
                  </Button>
                ))}
              </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VirtualTours;