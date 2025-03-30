import React, { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  Heart,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronDown,
  Lightbulb,
  School,
  BookOpen,
  UsersRound,
  User,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State for profile dropdown
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { title: "Home", icon: School, path: "/admin/home" },
    { title: "About-Us", icon: BookOpen, path: "/admin/about-us" },
    {
      title: "Colleges",
      icon: GraduationCap,

      dropdown: [
        { name: "Colleges", path: "/admin/colleges" },
        { name: "Search & Compare", path: "/admin/colleges/search-compare" },
        { name: "College Rankings", path: "/admin/colleges/rankings" },
        { name: "Virtual Tours", path: "/admin/colleges/virtual-tours" },
        {
          name: "Application Guides",
          path: "/admin/colleges/application-guides",
        },
        { name: "College Registration", path: "/admin/colleges/registration" },
      ],
    },
    {
      title: "Scholarships",
      icon: Award,
      dropdown: [
        {
          name: "Scholarship Finder",
          path: "/admin/scholarships/scholarships-finder",
        },
        {
          name: "Smart Predictor",
          path: "/admin/scholarships/smart-predictor",
        },
        {
          name: "Application Guides",
          path: "/admin/scholarships/application-guide",
        },
        {
          name: "Success Stories",
          path: "/admin/scholarships/success-stories",
        },
      ],
    },
    {
      title: "Donations",
      icon: Heart,
      dropdown: [
        { name: "Donation", path: "/admin/donate" },
        { name: "Student Profiles", path: "/admin/donate/student-profile" },
        { name: "Success Stories", path: "/admin/donate/success-stories" },
        { name: "How It Works", path: "/admin/donate/how-it-works" },
      ],
    },
    {
      title: "Mentorship",
      icon: MessageSquare,
      dropdown: [
        { name: "Find a Mentor", path: "/admin/mentorship/find-mentor" },
        { name: "Group Sessions", path: "/admin/mentorship/group-session" },
        { name: "Resources", path: "/admin/mentorship/resources" },
      ],
    },
    {
      title: "Insights",
      icon: Lightbulb,
      dropdown: [
        { name: "Industry Trends", path: "/admin/insights/industry-trends" },
        {
          name: "Skill Development",
          path: "/admin/insights/skill-development",
        },
        {
          name: "Expert Interviews",
          path: "/admin/insights/expert-interviews",
        },
        {
          name: "Job Market Analysis",
          path: "/admin/insights/job-market-analysis",
        },
        {
          name: "Internship & Job",
          path: "/admin/insights/job-and-internship",
        },
      ],
    },
    { title: "User Registrtion", icon: User, path: "/admin/registration" },
    { title: "Settings", icon: Settings, path: "/admin/settings" },
    {
      title: "Footer",
      icon: UsersRound,
      dropdown: [
        { name: "FAQ", path: "/admin/faqs" },
        { name: "Blogs", path: "/admin/blog" },
        { name: "Cookies", path: "/admin/cookies" },
        { name: "Privacy Policy", path: "/admin/privacy-policy" },
        {
          name: "Terms Of Service",
          path: "/admin/terms-of-service",
        },
        {
          name: "Support",
          path: "/admin/support",
        },
      ],
    },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/login");
  };

  const handleChangePassword = () => {
    // Implement change password logic here
    navigate("/admin/change-password");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">Admin</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Scrollable Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => (
                <div key={item.title}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.title ? null : item.title
                          )
                        }
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {openDropdown === item.title && (
                        <div className="ml-6 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.path}
                              href={subItem.path}
                              className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? "bg-indigo-600 text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 overflow-y-auto">
        {/* Admin Profile Section */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex justify-end items-center p-4">
            <div className="relative">
              {/* Profile Icon */}
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              >
                <User className="h-5 w-5 text-gray-700" />
              </button>

              {/* Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-2">
                    <div className="px-4 py-2 text-sm text-gray-700">Admin</div>
                    <button
                      onClick={handleChangePassword}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-600"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-600"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
