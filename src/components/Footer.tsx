import { GraduationCap, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">CollegeEase</span>
            </div>
            <p className="text-gray-400 text-sm">
              Making higher education accessible and transparent for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/colleges"
                  className="text-gray-400 hover:text-indigo-400 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Find Colleges
                </a>
              </li>
              <li>
                <a
                  href="/scholarships"
                  className="text-gray-400 hover:text-indigo-400 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Scholarships
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="text-gray-400 hover:text-indigo-400 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="/connect"
                  className="text-gray-400 hover:text-indigo-400 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Connect
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@collegeease.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                <span>+977 9850894347</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CollegeEase. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
