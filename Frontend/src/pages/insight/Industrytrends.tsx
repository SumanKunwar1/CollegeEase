import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart,
  BookOpen,
  TrendingUp,
  Users,
} from "lucide-react";

interface TrendDetail {
  overview: string;
  keyPoints: string[];
  supportLinks: {
    label: string;
    url: string;
  }[];
}

interface Trend {
  _id: string;
  title: string;
  description: string;
  impact: string;
  imageUrl?: string;
  details: TrendDetail;
}

interface TrendCategory {
  _id: string;
  category: string;
  trends: Trend[];
}

const IndustryTrends: React.FC = () => {
  const [categories, setCategories] = useState<TrendCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/industry-trends`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch trends');
        }

        setCategories(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading trends</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Industry Trends
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead of the curve with insights into emerging industries,
            technologies, and career opportunities.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: TrendingUp, label: "Emerging Fields", value: "12+" },
            { icon: BookOpen, label: "Research Reports", value: "50+" },
            { icon: Users, label: "Expert Contributors", value: "30+" },
            { icon: BarChart, label: "Market Insights", value: "100+" },
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

        {/* Trends by Category */}
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
                  {category.trends.map((trend) => (
                    <div key={trend._id} className="flex space-x-6">
                      <img
                        src={trend.imageUrl || "/placeholder.svg"}
                        alt={trend.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {trend.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {trend.description}
                        </p>
                        <p className="text-sm text-blue-600">{trend.impact}</p>
                        <Link
                          to={`/insights/industry-trends/${trend._id}`}
                          className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-700"
                        >
                          Learn more <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Ahead of Industry Trends
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Get weekly updates on emerging trends, technologies, and career
              opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-900 w-full sm:w-96"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryTrends;