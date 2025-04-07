import { Calendar, Users, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface GroupSession {
  _id: string;
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
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

interface Feedback {
  _id: string;
  sessionId: string;
  name: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

const GroupSessions = () => {
  const [sessions, setSessions] = useState<GroupSession[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch sessions
        const sessionsResponse = await apiClient.get("/group-sessions");
        setSessions(sessionsResponse.data);
        
        // Fetch feedbacks
        const feedbackResponse = await apiClient.get("/feedback");
        if (feedbackResponse.data && feedbackResponse.data.data) {
          setFeedbacks(feedbackResponse.data.data);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <p>Loading sessions...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <p className="text-red-500">{error}</p>
    </div>;
  }

  // Get session title by ID
  const getSessionTitle = (sessionId: string) => {
    const session = sessions.find(s => s._id === sessionId);
    return session ? session.title : "Group Session";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Expert-Led Group Sessions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn together in interactive group sessions led by experienced mentors.
          </p>
        </div>

        {/* Upcoming Sessions */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Upcoming Sessions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <div key={session._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-duration-300">
              <img src={session.imageUrl || "/placeholder.svg"} alt={session.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{session.title}</h3>
                <p className="text-gray-600 mb-4">Led by {session.mentor}</p>
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
                <Button onClick={() => navigate(`/mentorship/group-session/${session._id}`)} className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">What Participants Say</h2>
          
          {feedbacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {feedbacks.slice(0, 6).map((feedback) => (
                <div key={feedback._id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{getSessionTitle(feedback.sessionId)}</p>
                  <p className="text-gray-600 mb-4">"{feedback.feedback}"</p>
                  <p className="font-semibold text-gray-900">{feedback.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No feedback available yet.</p>
          )}

          <div className="bg-indigo-50 rounded-lg p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Experience!</h2>
            <Button onClick={() => navigate("/mentorship/group-session/feedback")} size="lg">
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSessions;