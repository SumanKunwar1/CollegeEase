import { TrendingUp, Users, Clock, MapPin } from "lucide-react";

export function Analytics() {
  const metrics = [
    {
      name: "Application Rate",
      value: "+12.3%",
      description: "vs last month",
      icon: TrendingUp,
      trend: "up",
    },
    {
      name: "Total Candidates",
      value: "1,234",
      description: "this month",
      icon: Users,
      trend: "up",
    },
    {
      name: "Time to Hire",
      value: "18 days",
      description: "on average",
      icon: Clock,
      trend: "down",
    },
    {
      name: "Top Location",
      value: "New York",
      description: "32% of candidates",
      icon: MapPin,
      trend: "neutral",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">
          Track recruitment metrics and hiring performance
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
            Popular Job Categories
          </h3>
          <div className="space-y-4">
            {[
              { category: "Engineering", percentage: 45 },
              { category: "Product", percentage: 25 },
              { category: "Design", percentage: 15 },
              { category: "Marketing", percentage: 15 },
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

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Hiring Pipeline Performance
          </h3>
          <div className="space-y-4">
            {[
              {
                stage: "Application to Screen",
                value: "2 days",
                trend: "down",
              },
              { stage: "Screen to Interview", value: "5 days", trend: "up" },
              { stage: "Interview to Offer", value: "7 days", trend: "down" },
              { stage: "Offer to Accept", value: "4 days", trend: "neutral" },
            ].map((stage) => (
              <div
                key={stage.stage}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-700">
                  {stage.stage}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {stage.value}
                  </span>
                  <TrendingUp
                    className={`w-4 h-4 ${
                      stage.trend === "up"
                        ? "text-green-500 rotate-0"
                        : stage.trend === "down"
                        ? "text-red-500 rotate-180"
                        : "text-gray-500 rotate-90"
                    }`}
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
