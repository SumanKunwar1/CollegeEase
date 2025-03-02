import { useState } from "react";
import {
  Search,
  Filter,
  DollarSign,
  Calendar,
  GraduationCap,
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

const ScholarshipFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Your Perfect Scholarship
          </h1>
          <p className="mt-2 text-gray-600">
            Search through thousands of scholarships tailored to your profile
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search scholarships..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={majorFilter} onValueChange={setMajorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Major" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
              </SelectContent>
            </Select>
            <Select value={amountFilter} onValueChange={setAmountFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Amount Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-5000">$0 - $5,000</SelectItem>
                <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                <SelectItem value="10000-plus">$10,000+</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {[1, 2, 3].map((scholarship) => (
            <div
              key={scholarship}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Merit Excellence Scholarship #{scholarship}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Global Education Foundation
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800">
                    <DollarSign className="h-4 w-4 mr-1" />
                    $10,000
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  GPA 3.5+
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  STEM Major
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                  Undergraduate
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Deadline: June 30, 2024
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-4">
                  <Button variant="outline">Check Eligibility</Button>
                  <Button>Apply Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipFinder;
