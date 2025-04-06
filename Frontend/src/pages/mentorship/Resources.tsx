import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  Search,
} from "lucide-react";
import { filterResources } from "../../data/resource";
import RequestResourceForm from "./ResourcesForm"; // Correct import

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false); // State for showing the form
  const filteredResources = filterResources({ searchQuery });

  const categories = [
    {
      icon: BookOpen,
      title: "Guides & Best Practices",
      description: "Access comprehensive mentorship guides and frameworks",
    },
    {
      icon: Video,
      title: "Video Resources",
      description: "Watch recorded sessions and training materials",
    },
    {
      icon: FileText,
      title: "Templates & Tools",
      description: "Download ready-to-use templates and worksheets",
    },
  ];

  const handleOpenForm = () => {
    setShowRequestForm(true); // Show the form when button is clicked
  };

  const handleCloseForm = () => {
    setShowRequestForm(false); // Close the form
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Mentorship Resources
          </h1>
          <p className="mt-2 text-gray-600">
            Access guides, templates, and tools to enhance your mentorship
            experience
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <category.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Resources */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Resources
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {resource.title}
                    </h3>
                    <p className="text-gray-500 mt-1">By {resource.author}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {resource.type}
                  </span>
                </div>

                <p className="mt-4 text-gray-600">{resource.description}</p>

                <div className="mt-6 flex space-x-4">
                  <a
                    href={resource.downloadUrl}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                  <Link
                    to={`/mentorship/resources/${resource.id}`}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Online
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Resources Button */}
        <div className="mt-12 bg-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need More Resources?
          </h2>
          <p className="text-gray-600 mb-6">
            Our resource library is constantly growing. Let us know what
            additional materials would be helpful.
          </p>
          <button
            onClick={handleOpenForm} // Open the form
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
          >
            Request Resources
          </button>
        </div>

        {/* Show the Request Resource Form */}
        {showRequestForm && <RequestResourceForm onClose={handleCloseForm} />}
      </div>
    </div>
  );
};

export default ResourcesPage;
