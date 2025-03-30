import type React from "react";
import { Users, FileText, CheckCircle } from "lucide-react";

export const RecruiterDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recruiter Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Active Job Postings
            </h3>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Total Applicants
            </h3>
            <p className="text-3xl font-bold">156</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-yellow-600" />
              Interviews Scheduled
            </h3>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
          <ul className="space-y-4">
            <li className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold">John Doe</h4>
              <p className="text-gray-600">Applied for: Software Engineer</p>
            </li>
            <li className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold">Jane Smith</h4>
              <p className="text-gray-600">Applied for: Data Scientist</p>
            </li>
            <li>
              <h4 className="font-semibold">Mike Johnson</h4>
              <p className="text-gray-600">Applied for: Product Manager</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
