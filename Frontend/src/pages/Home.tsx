import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, DollarSign, Calendar, Heart, Award, Quote } from "lucide-react";
import Hero from "../components/home/Hero";
import AboutUsPreview from "../components/home/AboutUsSection";
import FeaturedSession from "../components/home/FeaturedGroupSession";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

type College = {
  id: string;
  organizationName: string;
  location: string;
  rating: number;
  imageUrl: string;
  courses: string[];
};

type Scholarship = {
  _id: string;
  name: string;
  organizationName: string;
  amount: string;
  deadline: string;
};

type GroupSession = {
  _id: string;
  title: string;
  mentor: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  price: string;
  tags: string[];
  imageUrl: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
};

type StudentProfile = {
  _id: string;
  studentName: string;
  financialNeeds: string;
  academicHistory: string;
  raised: number;
  goal: number;
  image: string;
};

type SuccessStory = {
  _id: string;
  name: string;
  image: string;
  university: string;
  major: string;
  amountRaised: number;
  quote: string;
  impact: string[];
};

function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [groupSessions, setGroupSessions] = useState<GroupSession[]>([]);

  const [loading, setLoading] = useState({
    colleges: true,
    scholarships: true,
    studentProfiles: true,
    successStories: true,
    groupSessions: true, 
  });
  const [error, setError] = useState({
    colleges: "",
    scholarships: "",
    studentProfiles: "",
    successStories: "",
    groupSessions: "", 
  });

  // Constants for the number of items to show
  const COLLEGES_LIMIT = 3;
  const SCHOLARSHIPS_LIMIT = 3;
  const STUDENT_PROFILES_LIMIT = 3;
  const SUCCESS_STORIES_LIMIT = 2;

  useEffect(() => {
    // Fetch colleges
    api.get("/admin/colleges")
      .then((response) => {
        const allColleges = response.data.data || response.data;
        const transformedColleges = allColleges.slice(0, COLLEGES_LIMIT).map((college: any) => ({
          id: college._id,
          organizationName: college.organizationName,
          location: college.location,
          rating: college.rating || 0,
          imageUrl: college.imageUrl || "/Assets/images/default-college.jpg",
          courses: college.courses || [],
        }));
        setColleges(transformedColleges);
        setLoading(prev => ({ ...prev, colleges: false }));
      })
      .catch(() => {
        setError(prev => ({ ...prev, colleges: "Failed to load colleges" }));
        setLoading(prev => ({ ...prev, colleges: false }));
      });

    // Fetch scholarships
    api.get("/scholarships")
      .then((response) => {
        const allScholarships = response.data.data || response.data;
        setScholarships(allScholarships.slice(0, SCHOLARSHIPS_LIMIT));
        setLoading(prev => ({ ...prev, scholarships: false }));
      })
      .catch(() => {
        setError(prev => ({ ...prev, scholarships: "Failed to load scholarships" }));
        setLoading(prev => ({ ...prev, scholarships: false }));
      });

    // Fetch student profiles
    api.get("/student-profiles")
      .then((response) => {
        const allProfiles = response.data.data || response.data;
        setStudentProfiles(allProfiles.slice(0, STUDENT_PROFILES_LIMIT));
        setLoading(prev => ({ ...prev, studentProfiles: false }));
      })
      .catch(() => {
        setError(prev => ({ ...prev, studentProfiles: "Failed to load student profiles" }));
        setLoading(prev => ({ ...prev, studentProfiles: false }));
      });

      api.get("/group-sessions")
  .then((response) => {
    const allSessions = response.data.data || response.data;
    setGroupSessions(allSessions.slice(0, 1)); // Just get the first one
    setLoading(prev => ({ ...prev, groupSessions: false }));
  })
  .catch(() => {
    setError(prev => ({ ...prev, groupSessions: "Failed to load group sessions" }));
    setLoading(prev => ({ ...prev, groupSessions: false }));
  });

    // Fetch success stories
    api.get("/success-stories")
      .then((response) => {
        const allStories = response.data.data || response.data;
        setSuccessStories(allStories.slice(0, SUCCESS_STORIES_LIMIT));
        setLoading(prev => ({ ...prev, successStories: false }));
      })
      .catch(() => {
        setError(prev => ({ ...prev, successStories: "Failed to load success stories" }));
        setLoading(prev => ({ ...prev, successStories: false }));
      });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <Hero />
      <AboutUsPreview />
      
      {/* Featured Colleges Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Colleges</h2>
            <Link to="/colleges" className="text-blue-600 hover:text-blue-800" onClick={() => window.scrollTo(0, 0)}>
              View All Colleges →
            </Link>
          </div>
          
          {loading.colleges ? (
            <p>Loading colleges...</p>
          ) : error.colleges ? (
            <p className="text-red-500">{error.colleges}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {colleges.slice(0, COLLEGES_LIMIT).map((college) => (
                <div key={college.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={college.imageUrl} alt={college.organizationName} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900">{college.organizationName}</h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{college.rating || "N/A"}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {college.location}
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Popular Courses:</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {college.courses.slice(0, 3).map((course) => (
                          <span key={course} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to={`/colleges/${encodeURIComponent(college.organizationName)}`}
                      className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Scholarships Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Scholarships</h2>
            <Link to="/scholarships" className="text-blue-600 hover:text-blue-800" onClick={() => window.scrollTo(0, 0)}>
              View All Scholarships →
            </Link>
          </div>
          
          {loading.scholarships ? (
            <p>Loading scholarships...</p>
          ) : error.scholarships ? (
            <p className="text-red-500">{error.scholarships}</p>
          ) : (
            <div className="grid gap-6">
              {scholarships.slice(0, SCHOLARSHIPS_LIMIT).map((scholarship) => (
                <div key={scholarship._id} className="bg-gray-50 rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{scholarship.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">by {scholarship.organizationName}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {scholarship.amount}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                    </div>
                    <Link
                      to={`/scholarships/${scholarship.organizationName}`}
                      className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Students Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Students Seeking Support</h2>
            <Link to="/donate/student-profile" className="text-blue-600 hover:text-blue-800" onClick={() => window.scrollTo(0, 0)}>
              View All Students →
            </Link>
          </div>
          
          {loading.studentProfiles ? (
            <p>Loading student profiles...</p>
          ) : error.studentProfiles ? (
            <p className="text-red-500">{error.studentProfiles}</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {studentProfiles.slice(0, STUDENT_PROFILES_LIMIT).map((profile) => (
                <div key={profile._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={profile.image || "/placeholder.svg"}
                    alt={profile.studentName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{profile.studentName}</h3>
                    <p className="mt-2 text-gray-600">{profile.financialNeeds}</p>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Academic History: {profile.academicHistory}</p>
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
                    <Link
                      to={`/donate/donation-form/${profile._id}`}
                      className="mt-4 w-full inline-flex justify-center items-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      <Heart className="h-4 w-4 mr-2" /> Support {profile.studentName}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

        {loading.groupSessions ? (
            <p>Loading featured session...</p>
          ) : error.groupSessions ? (
            <p className="text-red-500">{error.groupSessions}</p>
          ) : groupSessions.length > 0 ? (
            <FeaturedSession session={groupSessions[0]} />
          ) : (
            <p>No featured sessions available</p>
          )}


      {/* Success Stories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Success Stories</h2>
            <Link to="/scholarships/success-stories" className="text-blue-600 hover:text-blue-800" onClick={() => window.scrollTo(0, 0)}>
              View All Stories →
            </Link>
          </div>
          
          {loading.successStories ? (
            <p>Loading success stories...</p>
          ) : error.successStories ? (
            <p className="text-red-500">{error.successStories}</p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {successStories.slice(0, SUCCESS_STORIES_LIMIT).map((story) => (
                <div key={story._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {story.name}
                        </h2>
                        <p className="text-gray-600">{story.university}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-start space-x-3">
                        <Award className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {story.major}
                          </p>
                          <p className="text-indigo-600 font-semibold">
                            ${story.amountRaised.toLocaleString()} raised
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex space-x-3">
                        <Quote className="h-8 w-8 text-indigo-500 flex-shrink-0" />
                        <p className="text-gray-600 italic">{story.quote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default Home;