import {
  Calendar,
  Briefcase,
  Share2,
  BookOpen,
  PlayCircle,
  Download,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface IInterviewSection {
  title: string;
  content: string;
}

interface IInterviewResource {
  title: string;
  url: string;
  type: string;
}

interface IFullInterview {
  introduction: string;
  videoUrl?: string;
  sections: IInterviewSection[];
  keyTakeaways: string[];
  resources: IInterviewResource[];
}

interface IInterview {
  _id: string;
  name: string;
  role: string;
  topic: string;
  date: string;
  imageUrl: string;
  category: string;
  insights: string[];
  fullInterview?: IFullInterview;
}

const InterviewDetailPage = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState<IInterview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/expert-interviews/interview/${id}`
        );
        setInterview(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching interview:", error);
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div>Loading interview details...</div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div>Interview not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={interview.imageUrl}
              alt={interview.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <div className="text-blue-100 font-medium mb-2">
                {interview.category}
              </div>
              <h1 className="text-4xl font-bold mb-4">{interview.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {interview.role}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {interview.date}
                </div>
              </div>
              <h2 className="text-2xl font-semibold">{interview.topic}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Introduction */}
            {interview.fullInterview?.introduction && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {interview.fullInterview.introduction}
                </p>
              </div>
            )}

            {/* Video Section */}
            {interview.fullInterview?.videoUrl && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <PlayCircle className="h-6 w-6 mr-2 text-blue-600" />
                  Interview Highlights
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={interview.fullInterview.videoUrl}
                    className="w-full h-[400px] rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Interview Sections */}
            {interview.fullInterview?.sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 mb-8"
              >
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Key Takeaways */}
            {interview.fullInterview?.keyTakeaways && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {interview.fullInterview.keyTakeaways.map(
                    (takeaway, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-700">{takeaway}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Resources */}
            {interview.fullInterview?.resources && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-semibold mb-4">
                  Additional Resources
                </h3>
                <ul className="space-y-4">
                  {interview.fullInterview.resources.map(
                    (resource, index) => (
                      <li key={index}>
                        <a
                          href={resource.url}
                          className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {resource.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {resource.type}
                            </div>
                          </div>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Share Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Share2 className="h-6 w-6 mr-2 text-blue-600" />
                Share Interview
              </h3>
              <div className="flex space-x-4">
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                  <LinkedinIcon className="h-5 w-5 text-blue-600" />
                </button>
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                  <TwitterIcon className="h-5 w-5 text-blue-600" />
                </button>
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                  <FacebookIcon className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailPage;