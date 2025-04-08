import {
  Users,
  Briefcase,
  Calendar,
  ArrowRight,
  Star,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IInterview {
  _id: string;
  name: string;
  role: string;
  topic: string;
  insights: string[];
  imageUrl: string;
  date: string;
}

interface IInterviewCategory {
  _id: string;
  category: string;
  interviews: IInterview[];
}

const ExpertInterviewsPage = () => {
  const [categories, setCategories] = useState<IInterviewCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/expert-interviews`
        );
        setCategories(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching interviews:", error);
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div>Loading interviews...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Expert Interviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gain insights from industry leaders, academics, and innovators
            shaping the future of technology and education.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: "Industry Experts", value: "50+" },
            { icon: BookOpen, label: "Topics Covered", value: "30+" },
            { icon: TrendingUp, label: "Success Stories", value: "100+" },
            { icon: Star, label: "Avg. Rating", value: "4.9" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interviews by Category */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.interviews.map((interview) => (
                    <div key={interview._id} className="flex space-x-6">
                      <img
                        src={interview.imageUrl}
                        alt={interview.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {interview.name}
                        </h3>
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Briefcase className="h-4 w-4 mr-2" />
                            {interview.role}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {interview.date}
                          </div>
                        </div>
                        <p className="text-blue-600 font-medium mb-2">
                          {interview.topic}
                        </p>
                        <ul className="text-sm text-gray-600 mb-3">
                          {interview.insights.slice(0, 3).map((insight, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></div>
                              {insight}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => navigate(`/insights/expert-interviews/${interview._id}`)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                          Read interview <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Request Interview Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Have an Expert in Mind?</h2>
            <p className="text-lg mb-8 opacity-90">
              Suggest industry leaders you'd like to hear from or topics you
              want us to cover.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Submit a Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertInterviewsPage;