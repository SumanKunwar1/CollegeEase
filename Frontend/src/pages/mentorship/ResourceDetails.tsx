import { useParams, Link } from "react-router-dom";
import {
  Download,
  Clock,
  ArrowLeft,
  Share2,
  BookOpen,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Resource {
  _id: string;
  title: string;
  author: string;
  type: string;
  description: string;
  downloadUrl: string;
  downloadCount: number;
  datePublished: string;
  fileSize: string;
  detailedDescription?: string;
  requirements?: string[];
  videoUrl?: string;
  imageUrl?: string;
}

interface RelatedResource {
  _id: string;
  title: string;
  type: string;
}

const ResourceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [relatedResources, setRelatedResources] = useState<RelatedResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResourceDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/resources/${id}`
        );
        setResource(response.data.data);
        
        // Fetch related resources of the same type
        const relatedResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/resources`,
          {
            params: { 
              type: response.data.data.type,
              limit: 3,
              exclude: response.data.data._id 
            }
          }
        );
        setRelatedResources(relatedResponse.data.data);
      } catch (error) {
        console.error("Error fetching resource details:", error);
        toast.error("Failed to load resource details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResourceDetails();
    }
  }, [id]);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Handle both full URL and shortened URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resource details...</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Resource not found
          </h1>
          <Link
            to="/mentorship/resources"
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <Link
          to="/mentorship/resources"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Link>

        {/* Resource Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {resource.title}
                </h1>
                <p className="text-gray-600">By {resource.author}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {resource.type}
              </span>
            </div>

            <div className="flex items-center mt-6 space-x-6">
              <div className="flex items-center">
                <Download className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  {resource.downloadCount} downloads
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  Published {new Date(resource.datePublished).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            {resource.videoUrl && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Video
                </h2>
                <div className="relative aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(resource.videoUrl)}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={resource.title}
                  />
                </div>
              </div>
            )}

            {/* About this Resource */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About this Resource
              </h2>
              <div className="prose max-w-none">
                {resource.detailedDescription
                  ?.split("\n")
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {resource.requirements && resource.requirements.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {resource.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Actions & Related */}
          <div className="space-y-8">
            {/* Download Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Resource Details
                </h3>
                <p className="text-sm text-gray-600">
                  File size: {resource.fileSize}
                </p>
              </div>
              <div className="space-y-4">
                <a
                  href={resource.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Now
                </a>
                <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Resource
                </button>
              </div>
            </div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Resources
                </h3>
                <div className="space-y-4">
                  {relatedResources.map((related) => (
                    <Link
                      key={related._id}
                      to={`/mentorship/resources/${related._id}`}
                      className="block p-4 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-start">
                        <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {related.type}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailsPage;