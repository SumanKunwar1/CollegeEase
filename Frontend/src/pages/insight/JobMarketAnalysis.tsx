import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Briefcase, TrendingUp, MapPin, Star } from "lucide-react";
import axios from "axios";
import { useEnhancedToast } from "../../components/ui/enhanced-toast";

interface Category {
  _id: string;
  title: string;
  description: string;
  insights: MarketInsight[];
}

interface MarketInsight {
  _id: string;
  role: string;
  growth: string;
  avgSalary: string;
  topLocations: string[];
  skills: string[];
  demand: string;
  imageUrl: string;
}

const JobMarketAnalysisPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useEnhancedToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let url = `${import.meta.env.VITE_API_BASE_URL}/job-market/categories`;
        if (searchTerm) {
          url = `${import.meta.env.VITE_API_BASE_URL}/job-market/search?query=${searchTerm}`;
        }
        
        const response = await axios.get(url);
        setCategories(response.data.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch job market data",
          variant: "destructive",
        });
        console.error("Error fetching job market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will automatically trigger when searchTerm changes
  };

  const navigateToRoleDetails = (role: string) => {
    navigate(`/insights/job-market-analysis/${encodeURIComponent(role)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Job Market Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore current job market trends, salary insights, and in-demand skills across various industries.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Find Market Insights
            </h2>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by role, skill, or location"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    <Search className="inline-block mr-2" />
                    Search
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Categories and Insights */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No job market data found</p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.insights.map((insight) => (
                      <div 
                        key={insight._id} 
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigateToRoleDetails(insight.role)}
                      >
                        <div className="flex items-center mb-4">
                          {insight.imageUrl && (
                            <img 
                              src={insight.imageUrl} 
                              alt={insight.role} 
                              className="w-12 h-12 object-cover rounded-full mr-4"
                            />
                          )}
                          <h3 className="text-xl font-semibold text-gray-900">{insight.role}</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-600">Growth: {insight.growth}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="text-gray-600">Avg Salary: {insight.avgSalary}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 mr-2" />
                            <span className="text-gray-600">Demand: {insight.demand}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-red-500 mr-2 mt-1" />
                            <div>
                              <p className="text-gray-600">Top Locations:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {insight.topLocations.map((location, idx) => (
                                  <span key={idx} className="bg-gray-100 px-2 py-1 text-xs rounded">
                                    {location}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMarketAnalysisPage;