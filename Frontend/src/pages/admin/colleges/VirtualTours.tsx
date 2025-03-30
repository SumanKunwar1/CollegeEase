import { useState } from "react";
import { Search, Play, Plus, Save, Trash, X } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import type { College, VirtualTour } from "../../../types/college";

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
        url: "https://www.youtube.com/embed/nP-nMZpLM1A",
        thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585",
      },
      {
        id: "2",
        title: "Engineering Building Tour",
        url: "https://www.youtube.com/embed/emBoDloCze8",
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
        url: "https://www.youtube.com/embed/elmZ-SFw5a4",
        thumbnail:
          "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
      },
    ],
    imageUrl: "",
    programs: undefined,
  },
];

const AdminVirtualTours = () => {
  const [colleges, setColleges] = useState<College[]>(mockColleges);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedTourIndex, setSelectedTourIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isAddCollegeDialogOpen, setIsAddCollegeDialogOpen] = useState(false);
  const [isAddTourDialogOpen, setIsAddTourDialogOpen] = useState(false);
  const [newCollege, setNewCollege] = useState<Partial<College>>({
    name: "",
    location: "",
    virtualTours: [],
    imageUrl: "",
  });
  const [newTour, setNewTour] = useState<Partial<VirtualTour>>({
    title: "",
    url: "",
    thumbnail: "",
  });

  // Filter colleges based on search and location
  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter
      ? college.location.includes(locationFilter)
      : true;
    return matchesSearch && matchesLocation;
  });

  // Handle adding a new college
  const handleAddCollege = () => {
    if (newCollege.name && newCollege.location) {
      const collegeToAdd: College = {
        id: String(colleges.length + 1),
        name: newCollege.name,
        location: newCollege.location,
        rating: 0,
        tuitionRange: "",
        acceptanceRate: "",
        studentPopulation: "",
        courses: [],
        rankings: { academic: 0, studentSatisfaction: 0, placement: 0 },
        virtualTours: newCollege.virtualTours || [],
        imageUrl: newCollege.imageUrl || "",
        programs: undefined,
      };
      setColleges([...colleges, collegeToAdd]);
      setIsAddCollegeDialogOpen(false);
      setNewCollege({ name: "", location: "", virtualTours: [], imageUrl: "" });
    }
  };

  // Handle adding a new tour
  const handleAddTour = () => {
    if (selectedCollege && newTour.title && newTour.url) {
      const tourToAdd: VirtualTour = {
        id: String(Math.random()),
        title: newTour.title,
        url: newTour.url,
        thumbnail: newTour.thumbnail || "",
      };
      setColleges((prev) =>
        prev.map((college) =>
          college.id === selectedCollege.id
            ? {
                ...college,
                virtualTours: [...college.virtualTours, tourToAdd],
              }
            : college
        )
      );
      setIsAddTourDialogOpen(false);
      setNewTour({ title: "", url: "", thumbnail: "" });
    }
  };

  // Handle updating a virtual tour URL
  const handleUpdateTourUrl = (
    collegeId: string,
    tourId: string,
    newUrl: string
  ) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.id === collegeId
          ? {
              ...college,
              virtualTours: college.virtualTours.map((tour) =>
                tour.id === tourId ? { ...tour, url: newUrl } : tour
              ),
            }
          : college
      )
    );
  };

  // Handle uploading a local video
  const handleUploadVideo = (collegeId: string, file: File) => {
    const newTour: VirtualTour = {
      id: String(Math.random()),
      title: file.name,
      url: URL.createObjectURL(file),
      thumbnail: "",
    };
    setColleges((prev) =>
      prev.map((college) =>
        college.id === collegeId
          ? {
              ...college,
              virtualTours: [...college.virtualTours, newTour],
            }
          : college
      )
    );
  };

  // Handle deleting a tour
  const handleDeleteTour = (collegeId: string, tourId: string) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.id === collegeId
          ? {
              ...college,
              virtualTours: college.virtualTours.filter(
                (tour) => tour.id !== tourId
              ),
            }
          : college
      )
    );
  };

  // Handle deleting a college
  const handleDeleteCollege = (collegeId: string) => {
    setColleges((prev) => prev.filter((college) => college.id !== collegeId));
  };

  // Handle saving updates
  const handleSaveUpdates = () => {
    console.log("Updated Colleges:", colleges);
    alert("Changes saved successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Admin Virtual Campus Tours</h1>
        <p className="text-gray-600 mb-6">
          Manage college virtual tours and add new colleges
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
          <Button onClick={() => setIsAddCollegeDialogOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add College
          </Button>
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
                src={college.imageUrl || college.virtualTours?.[0]?.thumbnail}
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
                  Manage Tours
                </Button>
              </div>
              <button
                onClick={() => handleDeleteCollege(college.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <Trash className="h-4 w-4" />
              </button>
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

      {/* Dialog for managing tours */}
      <Dialog
        open={selectedCollege !== null}
        onOpenChange={(open) => !open && setSelectedCollege(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCollege?.name} - Manage Tours</DialogTitle>
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
                  No virtual tour available for this college.
                </p>
              </div>
            )}
          </div>
          {selectedCollege?.virtualTours &&
            selectedCollege.virtualTours.length > 0 && (
              <div className="flex gap-4 mt-4">
                {selectedCollege.virtualTours.map((tour, index) => (
                  <div key={tour.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tour.url}
                      onChange={(e) =>
                        handleUpdateTourUrl(
                          selectedCollege.id,
                          tour.id,
                          e.target.value
                        )
                      }
                      className="px-2 py-1 border rounded-md"
                    />
                    <button
                      onClick={() => setSelectedTourIndex(index)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedTourIndex === index
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {tour.title}
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteTour(selectedCollege.id, tour.id)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          <div className="mt-4">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleUploadVideo(
                    selectedCollege?.id || "",
                    e.target.files[0]
                  );
                }
              }}
              className="mb-4"
            />
            <Button onClick={() => setIsAddTourDialogOpen(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Add New Tour
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedCollege(null)}>
              <X className="h-5 w-5 mr-2" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding a new college */}
      <Dialog
        open={isAddCollegeDialogOpen}
        onOpenChange={setIsAddCollegeDialogOpen}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New College</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 bg-white">
            <Input
              placeholder="College Name"
              value={newCollege.name}
              onChange={(e) =>
                setNewCollege({ ...newCollege, name: e.target.value })
              }
            />
            <Input
              placeholder="Location"
              value={newCollege.location}
              onChange={(e) =>
                setNewCollege({ ...newCollege, location: e.target.value })
              }
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const imageUrl = URL.createObjectURL(file);
                  setNewCollege({ ...newCollege, imageUrl });
                }
              }}
            />
            <DialogFooter>
              <Button onClick={handleAddCollege}>Add College</Button>
              <Button
                variant="outline"
                onClick={() => setIsAddCollegeDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding a new tour */}
      <Dialog open={isAddTourDialogOpen} onOpenChange={setIsAddTourDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Tour</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 bg-white">
            <Input
              placeholder="Tour Title"
              value={newTour.title}
              onChange={(e) =>
                setNewTour({ ...newTour, title: e.target.value })
              }
            />
            <Input
              placeholder="Tour URL"
              value={newTour.url}
              onChange={(e) => setNewTour({ ...newTour, url: e.target.value })}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const thumbnail = URL.createObjectURL(file);
                  setNewTour({ ...newTour, thumbnail });
                }
              }}
            />
            <DialogFooter>
              <Button onClick={handleAddTour}>Add Tour</Button>
              <Button
                variant="outline"
                onClick={() => setIsAddTourDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Update Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4">
        <div className="container mx-auto flex justify-end">
          <Button onClick={handleSaveUpdates}>
            <Save className="h-5 w-5 mr-2" />
            Save Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminVirtualTours;
