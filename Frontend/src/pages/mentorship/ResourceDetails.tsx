import { useParams, Link } from "react-router-dom";
import {
  Download,
  Clock,
  Star,
  ArrowLeft,
  Share2,
  BookOpen,
} from "lucide-react";
import { getResourceById, getRelatedResources } from "../../data/resource";
import { useState, useRef } from "react"; // Import useState and useRef

const ResourceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const resource = getResourceById(id || "");
  const relatedResources = getRelatedResources(id || "");
  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause
  const videoRef = useRef<HTMLVideoElement>(null); // Ref for the video element

  // Function to handle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-gray-600">
                  {resource.rating} ({resource.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  Published {resource.datePublished}
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
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full rounded-lg"
                    controls={false} // Disable default controls
                  >
                    <source src={resource.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    onClick={togglePlayPause}
                    className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 text-white rounded-lg hover:bg-opacity-50"
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m-8 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-6.54-4.96A1 1 0 006 7v10a1 1 0 001.212.977l6.54-1.96a1 1 0 00.788-.977v-6a1 1 0 00-.788-.832z"
                        />
                      </svg>
                    )}
                  </button>
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

            {resource.requirements && (
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
                      key={related.id}
                      to={`/mentorship/resources/${related.id}`}
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
