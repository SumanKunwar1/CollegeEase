import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { sessions } from "../../data/groupsession"; // Assuming you have a sessions array
import { Button } from "../../components/ui/button";
import { Star } from "lucide-react";

const GroupSessionsFeedback = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // State to store selected session
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");

  // State for the rating
  const [rating, setRating] = useState<number>(0);

  // State to store feedback for each session
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  // Function to handle feedback submission
  const handleFeedbackSubmit = (
    sessionId: string,
    name: string,
    rating: number,
    feedback: string
  ) => {
    // Store feedback for a session (You can send it to a backend if needed)
    setFeedbacks([...feedbacks, { sessionId, name, rating, feedback }]);
    alert("Thank you for your feedback!");

    // Redirect to the "/mentorship/group-session/" page after submission
    navigate("/mentorship/group-session/");
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
            Learn together in interactive group sessions led by experienced
            mentors.
          </p>
        </div>

        {/* Feedback Form */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Give Your Feedback
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = (e.target as any).name.value;
            const feedback = (e.target as any).feedback.value;
            handleFeedbackSubmit(selectedSessionId, name, rating, feedback);
          }}
        >
          {/* Session Selection */}
          <div className="mb-8">
            <label htmlFor="session" className="block text-gray-700 mb-2">
              Select Session
            </label>
            <select
              id="session"
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a session</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.title} - {session.date} at {session.time}
                </option>
              ))}
            </select>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Rating Section */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="rating">
              Rating (1 to 5)
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`transition-all duration-200 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <Star className="h-8 w-8 cursor-pointer" />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="feedback">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              className="w-full border border-gray-300 rounded-md p-2"
              rows={4}
              placeholder="Share your thoughts about the session..."
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-blue-600 text-white">
            Submit Feedback
          </Button>
        </form>

        {/* Display Selected Session Title */}
        {selectedSessionId && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Your feedback will be for the session:{" "}
              {
                sessions.find(
                  (session) => session.id.toString() === selectedSessionId
                )?.title
              }
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSessionsFeedback;
