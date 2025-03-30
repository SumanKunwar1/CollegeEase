import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminFeatureCard from "../../../components/AdminFeatureCard";
import { features, benefits } from "../../../../src/data/aboutUs";

const AdminAboutCollegeEase: React.FC = () => {
  // State for editable content
  const [aboutData, setAboutData] = useState({
    title: "About CollegeEase",
    tagline: "Empowering Your Educational Journey",
    welcomeTitle: "Welcome to CollegeEase",
    welcomeDescription:
      "CollegeEase is your ultimate companion in navigating the world of higher education. We aim to simplify the often overwhelming process of selecting the right college, applying for admission, and finding scholarships, all in one place. Our platform provides easy-to-follow guidance, expert insights, and up-to-date resources that empower students to make well-informed decisions about their academic futures. Whether you're a high school senior or someone looking to further your education, CollegeEase is here to ensure you have everything you need to take the next step with confidence.",
    featuresTitle: "What We Offer",
    benefitsTitle: "Why Choose CollegeEase?",
    ctaTitle: "Join Us in Simplifying Education",
    ctaDescription:
      "Whether you're a high school student exploring options, a parent supporting your child's dreams, or a professional looking for further education, CollegeEase is your trusted partner in unlocking your educational future.",
    ctaButtonText: "Start your journey today",
  });

  // State for images
  const [image, setImage] = useState(
    "/Public/Assets/images/Harvard University.jpg"
  );

  // Handle text changes
  const handleTextChange = (field: string, value: string) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updates
  const handleSave = () => {
    console.log("Updated Data:", aboutData);
    console.log("Updated Image:", image);
    alert("Changes saved successfully!");
  };

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
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange("title", e.target.innerText)}
            className="text-5xl font-bold text-gray-900 mb-4 outline-none"
          >
            {aboutData.title}
          </h1>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange("tagline", e.target.innerText)}
            className="text-xl text-gray-600 outline-none"
          >
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
              src={image}
              alt="CollegeEase Campus"
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleTextChange("welcomeTitle", e.target.innerText)
              }
              className="text-3xl font-semibold text-gray-800 mb-4 outline-none"
            >
              {aboutData.welcomeTitle}
            </h2>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleTextChange("welcomeDescription", e.target.innerText)
              }
              className="text-lg text-gray-600 outline-none"
            >
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
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              handleTextChange("featuresTitle", e.target.innerText)
            }
            className="text-3xl font-semibold text-gray-800 mb-8 text-center outline-none"
          >
            {aboutData.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AdminFeatureCard
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
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              handleTextChange("benefitsTitle", e.target.innerText)
            }
            className="text-3xl font-semibold text-gray-800 mb-8 outline-none"
          >
            {aboutData.benefitsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const updatedBenefits = [...benefits];
                    updatedBenefits[index] = e.target.innerText;
                    console.log("Updated Benefits:", updatedBenefits);
                  }}
                  className="text-gray-700 outline-none"
                >
                  {benefit}
                </p>
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
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange("ctaTitle", e.target.innerText)}
            className="text-3xl font-semibold text-gray-800 mb-4 outline-none"
          >
            {aboutData.ctaTitle}
          </h2>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              handleTextChange("ctaDescription", e.target.innerText)
            }
            className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto outline-none"
          >
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

        {/* Save Update Button */}
        <div className="text-center mt-16">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutCollegeEase;
