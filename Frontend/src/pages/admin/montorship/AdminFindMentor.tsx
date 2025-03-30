"use client";

import type React from "react";
import { useState } from "react";
import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Plus,
  Save,
  Trash,
  Edit,
  Search,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useToast } from "../../../components/ui/use-toast";

interface Expertise {
  skill: string;
}

interface MentorStyle {
  style: string;
}

interface Testimonial {
  author: string;
  title: string;
  text: string;
  rating: number;
}

interface Mentor {
  id: number;
  name: string;
  title: string;
  university: string;
  location: string;
  imageUrl: string;
  availability: string;
  pricePerHour: number;
  bio: string;
  expertise: Expertise[];
  mentorStyle: MentorStyle[];
  testimonials: Testimonial[];
}

export function AdminMentorsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);

  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: 1,
      name: "Dr. James Wilson",
      title: "Professor of Computer Science",
      university: "Stanford University",
      location: "Palo Alto, CA",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
      availability: "Weekdays after 4 PM PT",
      pricePerHour: 120,
      bio: "Dr. Wilson has over 15 years of experience in AI research and teaching. He has mentored dozens of students who have gone on to work at top tech companies and research labs.",
      expertise: [
        { skill: "Artificial Intelligence" },
        { skill: "Machine Learning" },
        { skill: "Computer Vision" },
        { skill: "Research Methodology" },
        { skill: "Academic Publishing" },
        { skill: "Graduate School Applications" },
      ],
      mentorStyle: [
        { style: "Project-based learning" },
        { style: "Research-oriented" },
        { style: "Career guidance" },
        { style: "Technical skill development" },
      ],
      testimonials: [
        {
          author: "Michael Chen",
          title: "PhD Student, MIT",
          text: "Dr. Wilson's guidance was instrumental in helping me get accepted to my dream PhD program. His insights into research methodology transformed my approach.",
          rating: 5,
        },
        {
          author: "Sarah Johnson",
          title: "Software Engineer, Google",
          text: "I wouldn't be where I am today without Dr. Wilson's mentorship. He helped me navigate complex technical challenges and prepare for industry interviews.",
          rating: 5,
        },
      ],
    },
    {
      id: 2,
      name: "Dr. Emily Rodriguez",
      title: "Associate Professor of Medicine",
      university: "Johns Hopkins University",
      location: "Baltimore, MD",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
      availability: "Weekends and Thursday evenings",
      pricePerHour: 150,
      bio: "Dr. Rodriguez is a board-certified physician with a passion for mentoring pre-med and medical students. She specializes in helping students navigate the complex medical school application process and succeed in their clinical rotations.",
      expertise: [
        { skill: "Medical School Applications" },
        { skill: "MCAT Preparation" },
        { skill: "Clinical Rotations" },
        { skill: "Research in Medicine" },
        { skill: "Residency Applications" },
      ],
      mentorStyle: [
        { style: "Personalized guidance" },
        { style: "Application strategy" },
        { style: "Interview preparation" },
        { style: "Clinical skills development" },
      ],
      testimonials: [
        {
          author: "David Kim",
          title: "Medical Student, Harvard",
          text: "Dr. Rodriguez's advice on my personal statement and interview preparation was invaluable. She knew exactly what admissions committees are looking for.",
          rating: 5,
        },
        {
          author: "Jessica Patel",
          title: "Resident, Mayo Clinic",
          text: "Throughout medical school, Dr. Rodriguez was my go-to mentor for advice on rotations and residency applications. Her guidance made all the difference.",
          rating: 4,
        },
      ],
    },
  ]);

  const [newMentor, setNewMentor] = useState<Omit<Mentor, "id">>({
    name: "",
    title: "",
    university: "",
    location: "",
    imageUrl: "",
    availability: "",
    pricePerHour: 0,
    bio: "",
    expertise: [],
    mentorStyle: [],
    testimonials: [],
  });

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((e) =>
        e.skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Mentor
  ) => {
    if (editingMentor) {
      setEditingMentor({
        ...editingMentor,
        [field]:
          field === "pricePerHour" ? Number(e.target.value) : e.target.value,
      });
    } else {
      setNewMentor({
        ...newMentor,
        [field]:
          field === "pricePerHour" ? Number(e.target.value) : e.target.value,
      });
    }
  };

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const expertiseArray = e.target.value
      .split("\n")
      .filter((skill) => skill.trim() !== "")
      .map((skill) => ({ skill: skill.trim() }));

    if (editingMentor) {
      setEditingMentor({
        ...editingMentor,
        expertise: expertiseArray,
      });
    } else {
      setNewMentor({
        ...newMentor,
        expertise: expertiseArray,
      });
    }
  };

  const handleMentorStyleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const styleArray = e.target.value
      .split("\n")
      .filter((style) => style.trim() !== "")
      .map((style) => ({ style: style.trim() }));

    if (editingMentor) {
      setEditingMentor({
        ...editingMentor,
        mentorStyle: styleArray,
      });
    } else {
      setNewMentor({
        ...newMentor,
        mentorStyle: styleArray,
      });
    }
  };

  const handleTestimonialsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    try {
      const testimonialsArray = JSON.parse(e.target.value);

      if (Array.isArray(testimonialsArray)) {
        if (editingMentor) {
          setEditingMentor({
            ...editingMentor,
            testimonials: testimonialsArray,
          });
        } else {
          setNewMentor({
            ...newMentor,
            testimonials: testimonialsArray,
          });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If JSON parsing fails, don't update the state
      console.error("Invalid JSON format for testimonials");
    }
  };

  const handleAddMentor = () => {
    const id =
      mentors.length > 0 ? Math.max(...mentors.map((m) => m.id)) + 1 : 1;
    const mentorToAdd = { id, ...newMentor };

    setMentors([...mentors, mentorToAdd]);
    setNewMentor({
      name: "",
      title: "",
      university: "",
      location: "",
      imageUrl: "",
      availability: "",
      pricePerHour: 0,
      bio: "",
      expertise: [],
      mentorStyle: [],
      testimonials: [],
    });
    setShowAddForm(false);

    toast({
      title: "Mentor added",
      description: "The mentor has been added successfully.",
    });
  };

  const handleUpdateMentor = () => {
    if (!editingMentor) return;

    setMentors(
      mentors.map((mentor) =>
        mentor.id === editingMentor.id ? editingMentor : mentor
      )
    );
    setEditingMentor(null);

    toast({
      title: "Mentor updated",
      description: "The mentor has been updated successfully.",
    });
  };

  const handleDeleteMentor = (id: number) => {
    setMentors(mentors.filter((mentor) => mentor.id !== id));

    toast({
      title: "Mentor deleted",
      description: "The mentor has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Mentors
          </h1>
          <div className="flex gap-4">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Mentor
            </Button>
            <a href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search mentors by name, title, university, or expertise..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingMentor) && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingMentor ? "Edit Mentor" : "Add New Mentor"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    value={editingMentor ? editingMentor.name : newMentor.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <Input
                    value={
                      editingMentor ? editingMentor.title : newMentor.title
                    }
                    onChange={(e) => handleInputChange(e, "title")}
                    placeholder="Professional title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University
                  </label>
                  <Input
                    value={
                      editingMentor
                        ? editingMentor.university
                        : newMentor.university
                    }
                    onChange={(e) => handleInputChange(e, "university")}
                    placeholder="University or institution"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <Input
                    value={
                      editingMentor
                        ? editingMentor.location
                        : newMentor.location
                    }
                    onChange={(e) => handleInputChange(e, "location")}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <Input
                    value={
                      editingMentor
                        ? editingMentor.imageUrl
                        : newMentor.imageUrl
                    }
                    onChange={(e) => handleInputChange(e, "imageUrl")}
                    placeholder="URL for profile image"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <Input
                    value={
                      editingMentor
                        ? editingMentor.availability
                        : newMentor.availability
                    }
                    onChange={(e) => handleInputChange(e, "availability")}
                    placeholder="e.g., Weekdays after 4 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Hour ($)
                  </label>
                  <Input
                    type="number"
                    value={
                      editingMentor
                        ? editingMentor.pricePerHour
                        : newMentor.pricePerHour
                    }
                    onChange={(e) => handleInputChange(e, "pricePerHour")}
                    placeholder="Hourly rate"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <Textarea
                    value={editingMentor ? editingMentor.bio : newMentor.bio}
                    onChange={(e) => handleInputChange(e, "bio")}
                    placeholder="Professional biography"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expertise (one per line)
                  </label>
                  <Textarea
                    value={
                      editingMentor
                        ? editingMentor.expertise.map((e) => e.skill).join("\n")
                        : newMentor.expertise.map((e) => e.skill).join("\n")
                    }
                    onChange={handleExpertiseChange}
                    placeholder="Enter areas of expertise, one per line"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mentoring Style (one per line)
                  </label>
                  <Textarea
                    value={
                      editingMentor
                        ? editingMentor.mentorStyle
                            .map((s) => s.style)
                            .join("\n")
                        : newMentor.mentorStyle.map((s) => s.style).join("\n")
                    }
                    onChange={handleMentorStyleChange}
                    placeholder="Enter mentoring styles, one per line"
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonials (JSON format)
                  </label>
                  <Textarea
                    value={
                      editingMentor
                        ? JSON.stringify(editingMentor.testimonials, null, 2)
                        : JSON.stringify(newMentor.testimonials, null, 2)
                    }
                    onChange={handleTestimonialsChange}
                    placeholder='[{"author": "Name", "title": "Title", "text": "Testimonial text", "rating": 5}]'
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingMentor(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingMentor ? handleUpdateMentor : handleAddMentor}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {editingMentor ? "Update Mentor" : "Add Mentor"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mentors List */}
        <div className="space-y-6 mb-8">
          {filteredMentors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No mentors found. Try a different search or add a new mentor.
              </p>
            </div>
          ) : (
            filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4 flex flex-col items-center">
                      <img
                        src={mentor.imageUrl || "/placeholder.svg"}
                        alt={mentor.name}
                        className="w-32 h-32 rounded-full object-cover mb-4"
                      />
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.title}</p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <GraduationCap className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{mentor.university}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                          <span>${mentor.pricePerHour}/hour</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{mentor.availability}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{mentor.bio}</p>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Expertise:</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((item, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                            >
                              {item.skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingMentor(mentor)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteMentor(mentor.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="sticky bottom-6 bg-white p-4 rounded-lg shadow-lg border flex justify-end">
          <Button
            onClick={() =>
              toast({
                title: "Changes saved",
                description: "All mentors have been updated successfully.",
              })
            }
            className="w-full md:w-auto"
          >
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
