import {
  MapPin,
  GraduationCap,
  Clock,
  DollarSign,
  BookOpen,
  Star,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Mentor } from "../../types/mentor";

function FindMentorDetails() {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await apiClient.get(`/mentors/${id}`);
        setMentor(response.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch mentor:", error);
        setError("Failed to load mentor details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMentor();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading mentor details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Mentor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-8">
            <img
              src={mentor.imageUrl}
              alt={mentor.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{mentor.name}</h1>
              <p className="text-xl opacity-90">{mentor.title}</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>{mentor.university}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{mentor.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{mentor.bio}</p>
            </section>

            {/* Expertise Section */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Areas of Expertise</h2>
              <div className="grid grid-cols-2 gap-4">
                {mentor.expertise.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>{item.skill}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
              {mentor.testimonials.length === 0 ? (
                <p className="text-gray-500">No testimonials yet</p>
              ) : (
                <div className="space-y-6">
                  {mentor.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <div className="flex items-center gap-1 text-yellow-400 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.text}"</p>
                      <p className="mt-2 font-semibold">
                        - {testimonial.author}, {testimonial.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Availability</p>
                    <p className="text-gray-600">{mentor.availability}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Session Price</p>
                    <p className="text-gray-600">
                      ${mentor.pricePerHour}/hour
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      `/mentorship/find-mentor/${mentor._id}/book-a-session`
                    )
                  }
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Book Session
                </button>
              </div>
            </div>

            {/* Mentoring Style */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Mentoring Style</h3>
              {mentor.mentorStyle.length === 0 ? (
                <p className="text-gray-500">No mentoring style specified</p>
              ) : (
                <div className="space-y-3">
                  {mentor.mentorStyle.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>{item.style}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindMentorDetails;