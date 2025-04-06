import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookSession = () => {
  const { id: mentorId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);
    setError("");

    try {
      const apiClient = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
      });

      const response = await apiClient.post(`/mentors/${mentorId}/bookings`, formData);

      // Show success message and redirect
      alert("Booking successful!");
      navigate(`/mentorship/find-mentor/${mentorId}`);
    } catch (err) {
      setError("Failed to book session. Please try again.");
      console.error("Booking error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.studentName &&
      formData.studentEmail &&
      formData.date &&
      formData.time
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Book a Session
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email *
            </label>
            <input
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Any specific topics or questions?"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
          className={`mt-6 w-full py-2 rounded-lg transition ${
            isFormValid() && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 cursor-not-allowed text-gray-500"
          }`}
        >
          {isLoading ? 'Booking...' : 'Confirm Booking'}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-3 w-full text-gray-600 border py-2 rounded-lg hover:bg-gray-100 transition"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookSession;