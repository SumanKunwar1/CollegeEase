import React from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  ArrowRight,
  Briefcase,
  MapPin,
} from "lucide-react";

interface MarketInsight {
  role: string;
  growth: string;
  avgSalary: string;
  topLocations: string[];
  skills: string[];
  demand: string;
  imageUrl: string;
}

interface Category {
  title: string;
  description: string;
  insights: MarketInsight[];
}

const JobMarketAnalysisPage: React.FC = () => {
  const marketInsights: Category[] = [
    {
      title: "Tech Sector",
      description: "Master the technical skills most in demand by employers",
      insights: [
        {
          role: "Software Engineer",
          growth: "+25%",
          avgSalary: "$120,000",
          topLocations: ["San Francisco", "New York", "Seattle"],
          skills: ["React", "Python", "Cloud Computing"],
          demand: "High",
          imageUrl:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400",
        },
        {
          role: "Data Scientist",
          growth: "+30%",
          avgSalary: "$130,000",
          topLocations: ["Boston", "Austin", "Chicago"],
          skills: ["Machine Learning", "SQL", "Python"],
          demand: "Very High",
          imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Healthcare",
      description: "Develop essential interpersonal and leadership skills",
      insights: [
        {
          role: "Healthcare Administrator",
          growth: "+20%",
          avgSalary: "$85,000",
          topLocations: ["Houston", "Los Angeles", "Miami"],
          skills: ["Healthcare Management", "EHR Systems", "Operations"],
          demand: "High",
          imageUrl:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
        },
        {
          role: "Nurse Practitioner",
          growth: "+35%",
          avgSalary: "$110,000",
          topLocations: ["New York", "Chicago", "Atlanta"],
          skills: ["Patient Care", "Clinical Experience", "Specializations"],
          demand: "Very High",
          imageUrl:
            "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Business & Finance",
      description: "Earn recognized certifications to boost your career",
      insights: [
        {
          role: "Financial Analyst",
          growth: "+15%",
          avgSalary: "$95,000",
          topLocations: ["New York", "Chicago", "Boston"],
          skills: ["Financial Modeling", "Excel", "Data Analysis"],
          demand: "Moderate",
          imageUrl:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
        },
        {
          role: "Business Consultant",
          growth: "+20%",
          avgSalary: "$105,000",
          topLocations: ["Boston", "San Francisco", "Washington DC"],
          skills: ["Strategy", "Analytics", "Project Management"],
          demand: "High",
          imageUrl:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400",
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
            Job Market Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed career decisions with data-driven insights into job
            trends, salaries, and skill demands.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Briefcase, label: "Jobs Analyzed", value: "100K+" },
            { icon: TrendingUp, label: "Growth Sectors", value: "15+" },
            { icon: DollarSign, label: "Salary Data Points", value: "50K+" },
            { icon: Users, label: "Companies", value: "1000+" },
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

        {/* Market Insights by Category */}
        <div className="space-y-12">
          {marketInsights.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.insights.map((insight, iIndex) => (
                    <div key={iIndex} className="flex space-x-6">
                      <img
                        src={insight.imageUrl}
                        alt={insight.role}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {insight.role}
                        </h3>
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                            Growth: {insight.growth}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Avg. Salary: {insight.avgSalary}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            Top Locations: {insight.topLocations.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {insight.skills.map((skill, sIndex) => (
                            <span
                              key={sIndex}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <a
                          href={`/insights/job-market-analysis/${insight.role}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                          View detailed analysis{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Salary Calculator Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Calculate Your Market Value
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Use our salary calculator to estimate your market value based on
              your skills, experience, and location.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Try Salary Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMarketAnalysisPage;
