import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mentorData } from "../../data/findmentor"; // Importing mentor data

const BookSession = () => {
  const { id } = useParams(); // Get mentor ID from URL
  const navigate = useNavigate();

  // Get the selected mentor based on ID
  const mentor = mentorData.id === id ? mentorData : null;

  // State for booking details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!mentor) {
    return (
      <div className="text-center py-20 text-red-500">Mentor not found.</div>
    );
  }

  const handleSubmit = () => {
    alert(
      `Session booked with ${mentor.name}\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Date: ${formData.date}\n` +
        `Time: ${formData.time}\n` +
        `Notes: ${formData.notes}`
    );
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.date &&
      formData.time
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Book a Session with {mentor.name}
        </h2>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={mentor.imageUrl}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{mentor.title}</p>
            <p className="text-gray-600">{mentor.university}</p>
            <p className="text-blue-600 font-semibold">
              ${mentor.pricePerHour}/hour
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Personal Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Session Details */}
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
              placeholder="Any specific topics or questions you'd like to discuss?"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className={`mt-6 w-full py-2 rounded-lg transition ${
            isFormValid()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 cursor-not-allowed text-gray-500"
          }`}
        >
          Confirm Booking
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-3 w-full text-gray-600 border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookSession;
