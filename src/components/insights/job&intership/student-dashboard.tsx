import type React from "react";
import { Briefcase, CheckCircle, Clock } from "lucide-react";

export const StudentDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Student Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
              Active Applications
            </h3>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Interviews Scheduled
            </h3>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-yellow-600" />
              Upcoming Deadlines
            </h3>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
          <ul className="space-y-4">
            <li className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold">Software Engineer Intern</h4>
              <p className="text-gray-600">TechCorp Inc.</p>
            </li>
            <li className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold">Data Analyst</h4>
              <p className="text-gray-600">Analytics Co.</p>
            </li>
            <li>
              <h4 className="font-semibold">UX Designer</h4>
              <p className="text-gray-600">DesignHub</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
