import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard";
import { 
  FaSearch, 
  FaTrophy, 
  FaVrCardboard, 
  FaGraduationCap, 
  FaRobot, 
  FaUserFriends, 
  FaBriefcase, 
  FaComments 
} from "react-icons/fa";

interface AboutUsData {
  title: string;
  tagline: string;
  welcomeTitle: string;
  welcomeDescription: string;
  featuresTitle: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefitsTitle: string;
  benefits: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  imageUrl: string;
}

const AboutCollegeEase: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping
  const iconComponents: { [key: string]: React.ComponentType<any> } = {
    FaSearch,
    FaTrophy,
    FaVrCardboard,
    FaGraduationCap,
    FaRobot,
    FaUserFriends,
    FaBriefcase,
    FaComments
  };

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/aboutus`);
        if (!response.ok) {
          throw new Error('Failed to fetch about us data');
        }
        const data = await response.json();
        setAboutData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {aboutData.title}
          </h1>
          <p className="text-xl text-gray-600">
            {aboutData.tagline}
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
              src={aboutData.imageUrl || "/Public/Assets/images/Harvard University.jpg"}
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
              {aboutData.welcomeTitle}
            </h2>
            <p className="text-lg text-gray-600 text-justify">
              {aboutData.welcomeDescription}
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
            {aboutData.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.features.map((feature, index) => {
              const IconComponent = iconComponents[feature.icon];
              return (
                <FeatureCard
                  key={index}
                  icon={IconComponent ? <IconComponent /> : null}
                  title={feature.title}
                  description={feature.description}
                />
              );
            })}
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
            {aboutData.benefitsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.benefits.map((benefit, index) => (
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
            {aboutData.ctaTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            {aboutData.ctaDescription}
          </p>
          <motion.a
            href="/colleges"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {aboutData.ctaButtonText}
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutCollegeEase;