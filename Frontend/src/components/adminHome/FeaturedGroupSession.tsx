import type React from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { featuredSession } from "../../data/featuredGroupSession";
import { useNavigate } from "react-router-dom";

const FeaturedGroupSession: React.FC = () => {
  const {
    id,
    title,
    mentor,
    date,
    time,
    duration,
    participants,
    price,
    tags,
    imageUrl,
    description,
  } = featuredSession;
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Group Session
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">Led by {mentor}</p>

              <p className="text-gray-700 mb-4">{description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {date}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {time} ({duration})
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {participants} participants max
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
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
                  {price}
                </span>
                <button
                  onClick={() => {
                    navigate(`/mentorship/group-session/${id}/register`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Register Now
                </button>
              </div>

              <a
                href="/mentorship/group-session"
                className="text-blue-600 hover:underline"
              >
                View all upcoming sessions
              </a>
            </div>
            <div className="md:w-1/2">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGroupSession;
