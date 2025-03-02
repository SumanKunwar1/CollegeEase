import { Briefcase, Users, CheckCircle, Clock, TrendingUp } from "lucide-react";

export function Overview() {
  const stats = [
    {
      name: "Active Jobs",
      value: "24",
      icon: Briefcase,
      change: "+3",
      changeType: "increase",
    },
    {
      name: "Total Applications",
      value: "342",
      icon: Users,
      change: "+28%",
      changeType: "increase",
    },
    {
      name: "Hired",
      value: "45",
      icon: CheckCircle,
      change: "+5",
      changeType: "increase",
    },
    {
      name: "Time to Hire",
      value: "18 days",
      icon: Clock,
      change: "-2 days",
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Applications
            </h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    Senior Software Engineer
                  </p>
                  <p className="text-sm text-gray-500">4 new applications</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Hiring Pipeline
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { stage: "Applied", count: 156, color: "blue" },
              { stage: "Screening", count: 48, color: "yellow" },
              { stage: "Interview", count: 24, color: "purple" },
              { stage: "Offer", count: 8, color: "green" },
            ].map((stage) => (
              <div
                key={stage.stage}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium text-gray-600">
                  {stage.stage}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {stage.count}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full bg-${stage.color}-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
