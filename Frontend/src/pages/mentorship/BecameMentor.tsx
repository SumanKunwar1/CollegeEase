import { Users, Award, Briefcase, CheckCircle, Heart } from "lucide-react";

const BecomeMentorPage = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Make an Impact",
      description:
        "Help shape the next generation of professionals and make a lasting difference in students' lives.",
    },
    {
      icon: Award,
      title: "Grow Your Network",
      description:
        "Connect with other mentors and expand your professional network across industries.",
    },
    {
      icon: Briefcase,
      title: "Flexible Schedule",
      description:
        "Choose your own hours and mentor students according to your availability.",
    },
    {
      icon: Users,
      title: "Build Leadership",
      description:
        "Develop your leadership and coaching skills while helping others grow.",
    },
  ];

  const requirements = [
    "Must be an alumni or current student of the particular college",
    "Strong communication skills",
    "Commitment to at least 4 hours per month",
    "Passion for helping others succeed",
    "Ability to submit support documents, such as recent transcripts, or a letter of recommendation from the college",
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Experience, Shape Future Leaders
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of mentors and help guide the next generation of
            professionals.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-100 rounded-lg mb-4">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Requirements Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Requirements
            </h2>
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Apply to Become a Mentor
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  College Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your college email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Experience
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Tell us about your professional experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current College Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your current college name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Areas of Expertise
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Computer Science, Business, Medicine"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Document
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Upload your transcript, letter of recommendation, or any relevant document"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            What Our Mentors Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Being a mentor has been incredibly rewarding. Seeing my mentees succeed makes it all worthwhile.",
                author: "Dr. Michael Chang",
                role: "Senior Research Scientist",
              },
              {
                quote:
                  "The platform makes it easy to connect with students and manage my mentoring schedule effectively.",
                author: "Sarah Johnson",
                role: "Software Engineering Manager",
              },
              {
                quote:
                  "I've grown both personally and professionally through mentoring. It's a two-way learning experience.",
                author: "David Martinez",
                role: "Business Consultant",
              },
            ].map((testimonial, index) => (
              <div key={index} className="text-center">
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold text-gray-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeMentorPage;
