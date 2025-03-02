import React from "react";
import { Calendar, Clock, Users, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

import { sessions } from "../../data/groupsession";

const GroupSessionDetails: React.FC = () => {
  const { id } = useParams(); // Use useParams to get the session id from the URL

  // Find the session by id
  const session = sessions.find((session) => session.id === parseInt(id!));
  const navigate = useNavigate();

  if (!session) {
    return <div>Session not found</div>; // In case the session doesn't exist
  }

  const {
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
    features,
    reviews,
  } = session;

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
                  onClick={() =>
                    navigate(`/mentorship/group-session/${session.id}/register`)
                  }
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Register Now
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="border-t border-gray-200 p-6">
            <h4 className="text-xl font-semibold mb-6">Session Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="p-3 bg-blue-100 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h5 className="font-semibold mb-2">{feature.title}</h5>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 p-6">
            <h4 className="text-xl font-semibold mb-6">
              What Participants Say
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">"{review.text}"</p>
                  <p className="font-semibold text-sm">{review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupSessionDetails;
