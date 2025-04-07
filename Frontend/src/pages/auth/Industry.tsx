import { useParams, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Briefcase, Users, LineChart } from "lucide-react";
import { Overview } from "./dashboard/industry/Overview";
import { Jobs } from "./dashboard/industry/Jobs";
import { IndustryApplications } from "./dashboard/industry/Application";
import { Analytics } from "./dashboard/industry/Analystics";

const navigation = [
  { name: "Overview", href: "", icon: LayoutDashboard },
  { name: "Jobs", href: "jobs", icon: Briefcase },
  { name: "Applications", href: "applications", icon: Users },
  { name: "Analytics", href: "analytics", icon: LineChart },
];

export function IndustryDashboard() {
  const location = useLocation();
  const { organizationName } = useParams<{ organizationName: string }>();
  const currentPath = location.pathname.split("/").pop();

  const renderContent = () => {
    switch (currentPath) {
      case "jobs":
        return <Jobs />;
      case "applications":
        return <IndustryApplications />;
      case "analytics":
        return <Analytics />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mb-8 border-b">
        <nav className="flex space-x-8">
          {navigation.map((item) => {
            const isActive =
              currentPath === item.href || (!currentPath && !item.href);

            return (
              <Link
                key={item.name}
                to={`/dashboard/industry/${organizationName}/${item.href}`}
                className={`
                  flex items-center px-1 py-4 text-sm font-medium border-b-2 
                  ${
                    isActive
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="py-4">{renderContent()}</div>
    </div>
  );
}

export default IndustryDashboard;