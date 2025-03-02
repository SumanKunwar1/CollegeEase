import { useParams, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Star,
  UserPlus,
  Landmark,
  FileText,
} from "lucide-react";
import { Overview } from "./Overview";
import AboutInstitute from "./AboutInstitute";
import { Reviews } from "./Review";
import { Admissions } from "./Admission";
import { Applications } from "./Application";

const navigation = [
  { name: "Overview", href: "", icon: LayoutDashboard },
  { name: "About Institute", href: "about-institute", icon: Landmark },
  { name: "Reviews", href: "reviews", icon: Star },
  { name: "Admissions", href: "admissions", icon: UserPlus },
  { name: "Applications", href: "applications", icon: FileText },
];

export function InstituteDashboard() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  const renderContent = () => {
    switch (currentPath) {
      case "about institute":
        return <AboutInstitute />;
      case "reviews":
        return <Reviews />;
      case "admissions":
        return <Admissions />;
      case "applications":
        return <Applications />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Navigation */}
      <div className="mb-8 border-b">
        <nav className="flex space-x-8">
          {navigation.map((item) => {
            const isActive =
              currentPath === item.href || (!currentPath && !item.href);

            return (
              <Link
                key={item.name}
                to={`/dashboard/institute/${id}/${item.href}`}
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

      {/* Content Area */}
      <div className="py-4">{renderContent()}</div>
    </div>
  );
}
