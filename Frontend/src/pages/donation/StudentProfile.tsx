import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  DollarSign,
  Heart,
  Users,
  TrendingUp,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface DonationProfile {
  _id: string;
  studentName: string;
  financialNeeds: string;
  academicHistory: string;
  goals: string;
  raised: number;
  goal: number;
  image: string;
  story?: string;
}

const StudentProfiles = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [profiles, setProfiles] = useState<DonationProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRaised: 0,
    activeDonors: 5678, // You might want to fetch this from API too
    successRate: "89%", // You might want to calculate this from API data
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/student-profiles`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch student profiles');
        }

        const data = await response.json();
        const profilesData = data.data || data; // Handle both response formats
        
        setProfiles(profilesData);
        
        // Calculate stats
        const totalRaised = profilesData.reduce((sum: number, profile: DonationProfile) => sum + profile.raised, 0);
        setStats({
          totalStudents: profilesData.length,
          totalRaised,
          activeDonors: 5678, // Replace with actual API call if available
          successRate: "89%", // Replace with actual calculation if needed
        });
      } catch (error) {
        console.error("Error fetching student profiles:", error);
        toast.error("Failed to load student profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [API_BASE_URL]);

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch = profile.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = majorFilter ? profile.academicHistory === majorFilter : true;
    const matchesCountry = countryFilter ? profile.financialNeeds === countryFilter : true;
    return matchesSearch && matchesMajor && matchesCountry;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Support Student Dreams
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Help students achieve their educational goals through direct support
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Heart, value: stats.totalStudents.toLocaleString(), label: "Students Supported" },
            { icon: DollarSign, value: formatCurrency(stats.totalRaised), label: "Total Donations" },
            { icon: Users, value: stats.activeDonors.toLocaleString(), label: "Active Donors" },
            { icon: TrendingUp, value: stats.successRate, label: "Success Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
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

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search students..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={majorFilter} onValueChange={setMajorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Field of Study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => navigate('/donate')}
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p>Loading student profiles...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && profiles.length === 0 && (
          <div className="text-center py-12">
            <p>No student profiles found</p>
          </div>
        )}

        {/* Profiles Grid */}
        {!loading && filteredProfiles.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={profile.image || "/placeholder.svg"}
                  alt={profile.studentName}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {profile.studentName}
                  </h3>
                  <p className="mt-2 text-gray-600">{profile.financialNeeds}</p>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Academic History: {profile.academicHistory}</p>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Goal: {profile.goals}</p>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Raised: {formatCurrency(profile.raised)}</span>
                      <span>Goal: {formatCurrency(profile.goal)}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min((profile.raised / profile.goal) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <button
                    className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                    onClick={() => navigate(`/donate/donation-form/${profile._id}`)}
                  >
                    <Heart className="h-4 w-4 mr-2" /> Support {profile.studentName}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfiles;