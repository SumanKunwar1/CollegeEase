import type React from "react";
import { Building, Users, Briefcase } from "lucide-react";

export const InstituteDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Institute Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Partner Companies
            </h3>
            <p className="text-3xl font-bold">25</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Students Placed
            </h3>
            <p className="text-3xl font-bold">189</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-yellow-600" />
              Upcoming Placement Drives
            </h3>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Upcoming Placement Drives
          </h3>
          <ul className="space-y-4">
            <li className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold">TechCorp Inc.</h4>
              <p className="text-gray-600">Date: May 15, 2024</p>
            </li>
            <li className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold">Finance Solutions Ltd.</h4>
              <p className="text-gray-600">Date: May 22, 2024</p>
            </li>
            <li>
              <h4 className="font-semibold">Global Consulting Group</h4>
              <p className="text-gray-600">Date: June 1, 2024</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
