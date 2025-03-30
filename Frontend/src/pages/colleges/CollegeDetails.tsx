"use client";

import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  Award,
  Building,
  GraduationCap,
  Users,
  DollarSign,
  BookOpen,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api/v1';

// Type Definitions
type Program = {
  _id?: string;
  name: string;
  level: "undergraduate" | "postgraduate" | "doctorate";
  duration: string;
  description: string;
};

type ProgramLevel = "undergraduate" | "postgraduate" | "doctorate";

type Programs = {
  [K in ProgramLevel]?: Program[];
};

type Review = {
  id: string;
  studentName: string;
  program: string;
  rating: number;
  review: string;
};

type Tuition = {
  level: string;
  range: string;
  notes: string;
};

type Deadlines = {
  fall: string;
  spring: string;
  summer: string;
};

type CareerStats = {
  placementRate: string;
  averageSalary: string;
  topEmployers?: string[];
};

type CollegeType = {
  organizationName: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  rating: number;
  foundedYear: string;
  globalRanking: number;
  alumniCount: number;
  programs: Programs;
  studentReviews: Review[];
  tuition: Tuition[];
  applicationDeadlines: Deadlines;
  careerStats: CareerStats;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const CollegeDetails = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [college, setCollege] = useState<CollegeType | null>(null);
  const [loading, setLoading] = useState(true);

  const formatOrganizationName = (name: string) => {
    return name ? decodeURIComponent(name).replace(/%20/g, ' ') : '';
  };

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        setLoading(true);
        const formattedOrgName = formatOrganizationName(name || '');
        
        if (!formattedOrgName) {
          throw new Error('College name is required');
        }

        const response = await fetch(`${API_BASE_URL}/college-details/${encodeURIComponent(formattedOrgName)}`);
        
        if (!response.ok) {
          throw new Error('College not found');
        }
        
        const data: ApiResponse<CollegeType> = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error(data.message || 'Invalid data format');
        }

        setCollege(data.data);
      } catch (error) {
        console.error("Error fetching college details:", error);
        toast.error("Failed to load college details");
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [name]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading College Details...</h2>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">College Not Found</h2>
          <Button onClick={() => navigate("/colleges")} className="mt-4">
            Back to Colleges
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-md z-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {college.name}
            </h1>
            <div className="flex space-x-4">
              {["overview", "programs", "reviews", "admissions"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-gray-600 hover:text-gray-900 capitalize px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {section}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover transform scale-110"
          style={{
            backgroundImage: `url(${college.imageUrl})`,
            transform: "translateZ(0)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
            <div className="pb-20 text-white">
              <h1 className="text-5xl font-bold mb-4">{college.name}</h1>
              <div className="flex items-center space-x-6 text-lg">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  {college.location}
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold">{college.rating}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-6 w-6 mr-2" />
                  Est. {college.foundedYear}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="h-8 w-8 mr-3 text-blue-600" />
                  College Overview
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {college.description}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <Award className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Global Ranking</p>
                        <p className="text-xl font-bold text-gray-900">
                          #{college.globalRanking}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Alumni Network</p>
                        <p className="text-xl font-bold text-gray-900">
                          {college.alumniCount.toLocaleString()}+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <GraduationCap className="h-8 w-8 mr-3 text-blue-600" />
                  Academic Programs
                </h2>
                <div className="space-y-8">
                  {(['undergraduate', 'postgraduate', 'doctorate'] as ProgramLevel[]).map((level) => {
                    const programsList = college.programs[level] || [];
                    return (
                      <div key={level}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                          {level} Programs
                        </h3>
                        {programsList.length > 0 ? (
                          <div className="grid gap-4">
                            {programsList.map((program) => (
                              <div
                                key={program._id || program.name}
                                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                              >
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {program.name}
                                </h4>
                                <p className="text-gray-600 mt-2">
                                  {program.description}
                                </p>
                                <div className="flex items-center mt-4 text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-2" />
                                  Duration: {program.duration}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 flex flex-col items-center justify-center">
                            <GraduationCap className="h-12 w-12 text-gray-400 mb-3" />
                            <p className="text-gray-500 text-center mb-2">No {level} programs available</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="h-8 w-8 mr-3 text-blue-600" />
                  Student Reviews
                </h2>
                {college.studentReviews.length > 0 ? (
                  <div className="space-y-6">
                    {college.studentReviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">
                              {review.studentName}
                            </p>
                            <p className="text-blue-600">{review.program}</p>
                          </div>
                          <div className="flex items-center bg-white px-3 py-1 rounded-full">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium">
                              {review.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.review}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No student reviews yet</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:space-y-8">
            {/* Quick Actions Card */}
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Statistics</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Placement Rate</span>
                    <span className="font-semibold text-blue-600">
                      {college.careerStats.placementRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Starting Salary</span>
                    <span className="font-semibold text-blue-600">
                      {college.careerStats.averageSalary}
                    </span>
                  </div>
                  {college.careerStats.topEmployers && college.careerStats.topEmployers.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Top Employers</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.careerStats.topEmployers.map((employer) => (
                          <span key={employer} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                            {employer}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={() => navigate(`/colleges/${name}/apply`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 mb-6"
                  >
                    Apply Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Application Deadlines */}
              <div
                id="admissions"
                className="bg-white rounded-2xl shadow-xl p-8 mb-8 scroll-mt-24"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Application Deadlines
                </h3>
                <div className="space-y-4">
                  {(['fall', 'spring', 'summer'] as (keyof Deadlines)[]).map((term) => (
                    <div
                      key={term}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="capitalize">{term} Intake</span>
                      </div>
                      <span className="font-medium">
                        {college.applicationDeadlines[term] || 'Not specified'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tuition Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                  Tuition & Fees
                </h3>
                <div className="space-y-4">
                  {college.tuition.map((fee) => (
                    <div key={fee.level} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="capitalize text-gray-600">
                          {fee.level}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {fee.range || 'Not specified'}
                        </span>
                      </div>
                      {fee.notes && (
                        <p className="text-sm text-gray-500">{fee.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;