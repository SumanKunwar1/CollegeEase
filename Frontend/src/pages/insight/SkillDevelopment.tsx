import { BookOpen, Award, Clock, Star, ArrowRight, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  imageUrl: string;
}

interface SkillCategory {
  _id: string;
  title: string;
  description: string;
  courses: Course[];
}

const SkillDevelopmentPage = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stats data
  const stats = [
    { icon: BookOpen, label: "Active Courses", value: "50+" },
    { icon: Users, label: "Active Learners", value: "10K+" },
    { icon: Award, label: "Certifications", value: "25+" },
    { icon: Star, label: "Avg. Rating", value: "4.8" },
  ];

  useEffect(() => {
    const fetchSkillCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/skill-development`);
        if (!response.ok) {
          throw new Error('Failed to fetch skill categories');
        }
        const data = await response.json();
        setSkillCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkillCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading skill development content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading content</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Skill Development
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build the skills that matter most in today's job market through
            expert-led courses and hands-on practice.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-600" />
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

        {/* Skill Categories */}
        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600 mb-6">{category.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.courses.map((course) => (
                    <div key={course._id} className="flex space-x-6">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course.title}
                        </h3>
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {course.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Award className="h-4 w-4 mr-2" />
                            {course.level}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-4 w-4 mr-2 text-yellow-400" />
                            {course.rating} ({course.students} students)
                          </div>
                        </div>
                        <a
                          href={`/insights/skill-development/${course._id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                          Start learning <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Take our skill assessment to get a personalized learning path
              tailored to your goals.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Take Skill Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopmentPage;