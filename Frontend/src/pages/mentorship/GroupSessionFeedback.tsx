import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Star } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface Session {
  _id: string;
  title: string;
  date: string;
  time: string;
}

const GroupSessionsFeedback = () => {
  const navigate = useNavigate();
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/group-sessions`);
        setSessions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        toast.error("Failed to load sessions");
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const feedback = formData.get("feedback") as string;

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/feedback`, {
        sessionId: selectedSessionId,
        name,
        rating,
        feedback
      });

      toast.success("Thank you for your feedback!");
      form.reset();
      setRating(0);
      navigate("/mentorship/group-session");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <p>Loading sessions...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Group Session Feedback</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We value your feedback to improve our group sessions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Select Session</label>
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
              disabled={isSubmitting}
            >
              <option value="">Select a session</option>
              {sessions.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.title} - {session.date} at {session.time}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="mr-2"
                  disabled={isSubmitting}
                >
                  <Star className={`h-8 w-8 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Your Feedback</label>
            <textarea
              name="feedback"
              className="w-full border border-gray-300 rounded-md p-2"
              rows={4}
              placeholder="Share your thoughts..."
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !selectedSessionId}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GroupSessionsFeedback;