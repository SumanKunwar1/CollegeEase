import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard";
import { features, benefits } from "../../src/data/aboutUs";

const AboutCollegeEase: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About CollegeEase
          </h1>
          <p className="text-xl text-gray-600">
            Empowering Your Educational Journey
          </p>
        </motion.div>

        {/* Welcome Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
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
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Welcome to CollegeEase
            </h2>
            <p className="text-lg text-gray-600">
              CollegeEase is your ultimate companion in navigating the world of
              higher education. We aim to simplify the often overwhelming
              process of selecting the right college, applying for admission,
              and finding scholarships, all in one place. Our platform provides
              easy-to-follow guidance, expert insights, and up-to-date resources
              that empower students to make well-informed decisions about their
              academic futures. Whether you're a high school senior or someone
              looking to further your education, CollegeEase is here to ensure
              you have everything you need to take the next step with
              confidence.
            </p>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Why Choose CollegeEase?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p className="text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Join Us in Simplifying Education
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're a high school student exploring options, a parent
            supporting your child's dreams, or a professional looking for
            further education, CollegeEase is your trusted partner in unlocking
            your educational future.
          </p>
          <motion.a
            href="/colleges"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start your journey today
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutCollegeEase;
