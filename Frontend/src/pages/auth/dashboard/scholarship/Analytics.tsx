import { TrendingUp, Users, DollarSign, Award } from "lucide-react";

export function ScholarshipAnalytics() {
  const metrics = [
    {
      name: "Success Rate",
      value: "68%",
      description: "approved applications",
      icon: TrendingUp,
      trend: "up",
    },
    {
      name: "Total Recipients",
      value: "856",
      description: "this year",
      icon: Users,
      trend: "up",
    },
    {
      name: "Average Award",
      value: "$12,500",
      description: "per recipient",
      icon: DollarSign,
      trend: "up",
    },
    {
      name: "Programs",
      value: "12",
      description: "active programs",
      icon: Award,
      trend: "neutral",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">
          Track scholarship metrics and impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <metric.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {metric.name}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-500">{metric.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Distribution by Field of Study
          </h3>
          <div className="space-y-4">
            {[
              { field: "Engineering", percentage: 35 },
              { field: "Sciences", percentage: 25 },
              { field: "Business", percentage: 20 },
              { field: "Arts & Humanities", percentage: 20 },
            ].map((item) => (
              <div key={item.field}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {item.field}
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

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Monthly Fund Distribution
          </h3>
          <div className="space-y-4">
            {[
              { month: "January", amount: 125000 },
              { month: "February", amount: 150000 },
              { month: "March", amount: 175000 },
              { month: "April", amount: 200000 },
            ].map((item) => (
              <div
                key={item.month}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700">
                  {item.month}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    ${item.amount.toLocaleString()}
                  </span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
