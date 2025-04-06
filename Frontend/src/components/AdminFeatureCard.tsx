// src/components/AboutCollegeEase/FeatureCard.tsx
import { motion } from "framer-motion";
import { FeatureCardProps } from "../types/aboutus";

const AdminFeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    contentEditable
    suppressContentEditableWarning
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-4xl text-blue-600 mb-4">{icon}</div>
    <h3
      className="text-xl font-semibold text-gray-800 mb-2"
      contentEditable
      suppressContentEditableWarning
    >
      {title}
    </h3>
    <p className="text-gray-600" contentEditable suppressContentEditableWarning>
      {description}
    </p>
  </motion.div>
);

export default AdminFeatureCard;
