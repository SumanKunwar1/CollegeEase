import type React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

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

const IndustryTrendDetails: React.FC = () => {
  const { trendId } = useParams() as { trendId: string };
  const [trend, setTrend] = useState<Trend | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/industry-trends/trend/${trendId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Trend not found');
        }

        setTrend(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, [trendId]);

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

  if (error || !trend) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {error || 'Trend not found'}
            </h1>
            <Link
              to="/insights/industry-trends/"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Industry Trends
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <Link
            to="/insights/industry-trends/"
            className="text-blue-600 hover:text-blue-700 flex items-center mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Industry Trends
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {trend.title}
          </h1>
          <img
            src={trend.imageUrl || "/placeholder.svg"}
            alt={trend.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-xl text-gray-600 mb-4">{trend.description}</p>
          <p className="text-lg font-semibold text-blue-600 mb-8">
            {trend.impact}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Overview
            </h2>
            <p className="text-gray-600">{trend.details.overview}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Key Points
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {trend.details.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-600">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Learn More
            </h2>
            <ul className="space-y-2">
              {trend.details.supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    {link.label}
                    <ExternalLink className="ml-2" size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryTrendDetails;