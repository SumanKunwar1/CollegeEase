import { BookOpen, Award, Clock, Star, ArrowRight, Users } from "lucide-react";

const SkillDevelopmentPage = () => {
  const skillCategories = [
    {
      title: "Technical Skills",
      description: "Master the technical skills most in demand by employers",
      courses: [
        {
          title: "Data Analysis Fundamentals",
          duration: "6 weeks",
          level: "Beginner",
          rating: 4.8,
          students: 1234,
          imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Cloud Computing Essentials",
          duration: "8 weeks",
          level: "Intermediate",
          rating: 4.7,
          students: 987,
          imageUrl:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Soft Skills",
      description: "Develop essential interpersonal and leadership skills",
      courses: [
        {
          title: "Effective Communication",
          duration: "4 weeks",
          level: "All Levels",
          rating: 4.9,
          students: 2156,
          imageUrl:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Leadership & Team Management",
          duration: "6 weeks",
          level: "Intermediate",
          rating: 4.8,
          students: 1567,
          imageUrl:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Industry Certifications",
      description: "Earn recognized certifications to boost your career",
      courses: [
        {
          title: "Project Management Professional (PMP)",
          duration: "12 weeks",
          level: "Advanced",
          rating: 4.9,
          students: 876,
          imageUrl:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "AWS Cloud Practitioner",
          duration: "8 weeks",
          level: "Beginner",
          rating: 4.7,
          students: 1432,
          imageUrl:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
  ];

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
          {[
            { icon: BookOpen, label: "Active Courses", value: "50+" },
            { icon: Users, label: "Active Learners", value: "10K+" },
            { icon: Award, label: "Certifications", value: "25+" },
            { icon: Star, label: "Avg. Rating", value: "4.8" },
          ].map((stat, index) => (
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
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600 mb-6">{category.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.courses.map((course, cIndex) => (
                    <div key={cIndex} className="flex space-x-6">
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
                          href={`/insights/skill-development/${course.title}`}
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
