import { Calendar, Users, Clock, Star } from "lucide-react";
import { sessions, featuresList } from "../../data/groupsession";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const GroupSessions = () => {
  // Extracting only the required data from sessions
  const upcomingSessions = sessions.map(
    ({
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
    }) => ({
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
    })
  );
  const navigate = useNavigate();

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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuresList.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Upcoming Sessions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-duration-300"
            >
              <img
                src={session.imageUrl}
                alt={session.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {session.title}
                </h3>
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

                <div className="flex flex-wrap gap-2 mb-6">
                  {session.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {session.price}
                  </span>
                  <button
                    onClick={
                      () => navigate(`/mentorship/group-session/${session.id}`) // Navigate with the session id
                    }
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Past Session Reviews */}
      <div className="mt-16 pl-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          What Participants Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sessions
            .flatMap((session) => session.reviews)
            .map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{review.text}"</p>
                <p className="font-semibold text-gray-900">{review.author}</p>
              </div>
            ))}
        </div>
        <div className="bg-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Group Session Experince!
          </h2>
          <p className="text-gray-600 mb-6">
            Have you recently won a scholarship? Share your story to inspire and
            help other students!
          </p>
          <Button
            onClick={() => navigate(`/mentorship/group-session/feedback`)}
            size="lg"
          >
            Submit Your Group Session Experince
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupSessions;
