"use client";

import type React from "react";
import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";

// Simple button component
const Button = ({
  children,
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple input component
const Input = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
}) => {
  return (
    <input
      className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">CollegeEase</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Ensuring that higher education is accessible, transparent, and
              easy to navigate for every student, empowering them with the right
              resources and support to succeed.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                Subscribe to Newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="h-9 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/colleges"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Find Colleges
                </a>
              </li>
              <li>
                <a
                  href="/scholarships"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Scholarships
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="/connect"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Connect
                </a>
              </li>
              <li>
                <a
                  href="/success-stories"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="mentorship/find-mentor/
"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Mentorship
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blog"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="text-gray-400 hover:text-yellow-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2 text-blue-500" />
                <span>support@collegeease.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2 text-blue-500" />
                <span>+977 9850894347</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-200 p-2 rounded-full transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-gray-100" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-1 pt-3">
          <div className="max-w-md mx-auto flex flex-col items-center">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} CollegeEase. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
