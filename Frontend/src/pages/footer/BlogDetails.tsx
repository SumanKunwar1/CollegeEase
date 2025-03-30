import { useParams } from "react-router-dom";
import { Clock, User, Calendar } from "lucide-react";

function BlogDetails() {
  useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
          alt="Blog header"
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            How to Write a Compelling College Essay
          </h1>

          <div className="flex items-center text-gray-600 mb-8">
            <User size={18} className="mr-2" />
            <span className="mr-6">Sarah Johnson</span>
            <Calendar size={18} className="mr-2" />
            <span className="mr-6">March 15, 2024</span>
            <Clock size={18} className="mr-2" />
            <span>8 min read</span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              Your college essay is one of the most important components of your
              college application. It's your chance to show admissions officers
              who you are beyond your grades and test scores.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Start with a Compelling Hook
            </h2>
            <p className="text-gray-700 mb-4">
              The first paragraph of your essay should grab the reader's
              attention and make them want to read more. Consider starting with
              an interesting anecdote, a thought-provoking question, or a
              powerful statement that reflects your personality.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Be Authentic
            </h2>
            <p className="text-gray-700 mb-4">
              Admissions officers want to hear your genuine voice. Don't try to
              write what you think they want to hear. Instead, focus on telling
              your unique story in your own words.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Show, Don't Tell
            </h2>
            <p className="text-gray-700 mb-4">
              Use specific examples and vivid details to illustrate your points.
              Instead of saying you're passionate about science, describe the
              experiments you conduct in your garage or the hours you spend
              reading scientific journals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
