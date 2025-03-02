import React, { useState } from "react";
import { motion } from "framer-motion";

const AboutUsPreview: React.FC = () => {
  // State for editable content
  const [aboutData, setAboutData] = useState({
    title: "About CollegeEase",
    tagline: "Empowering Your Educational Journey",
    welcomeTitle: "Welcome to CollegeEase",
    welcomeDescription:
      "CollegeEase is your ultimate companion in navigating the world of higher education. We aim to simplify the often overwhelming process of selecting the right college, applying for admission, and finding scholarships, all in one place. Our platform provides easy-to-follow guidance, expert insights, and up-to-date resources that empower students to make well-informed decisions about their academic futures. Whether you're a high school senior or someone looking to further your education, CollegeEase is here to ensure you have everything you need to take the next step with confidence.",
    learnMoreLink: "/about-us",
  });

  // State for image
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
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange("title", e.target.innerText)}
            className="text-4xl font-bold text-gray-900 mb-4 outline-none"
          >
            {aboutData.title}
          </h2>
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
        <div className="grid md:grid-cols-2 gap-12">
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
            <h3
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleTextChange("welcomeTitle", e.target.innerText)
              }
              className="text-2xl font-semibold text-gray-800 mb-4 outline-none"
            >
              {aboutData.welcomeTitle}
            </h3>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleTextChange("welcomeDescription", e.target.innerText)
              }
              className="text-lg text-gray-600 mb-2 outline-none"
            >
              {aboutData.welcomeDescription}
            </p>
            <a
              href={aboutData.learnMoreLink}
              className="text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Save Update Button */}
        <div className="text-center mt-12">
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

export default AboutUsPreview;
