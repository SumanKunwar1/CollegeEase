import { useState } from "react";
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
import { donation } from "../../data/donations";
import { useNavigate } from "react-router-dom";

const StudentProfiles = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Heart, value: "1,234", label: "Students Supported" },
            { icon: DollarSign, value: "$2.5M", label: "Total Donations" },
            { icon: Users, value: "5,678", label: "Active Donors" },
            { icon: TrendingUp, value: "89%", label: "Success Rate" },
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
              onClick={() =>
                navigate(`/donate/donation-form/${donation[0].id}`)
              } // Adjusted to use a specific profile's ID
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {donation.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={profile.image}
                alt={profile.studentName}
                className="w-full h-48 object-cover"
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
                    <span>Raised: ${profile.raised.toLocaleString()}</span>
                    <span>Goal: ${profile.goal.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${(profile.raised / profile.goal) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <button
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  onClick={() =>
                    navigate(`/donate/donation-form/${profile.id}`)
                  } // Correct usage of profile.id here
                >
                  <Heart className="h-4 w-4 mr-2" /> Support{" "}
                  {profile.studentName}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfiles;
