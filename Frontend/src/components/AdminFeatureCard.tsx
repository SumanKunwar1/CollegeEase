// src/components/AdminFeatureCard.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminFeatureCard = ({ 
  icon, 
  title, 
  description,
  onTitleChange,
  onDescriptionChange
}: FeatureCardProps) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-4xl text-blue-600 mb-4">{icon}</div>
    <div className="space-y-2">
      <input
        value={title}
        onChange={onTitleChange}
        className="text-xl font-semibold text-gray-800 w-full bg-transparent border-b border-gray-200 focus:border-blue-500 focus:outline-none"
      />
      <input
        value={description}
        onChange={onDescriptionChange}
        className="text-gray-600 w-full bg-transparent border-b border-gray-200 focus:border-blue-500 focus:outline-none"
      />
    </div>
  </motion.div>
);

export default AdminFeatureCard;