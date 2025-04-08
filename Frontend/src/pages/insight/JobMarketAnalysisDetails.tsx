import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrendingUp, MapPin, Star, DollarSign, BookOpen, Building2, Clock } from "lucide-react";
import axios from "axios";
import { useEnhancedToast } from "../../components/ui/enhanced-toast";

interface MarketInsight {
  _id: string;
  role: string;
  growth: string;
  avgSalary: string;
  topLocations: string[];
  skills: string[];
  demand: string;
  imageUrl: string;
  detailedAnalysis: {
    jobDescription: string;
    industryTrends: string;
    salaryRange: string;
    careerPath: string[];
    keyCompanies: string[];
    futureOutlook: string;
  };
}

const JobAnalysisPage = () => {
  const { role } = useParams<{ role: string }>();
  const [insight, setInsight] = useState<MarketInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useEnhancedToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/job-market/search?query=${encodeURIComponent(role || '')}`
        );
        
        // Find the insight that matches the role in the URL
        const foundInsight = response.data.data
          .flatMap((category: any) => category.insights)
          .find((i: any) => i.role.toLowerCase() === role?.toLowerCase());

        if (foundInsight) {
          setInsight(foundInsight);
        } else {
          toast({
            title: "Not Found",
            description: "Job market insight not found for this role",
            variant: "destructive",
          });
          navigate("/insights/job-market-analysis");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch job market insight",
          variant: "destructive",
        });
        console.error("Error fetching job market insight:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <p className="text-gray-500">Job market insight not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Role Overview */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            {insight.imageUrl && (
              <img 
                src={insight.imageUrl} 
                alt={insight.role} 
                className="w-20 h-20 object-cover rounded-full"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{insight.role}</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center text-gray-600">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <span>{insight.growth}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                  <span>{insight.avgSalary}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>{insight.demand}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600">{insight.detailedAnalysis.jobDescription}</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-red-500 mr-2" />
              Top Locations
            </h3>
            <ul className="space-y-2">
              {insight.topLocations.map((location, index) => (
                <li key={index} className="text-gray-600">{location}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 text-purple-500 mr-2" />
              Key Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {insight.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-5 w-5 text-indigo-500 mr-2" />
              Key Companies
            </h3>
            <ul className="space-y-2">
              {insight.detailedAnalysis.keyCompanies.map((company, index) => (
                <li key={index} className="text-gray-600">{company}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Industry Trends */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
            Industry Trends
          </h2>
          <p className="text-gray-600 whitespace-pre-line">{insight.detailedAnalysis.industryTrends}</p>
        </div>

        {/* Salary Range */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <DollarSign className="h-6 w-6 text-blue-500 mr-3" />
            Salary Range
          </h2>
          <p className="text-gray-600">{insight.detailedAnalysis.salaryRange}</p>
        </div>

        {/* Career Path */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Clock className="h-6 w-6 text-yellow-500 mr-3" />
            Career Path
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            {insight.detailedAnalysis.careerPath.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Future Outlook */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Future Outlook
          </h2>
          <p className="text-gray-600 whitespace-pre-line">{insight.detailedAnalysis.futureOutlook}</p>
        </div>
      </div>
    </div>
  );
};

export default JobAnalysisPage;