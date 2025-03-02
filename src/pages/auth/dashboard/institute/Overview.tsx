import { Users, GraduationCap, FileCheck, Clock } from "lucide-react";

export function Overview() {
  const stats = [
    {
      name: "Total Students",
      value: "2,345",
      icon: Users,
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Active Programs",
      value: "18",
      icon: GraduationCap,
      change: "+2",
      changeType: "increase",
    },
    {
      name: "Applications",
      value: "156",
      icon: FileCheck,
      change: "23",
      changeType: "pending",
    },
    {
      name: "Average Response Time",
      value: "2.5 days",
      icon: Clock,
      change: "-0.5 days",
      changeType: "improvement",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : stat.changeType === "decrease"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  New application received for B.Tech Computer Science
                </p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
