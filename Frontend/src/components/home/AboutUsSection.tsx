import type React from "react";
import { motion } from "framer-motion";

const AboutUsPreview: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About CollegeEase
          </h2>
          <p className="text-xl text-gray-600">
            Empowering Your Educational Journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/Public/Assets/images/Harvard University.jpg"
              alt="CollegeEase Campus"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to CollegeEase
            </h3>
            <p className="text-lg text-gray-600 mb-2 text-justify">
            CollegeEase is your trusted companion in navigating the world of higher education. We simplify the often overwhelming process of choosing the right college, applying for admission, and finding scholarships—all in one place. Our platform offers clear guidance, expert insights, and updated resources to help students make informed decisions about their academic future. Whether you're a high school senior or planning to continue your education, CollegeEase ensures you have the support you need to move forward with confidence. We also connect students with real success stories, financial aid, and personalized support to turn dreams into achievable goals...



            <a
              href="/about-us"
              className="text-blue-600 hover:text-blue-800 italic underline"
            >
              Learn More
            </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPreview;
