"use client";

import type React from "react";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Star,
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

interface SessionFeature {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

interface SessionReview {
  author: string;
  text: string;
  rating: number;
}

interface GroupSession {
  id: number;
  title: string;
  mentor: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  price: string;
  tags: string[];
  imageUrl: string;
  description: string;
  features: SessionFeature[];
  reviews: SessionReview[];
}

export function AdminGroupSessionsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSession, setEditingSession] = useState<GroupSession | null>(
    null
  );

  // Mock icons for features
  const featureIcons = {
    Users: Users,
    Calendar: Calendar,
    Clock: Clock,
    Star: Star,
  };

  const [sessions, setSessions] = useState<GroupSession[]>([
    {
      id: 1,
      title: "College Application Strategy Workshop",
      mentor: "Dr. Sarah Johnson",
      date: "November 15, 2023",
      time: "4:00 PM - 6:00 PM EST",
      duration: "2 hours",
      participants: 20,
      price: "$49.99",
      tags: ["College Applications", "Strategy", "Admissions"],
      imageUrl:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      description:
        "Join Dr. Johnson for a comprehensive workshop on developing a winning college application strategy. Learn how to highlight your strengths, select the right schools, and craft compelling personal statements.",
      features: [
        {
          title: "Interactive Format",
          description:
            "Engage in real-time with the mentor and other participants",
          icon: Users,
        },
        {
          title: "Take-Home Resources",
          description: "Receive worksheets and templates to continue your work",
          icon: Calendar,
        },
        {
          title: "Q&A Session",
          description: "Get your specific questions answered by an expert",
          icon: Clock,
        },
        {
          title: "Recording Access",
          description: "Rewatch the session for 30 days after the event",
          icon: Star,
        },
      ],
      reviews: [
        {
          author: "Michael Chen",
          text: "This workshop completely changed my approach to college applications. Dr. Johnson provided insights I hadn't found anywhere else.",
          rating: 5,
        },
        {
          author: "Jessica Rodriguez",
          text: "The interactive format made this so much more valuable than just watching videos. Highly recommend!",
          rating: 4,
        },
        {
          author: "David Kim",
          text: "Worth every penny. I feel much more confident about my application strategy now.",
          rating: 5,
        },
      ],
    },
    {
      id: 2,
      title: "Essay Writing Masterclass",
      mentor: "Professor Robert Williams",
      date: "November 22, 2023",
      time: "5:00 PM - 7:30 PM EST",
      duration: "2.5 hours",
      participants: 15,
      price: "$59.99",
      tags: ["Essay Writing", "Personal Statement", "Admissions"],
      imageUrl:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
      description:
        "Craft a compelling personal statement that stands out to admissions committees. Professor Williams will guide you through the entire process from brainstorming to final edits.",
      features: [
        {
          title: "Personalized Feedback",
          description:
            "Submit your essay outline for review during the session",
          icon: Users,
        },
        {
          title: "Example Analysis",
          description: "Study successful essays from past applicants",
          icon: Calendar,
        },
        {
          title: "Writing Exercises",
          description: "Practice techniques with guided prompts",
          icon: Clock,
        },
        {
          title: "Follow-up Resources",
          description: "Access to editing checklist and style guide",
          icon: Star,
        },
      ],
      reviews: [
        {
          author: "Emily Patel",
          text: "Professor Williams' insights transformed my essay from good to outstanding. The examples he shared were incredibly helpful.",
          rating: 5,
        },
        {
          author: "James Wilson",
          text: "The writing exercises helped me break through my writer's block. Great session!",
          rating: 4,
        },
      ],
    },
  ]);

  const [newSession, setNewSession] = useState<Omit<GroupSession, "id">>({
    title: "",
    mentor: "",
    date: "",
    time: "",
    duration: "",
    participants: 0,
    price: "",
    tags: [],
    imageUrl: "",
    description: "",
    features: [],
    reviews: [],
  });

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof GroupSession
  ) => {
    if (editingSession) {
      setEditingSession({
        ...editingSession,
        [field]:
          field === "participants" ? Number(e.target.value) : e.target.value,
      });
    } else {
      setNewSession({
        ...newSession,
        [field]:
          field === "participants" ? Number(e.target.value) : e.target.value,
      });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tagsArray = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (editingSession) {
      setEditingSession({
        ...editingSession,
        tags: tagsArray,
      });
    } else {
      setNewSession({
        ...newSession,
        tags: tagsArray,
      });
    }
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const featuresArray = JSON.parse(e.target.value);

      if (Array.isArray(featuresArray)) {
        // Convert icon strings to actual icon components
        const processedFeatures = featuresArray.map((feature) => ({
          ...feature,
          icon:
            featureIcons[feature.icon as keyof typeof featureIcons] || Users,
        }));

        if (editingSession) {
          setEditingSession({
            ...editingSession,
            features: processedFeatures,
          });
        } else {
          setNewSession({
            ...newSession,
            features: processedFeatures,
          });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If JSON parsing fails, don't update the state
      console.error("Invalid JSON format for features");
    }
  };

  const handleReviewsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const reviewsArray = JSON.parse(e.target.value);

      if (Array.isArray(reviewsArray)) {
        if (editingSession) {
          setEditingSession({
            ...editingSession,
            reviews: reviewsArray,
          });
        } else {
          setNewSession({
            ...newSession,
            reviews: reviewsArray,
          });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If JSON parsing fails, don't update the state
      console.error("Invalid JSON format for reviews");
    }
  };

  const handleAddSession = () => {
    const id =
      sessions.length > 0 ? Math.max(...sessions.map((s) => s.id)) + 1 : 1;
    const sessionToAdd = { id, ...newSession };

    setSessions([...sessions, sessionToAdd]);
    setNewSession({
      title: "",
      mentor: "",
      date: "",
      time: "",
      duration: "",
      participants: 0,
      price: "",
      tags: [],
      imageUrl: "",
      description: "",
      features: [],
      reviews: [],
    });
    setShowAddForm(false);

    toast({
      title: "Session added",
      description: "The group session has been added successfully.",
    });
  };

  const handleUpdateSession = () => {
    if (!editingSession) return;

    setSessions(
      sessions.map((session) =>
        session.id === editingSession.id ? editingSession : session
      )
    );
    setEditingSession(null);

    toast({
      title: "Session updated",
      description: "The group session has been updated successfully.",
    });
  };

  const handleDeleteSession = (id: number) => {
    setSessions(sessions.filter((session) => session.id !== id));

    toast({
      title: "Session deleted",
      description: "The group session has been deleted successfully.",
    });
  };

  // Helper function to prepare features for JSON editing
  const prepareFeatures = (features: SessionFeature[]) => {
    return features.map((feature) => {
      // Convert icon component to string name
      const iconName =
        Object.keys(featureIcons).find(
          (key) =>
            featureIcons[key as keyof typeof featureIcons] === feature.icon
        ) || "Users";

      return {
        title: feature.title,
        description: feature.description,
        icon: iconName,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Group Sessions
          </h1>
          <div className="flex gap-4">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Session
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
              placeholder="Search sessions by title, mentor, or tags..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingSession) && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingSession
                  ? "Edit Group Session"
                  : "Add New Group Session"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <Input
                    value={
                      editingSession ? editingSession.title : newSession.title
                    }
                    onChange={(e) => handleInputChange(e, "title")}
                    placeholder="Session title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mentor
                  </label>
                  <Input
                    value={
                      editingSession ? editingSession.mentor : newSession.mentor
                    }
                    onChange={(e) => handleInputChange(e, "mentor")}
                    placeholder="Mentor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    value={
                      editingSession ? editingSession.date : newSession.date
                    }
                    onChange={(e) => handleInputChange(e, "date")}
                    placeholder="e.g., November 15, 2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <Input
                    value={
                      editingSession ? editingSession.time : newSession.time
                    }
                    onChange={(e) => handleInputChange(e, "time")}
                    placeholder="e.g., 4:00 PM - 6:00 PM EST"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <Input
                    value={
                      editingSession
                        ? editingSession.duration
                        : newSession.duration
                    }
                    onChange={(e) => handleInputChange(e, "duration")}
                    placeholder="e.g., 2 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Participants
                  </label>
                  <Input
                    type="number"
                    value={
                      editingSession
                        ? editingSession.participants
                        : newSession.participants
                    }
                    onChange={(e) => handleInputChange(e, "participants")}
                    placeholder="Maximum number of participants"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <Input
                    value={
                      editingSession ? editingSession.price : newSession.price
                    }
                    onChange={(e) => handleInputChange(e, "price")}
                    placeholder="e.g., $49.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <Input
                    value={
                      editingSession
                        ? editingSession.imageUrl
                        : newSession.imageUrl
                    }
                    onChange={(e) => handleInputChange(e, "imageUrl")}
                    placeholder="URL for session image"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={
                      editingSession
                        ? editingSession.description
                        : newSession.description
                    }
                    onChange={(e) => handleInputChange(e, "description")}
                    placeholder="Session description"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <Textarea
                    value={
                      editingSession
                        ? editingSession.tags.join(", ")
                        : newSession.tags.join(", ")
                    }
                    onChange={handleTagsChange}
                    placeholder="e.g., College Applications, Strategy, Admissions"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features (JSON format)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Available icons: Users, Calendar, Clock, Star
                  </p>
                  <Textarea
                    value={
                      editingSession
                        ? JSON.stringify(
                            prepareFeatures(editingSession.features),
                            null,
                            2
                          )
                        : JSON.stringify(
                            prepareFeatures(newSession.features),
                            null,
                            2
                          )
                    }
                    onChange={handleFeaturesChange}
                    placeholder='[{"title": "Feature Title", "description": "Feature description", "icon": "Users"}]'
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reviews (JSON format)
                  </label>
                  <Textarea
                    value={
                      editingSession
                        ? JSON.stringify(editingSession.reviews, null, 2)
                        : JSON.stringify(newSession.reviews, null, 2)
                    }
                    onChange={handleReviewsChange}
                    placeholder='[{"author": "Name", "text": "Review text", "rating": 5}]'
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
                    setEditingSession(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    editingSession ? handleUpdateSession : handleAddSession
                  }
                >
                  <Save className="mr-2 h-4 w-4" />
                  {editingSession ? "Update Session" : "Add Session"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sessions List */}
        <div className="space-y-6 mb-8">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No sessions found. Try a different search or add a new session.
              </p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <Card key={session.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={session.imageUrl || "/placeholder.svg"}
                        alt={session.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-semibold mb-2">
                        {session.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Led by {session.mentor}
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {session.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {session.time} ({session.duration})
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {session.participants} participants max
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {session.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                          {session.price}
                        </span>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSession(session)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSession(session.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
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
                description:
                  "All group sessions have been updated successfully.",
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
