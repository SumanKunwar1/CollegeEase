import React from "react";
import { GraduationCap, Menu, X, ChevronDown, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationProps {
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    {
      name: "Colleges",
      path: "/colleges",
      dropdown: [
        { name: "Search & Compare", path: "/colleges/search-compare" },
        { name: "College Rankings", path: "/colleges/rankings" },
        { name: "Virtual Tours", path: "/colleges/virtual-tours" },
        { name: "Application Guides", path: "/colleges/application-guides" },
      ],
    },
    {
      name: "Scholarships",
      path: "/scholarships",
      dropdown: [
        {
          name: "Scholarship Finder",
          path: "/scholarships/scholarships-finder",
        },
        { name: "Smart Predictor", path: "/scholarships/smart-predictor" },
        {
          name: "Application Guides",
          path: "/scholarships/application-guide",
        },
        { name: "Success Stories", path: "/scholarships/success-stories" },
      ],
    },
    {
      name: "Donation",
      path: "/donate",
      dropdown: [
        { name: "Student Profiles", path: "/donate/student-profile" },
        { name: "Success Stories", path: "/donate/success-stories" },
        { name: "How It Works", path: "/donate/how-it-works" },
      ],
    },
    {
      name: "Mentorship",
      path: "#",
      dropdown: [
        { name: "Find a Mentor", path: "/mentorship/find-mentor/" },
        { name: "Become a Mentor", path: "/mentorship/became-mentor" },
        { name: "Group Sessions", path: "/mentorship/group-session" },
        { name: "Resources", path: "/mentorship/resources" },
      ],
    },
    {
      name: "Insights",
      path: "#",
      dropdown: [
        { name: "Industry Trends", path: "/insights/industry-trends" },
        { name: "Skill Development", path: "/insights/skill-development" },
        { name: "Expert Interviews", path: "/insights/expert-interviews" },
        { name: "Job Market Analysis", path: "/insights/job-market-analysis" },
        { name: "Internship & Job", path: "insights/job-and-internship" },
      ],
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex-shrink-0 flex items-center cursor-pointer"
              >
                <GraduationCap className="h-6 w-6 text-gray-900" />
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  CollegeEase
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center">
              <div className="flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() =>
                      item.dropdown && setActiveDropdown(item.name)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      onClick={handleNavClick}
                      className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                      {item.dropdown && (
                        <ChevronDown className="inline-block ml-1 h-4 w-4" />
                      )}
                    </Link>
                    {item.dropdown && activeDropdown === item.name && (
                      <div className="absolute left-0 w-56 mt-1 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={handleNavClick}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center ml-8 space-x-4">
                <Link to="/sign-up">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-gray-800 transition-colors duration-200">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        item.dropdown
                          ? toggleDropdown(item.name)
                          : handleNavClick()
                      }
                    >
                      <Link to={item.path} onClick={handleNavClick}>
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                    {item.dropdown && activeDropdown === item.name && (
                      <div className="pl-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={handleNavClick}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Auth Buttons for Mobile */}
              <div className="px-2 pt-2 pb-3">
                <Link to="/sign-up">
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-gray-800 transition-colors duration-200">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
