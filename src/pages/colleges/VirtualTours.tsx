import { useState } from "react";
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
import type { College } from "../../types/college";

const mockColleges: College[] = [
  {
    id: "1",
    name: "Stanford University",
    location: "Stanford, CA",
    rating: 4.8,
    tuitionRange: "$50,000 - $60,000",
    acceptanceRate: "4%",
    studentPopulation: "17,000",
    courses: ["Computer Science", "Engineering", "Business"],
    rankings: {
      academic: 1,
      studentSatisfaction: 1,
      placement: 1,
    },
    virtualTours: [
      {
        id: "1",
        title: "Main Campus Tour",
        url: "https://www.youtube.com/embed/nP-nMZpLM1A", // Valid YouTube embed URL
        thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585",
      },
      {
        id: "2",
        title: "Engineering Building Tour",
        url: "https://www.youtube.com/embed/emBoDloCze8", // Updated to embed format
        thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585",
      },
    ],
    imageUrl: "",
    programs: undefined,
  },
  {
    id: "2",
    name: "MIT",
    location: "Cambridge, MA",
    rating: 4.9,
    tuitionRange: "$55,000 - $65,000",
    acceptanceRate: "7%",
    studentPopulation: "11,500",
    courses: ["Engineering", "Physics", "Mathematics"],
    rankings: {
      academic: 2,
      studentSatisfaction: 2,
      placement: 1,
    },
    virtualTours: [
      {
        id: "1",
        title: "Campus Overview",
        url: "https://www.youtube.com/embed/elmZ-SFw5a4", // Updated to embed format
        thumbnail:
          "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
      },
    ],
    imageUrl: "",
    programs: undefined,
  },
];

const VirtualTours = () => {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedTourIndex, setSelectedTourIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredColleges = mockColleges.filter((college) => {
    const matchesSearch = college.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter
      ? college.location.includes(locationFilter)
      : true;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Virtual Campus Tours</h1>
        <p className="text-gray-600 mb-6">
          Experience college campuses from anywhere in the world
        </p>

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
            <SelectContent>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="MA">Massachusetts</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <div
            key={college.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={college.virtualTours?.[0]?.thumbnail}
                alt={college.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black"
                  onClick={() => {
                    setSelectedCollege(college);
                    setSelectedTourIndex(0);
                  }}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Tour
                </Button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
              <p className="text-gray-600 mb-4">{college.location}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Available Tours: {college.virtualTours?.length || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={selectedCollege !== null}
        onOpenChange={(open) => !open && setSelectedCollege(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCollege?.name} - Virtual Tour</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            {selectedCollege?.virtualTours?.[selectedTourIndex]?.url ? (
              <iframe
                src={selectedCollege.virtualTours[selectedTourIndex].url}
                className="w-full h-full"
                allowFullScreen
                title="Virtual Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <p className="text-gray-600">
                  Unable to load the virtual tour. Please try again later.
                </p>
              </div>
            )}
          </div>
          {selectedCollege?.virtualTours &&
            selectedCollege.virtualTours.length > 1 && (
              <div className="flex gap-4 mt-4">
                {selectedCollege.virtualTours.map((tour, index) => (
                  <button
                    key={tour.id}
                    onClick={() => setSelectedTourIndex(index)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      selectedTourIndex === index
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {tour.title}
                  </button>
                ))}
              </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VirtualTours;
