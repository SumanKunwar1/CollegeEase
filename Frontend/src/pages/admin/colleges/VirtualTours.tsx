"use client"

import { useState, useEffect } from "react"
import { Search, Play, Plus, Save, Trash, Link, ExternalLink } from "lucide-react"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Label } from "../../../components/ui/label"
import type { College, VirtualTour } from "../../../types/virtualTour"
import {
  fetchColleges,
  createCollege as apiCreateCollege,
  deleteCollege as apiDeleteCollege,
  addVirtualTour as apiAddVirtualTour,
  updateVirtualTour as apiUpdateVirtualTour,
  deleteVirtualTour as apiDeleteVirtualTour,
  fetchLocations
} from "../../../services/virtualTour.service"

const AdminVirtualTours = () => {
  const [colleges, setColleges] = useState<College[]>([])
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [selectedTourIndex, setSelectedTourIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [isAddCollegeDialogOpen, setIsAddCollegeDialogOpen] = useState(false)
  const [isAddTourDialogOpen, setIsAddTourDialogOpen] = useState(false)
  const [newCollege, setNewCollege] = useState<Partial<College>>({
    organizationName: "",
    location: "",
    virtualTours: [],
    imageUrl: "",
  })
  const [newTour, setNewTour] = useState<Partial<VirtualTour>>({
    title: "",
    url: "",
    thumbnail: "",
  })
  const [locations, setLocations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [collegesData, locationsData] = await Promise.all([
          fetchColleges(),
          fetchLocations()
        ]);
        setColleges(collegesData)
        setLocations(locationsData)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter colleges based on search and location
  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.organizationName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = locationFilter === "all" ? true : college.location.includes(locationFilter)
    return matchesSearch && matchesLocation
  })

  // Handle adding a new college
  const handleAddCollege = async () => {
    if (newCollege.organizationName && newCollege.location) {
      try {
        const createdCollege = await apiCreateCollege({
          organizationName: newCollege.organizationName,
          location: newCollege.location,
          imageUrl: newCollege.imageUrl || "",
          virtualTours: []
        })
        setColleges([...colleges, createdCollege])
        setIsAddCollegeDialogOpen(false)
        setNewCollege({ organizationName: "", location: "", virtualTours: [], imageUrl: "" })
      } catch (error) {
        console.error("Failed to add college:", error)
        alert("Failed to add college. Please try again.")
      }
    }
  }

  // Handle adding a new tour
  const handleAddTour = async () => {
    if (selectedCollege && newTour.title && newTour.url) {
      try {
        const updatedCollege = await apiAddVirtualTour(selectedCollege._id!, {
          title: newTour.title,
          url: newTour.url,
          thumbnail: newTour.thumbnail || ""
        })
        setColleges(colleges.map(c => c._id === updatedCollege._id ? updatedCollege : c))
        if (selectedCollege._id === updatedCollege._id) {
          setSelectedCollege(updatedCollege)
        }
        setIsAddTourDialogOpen(false)
        setNewTour({ title: "", url: "", thumbnail: "" })
      } catch (error) {
        console.error("Failed to add tour:", error)
        alert("Failed to add tour. Please try again.")
      }
    }
  }

  // Handle updating a virtual tour URL
  const handleUpdateTourUrl = async (collegeId: string, tourId: string, newUrl: string) => {
    try {
      const updatedCollege = await apiUpdateVirtualTour(collegeId, tourId, { url: newUrl })
      setColleges(colleges.map(c => c._id === collegeId ? updatedCollege : c))
      if (selectedCollege?._id === collegeId) {
        setSelectedCollege(updatedCollege)
      }
    } catch (error) {
      console.error("Failed to update tour URL:", error)
    }
  }

  // Handle updating a virtual tour title
  const handleUpdateTourTitle = async (collegeId: string, tourId: string, newTitle: string) => {
    try {
      const updatedCollege = await apiUpdateVirtualTour(collegeId, tourId, { title: newTitle })
      setColleges(colleges.map(c => c._id === collegeId ? updatedCollege : c))
      if (selectedCollege?._id === collegeId) {
        setSelectedCollege(updatedCollege)
      }
    } catch (error) {
      console.error("Failed to update tour title:", error)
    }
  }

  // Handle deleting a tour
  const handleDeleteTour = async (collegeId: string, tourId: string) => {
    try {
      const updatedCollege = await apiDeleteVirtualTour(collegeId, tourId)
      setColleges(colleges.map(c => c._id === collegeId ? updatedCollege : c))
      if (selectedCollege?._id === collegeId) {
        setSelectedCollege(updatedCollege)
      }
    } catch (error) {
      console.error("Failed to delete tour:", error)
      alert("Failed to delete tour. Please try again.")
    }
  }

  // Handle deleting a college
  const handleDeleteCollege = async (collegeId: string) => {
    try {
      await apiDeleteCollege(collegeId)
      setColleges(colleges.filter(c => c._id !== collegeId))
      if (selectedCollege?._id === collegeId) {
        setSelectedCollege(null)
      }
    } catch (error) {
      console.error("Failed to delete college:", error)
      alert("Failed to delete college. Please try again.")
    }
  }

  // Handle saving updates (no longer needed as we save immediately)
  const handleSaveUpdates = () => {
    alert("All changes are saved automatically!")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pb-24 flex justify-center items-center h-screen">
        <div className="text-center">
          <p>Loading colleges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Virtual Campus Tours</h1>
        <p className="text-gray-600 mb-6">Manage college virtual tours and add new colleges</p>

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
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by location" />
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
          <Button onClick={() => setIsAddCollegeDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-5 w-5 mr-2" />
            Add College
          </Button>
        </div>

        <div className="bg-muted/40 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Tip
            </Badge>
            <p>Click on "Manage Tours" to add or edit virtual tours for each college.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.length > 0 ? (
          filteredColleges.map((college) => (
            <Card key={college._id} className="overflow-hidden">
              <div className="relative h-48 bg-muted">
                <img
                  src={
                    college.imageUrl || college.virtualTours?.[0]?.thumbnail || "/placeholder.svg?height=192&width=384"
                  }
                  alt={college.organizationName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black transition-colors"
                    onClick={() => {
                      setSelectedCollege(college)
                      setSelectedTourIndex(0)
                    }}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Manage Tours
                  </Button>
                </div>
                <button
                  onClick={() => handleDeleteCollege(college._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Delete college"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
              <CardHeader>
                <CardTitle>{college.organizationName}</CardTitle>
                <CardDescription>{college.location}</CardDescription>
              </CardHeader>
              
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No colleges found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Dialog for managing tours */}
      <Dialog open={selectedCollege !== null} onOpenChange={(open) => !open && setSelectedCollege(null)}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedCollege?.organizationName} - Virtual Tours</DialogTitle>
            <DialogDescription>
              Manage virtual tours for this college. Add, edit, or remove tours as needed.
            </DialogDescription>
          </DialogHeader>

          <div className="aspect-video bg-muted rounded-md overflow-hidden">
            {selectedCollege?.virtualTours?.[selectedTourIndex]?.url ? (
              <iframe
                src={selectedCollege.virtualTours[selectedTourIndex].url}
                className="w-full h-full"
                allowFullScreen
                title="Virtual Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">No virtual tour available</p>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddTourDialogOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Tour
                  </Button>
                </div>
              </div>
            )}
          </div>

          {selectedCollege?.virtualTours && selectedCollege.virtualTours.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Available Tours</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddTourDialogOpen(true)}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Add Tour
                </Button>
              </div>

              <div className="grid gap-3 max-h-[200px] overflow-y-auto pr-1">
                {selectedCollege.virtualTours.map((tour, index) => (
                  <div
                    key={tour._id}
                    className={`p-3 border rounded-lg ${
                      selectedTourIndex === index ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelectedTourIndex(index)} className="font-medium text-left flex-1">
                            {tour.title}
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteTour(selectedCollege._id, tour._id)}
                          className="text-destructive hover:text-destructive/80"
                          aria-label="Delete tour"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`tour-title-${tour._id}`} className="w-16 text-xs text-muted-foreground">
                            Title:
                          </Label>
                          <Input
                            id={`tour-title-${tour._id}`}
                            value={tour.title}
                            onChange={(e) => handleUpdateTourTitle(selectedCollege._id, tour._id, e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor={`tour-url-${tour._id}`} className="w-16 text-xs text-muted-foreground">
                            URL:
                          </Label>
                          <div className="flex-1 flex items-center gap-1">
                            <div className="relative flex-1">
                              <Link className="absolute left-2 top-1.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id={`tour-url-${tour._id}`}
                                value={tour.url}
                                onChange={(e) => handleUpdateTourUrl(selectedCollege._id, tour._id, e.target.value)}
                                className="h-8 text-sm pl-8"
                                placeholder="https://www.youtube.com/embed/..."
                              />
                            </div>
                            <a
                              href={tour.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                              aria-label="Open URL in new tab"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setSelectedCollege(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding a new college */}
      <Dialog open={isAddCollegeDialogOpen} onOpenChange={setIsAddCollegeDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New College</DialogTitle>
            <DialogDescription>Enter the details for the new college you want to add.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="college-name">College Name</Label>
              <Input
                id="college-name"
                placeholder="e.g., Harvard University"
                value={newCollege.organizationName}
                onChange={(e) => setNewCollege({ ...newCollege, organizationName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="college-location">Location</Label>
              <Input
                id="college-location"
                placeholder="e.g., Cambridge, MA"
                value={newCollege.location}
                onChange={(e) => setNewCollege({ ...newCollege, location: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="college-image">College Image URL</Label>
              <Input
                id="college-image"
                placeholder="https://example.com/image.jpg"
                value={newCollege.imageUrl || ""}
                onChange={(e) => setNewCollege({ ...newCollege, imageUrl: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCollegeDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCollege} disabled={!newCollege.organizationName || !newCollege.location}>
                Add College
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding a new tour */}
      <Dialog open={isAddTourDialogOpen} onOpenChange={setIsAddTourDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Virtual Tour</DialogTitle>
            <DialogDescription>Add a new virtual tour by providing a title and URL.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="tour-title">Tour Title</Label>
              <Input
                id="tour-title"
                placeholder="e.g., Main Campus Tour"
                value={newTour.title}
                onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tour-url">Tour URL</Label>
              <div className="relative">
                <Link className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="tour-url"
                  placeholder="https://www.youtube.com/embed/..."
                  className="pl-10"
                  value={newTour.url}
                  onChange={(e) => setNewTour({ ...newTour, url: e.target.value })}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Use embedded video URLs (e.g., YouTube embed URLs) for best compatibility.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tour-thumbnail">Thumbnail URL (Optional)</Label>
              <Input
                id="tour-thumbnail"
                placeholder="https://example.com/thumbnail.jpg"
                value={newTour.thumbnail || ""}
                onChange={(e) => setNewTour({ ...newTour, thumbnail: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTourDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTour} disabled={!newTour.title || !newTour.url}>
                Add Tour
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Update Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 shadow-lg border-t p-4 z-10">
        <div className="container mx-auto flex justify-end">
          <Button onClick={handleSaveUpdates} className="bg-primary hover:bg-primary/90">
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminVirtualTours

