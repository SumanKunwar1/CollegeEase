import { MessageCircle, Users, School, BookOpen } from "lucide-react";

const ConnectPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Connect with the Community
          </h1>
          <p className="mt-2 text-gray-600">
            Join discussions, get advice, and share experiences with students,
            alumni, and institutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Discussion Forums
            </h3>
            <p className="text-gray-600 mb-4">
              Engage in meaningful conversations about college life, academics,
              and career paths.
            </p>
            <button className="text-purple-600 font-medium hover:text-purple-700">
              Join Discussions →
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Alumni Network
            </h3>
            <p className="text-gray-600 mb-4">
              Connect with graduates who've walked your path and learn from
              their experiences.
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              Meet Alumni →
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <School className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Institution Connect
            </h3>
            <p className="text-gray-600 mb-4">
              Direct communication channel with college representatives and
              admissions officers.
            </p>
            <button className="text-green-600 font-medium hover:text-green-700">
              Talk to Institutions →
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
              <BookOpen className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Study Groups
            </h3>
            <p className="text-gray-600 mb-4">
              Form or join study groups with peers in your field of interest.
            </p>
            <button className="text-red-600 font-medium hover:text-red-700">
              Find Groups →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Virtual College Fair",
                date: "March 15, 2024",
                time: "10:00 AM - 4:00 PM EST",
                description:
                  "Meet representatives from top colleges and universities virtually.",
              },
              {
                title: "Alumni Career Panel",
                date: "March 20, 2024",
                time: "6:00 PM - 8:00 PM EST",
                description:
                  "Learn about different career paths from successful alumni.",
              },
              {
                title: "Scholarship Workshop",
                date: "March 25, 2024",
                time: "2:00 PM - 3:30 PM EST",
                description:
                  "Tips and strategies for finding and applying to scholarships.",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                  <div className="mt-2 text-sm text-indigo-600">
                    {event.date} • {event.time}
                  </div>
                </div>
                <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-gray-600 mb-6">
              Our community managers are here to help you make the most of your
              connections.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
