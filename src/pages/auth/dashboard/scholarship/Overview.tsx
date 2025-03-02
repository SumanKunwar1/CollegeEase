import { GraduationCap, Users, DollarSign, Clock } from "lucide-react";

export function Overview() {
  const stats = [
    {
      name: "Active Scholarships",
      value: "12",
      icon: GraduationCap,
      change: "+2",
      changeType: "increase",
    },
    {
      name: "Total Applications",
      value: "1,245",
      icon: Users,
      change: "+15%",
      changeType: "increase",
    },
    {
      name: "Funds Disbursed",
      value: "$245,000",
      icon: DollarSign,
      change: "+$45,000",
      changeType: "increase",
    },
    {
      name: "Processing Time",
      value: "5 days",
      icon: Clock,
      change: "-1 day",
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Applications
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">Merit Scholarship</p>
                  <p className="text-sm text-gray-500">8 new applications</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Scholarship Distribution
          </h3>
          <div className="space-y-4">
            {[
              { category: "Merit-based", percentage: 40 },
              { category: "Need-based", percentage: 30 },
              { category: "Sports", percentage: 15 },
              { category: "Research", percentage: 15 },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {item.category}
                  </span>
                  <span className="text-gray-600">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
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
