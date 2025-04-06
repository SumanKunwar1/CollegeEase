import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { marketInsights } from "../../data/jobmarket";
import type { MarketInsight } from "../../types/jobmarket";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Briefcase,
  MapPin,
} from "lucide-react";

const JobAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: string }>();

  const jobInsight: MarketInsight | undefined = marketInsights
    .flatMap((category) => category.insights)
    .find(
      (insight) => insight.role.toLowerCase() === role?.toString().toLowerCase()
    );

  if (!jobInsight) {
    return <div>Job role not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/job-market-analysis")}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Job Market Analysis
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {jobInsight.role} - Detailed Analysis
        </h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <img
              src={jobInsight.imageUrl || "/placeholder.svg"}
              alt={jobInsight.role}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Growth</p>
                  <p className="text-lg font-semibold">{jobInsight.growth}</p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Average Salary</p>
                  <p className="text-lg font-semibold">
                    {jobInsight.avgSalary}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-red-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Top Locations</p>
                  <p className="text-lg font-semibold">
                    {jobInsight.topLocations.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-6 w-6 text-purple-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Demand</p>
                  <p className="text-lg font-semibold">{jobInsight.demand}</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Key Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {jobInsight.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Detailed Analysis</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="text-gray-700">
                  {jobInsight.detailedAnalysis.jobDescription}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Industry Trends</h3>
                <p className="text-gray-700">
                  {jobInsight.detailedAnalysis.industryTrends}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
                <p className="text-gray-700">
                  {jobInsight.detailedAnalysis.salaryRange}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Career Path</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {jobInsight.detailedAnalysis.careerPath.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Companies</h3>
                <p className="text-gray-700">
                  {jobInsight.detailedAnalysis.keyCompanies.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Future Outlook</h3>
                <p className="text-gray-700">
                  {jobInsight.detailedAnalysis.futureOutlook}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAnalysisPage;
