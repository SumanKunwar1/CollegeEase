import type React from "react";
import { Zap } from "lucide-react";

export const SmartMatchingSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="h-6 w-6 text-yellow-500 mr-2" />
          Smart Job Matching
        </h2>
        <p className="text-gray-600 mb-6">
          Our AI-powered system analyzes your skills, preferences, and
          application history to recommend the best job opportunities for you.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
          Get Personalized Recommendations
        </button>
      </div>
    </div>
  );
};
