import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

interface RequestResourceFormProps {
  onClose: () => void;
}

const RequestResourceForm: React.FC<RequestResourceFormProps> = ({
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    academicBackground: "",
    country: "",
    requestedResources: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      age: "",
      academicBackground: "",
      country: "",
      requestedResources: "",
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Request Resources
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
              placeholder="Enter your age"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="academicBackground"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Academic Background
          </label>
          <input
            type="text"
            id="academicBackground"
            name="academicBackground"
            value={formData.academicBackground}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
            placeholder="Enter your academic background"
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
            placeholder="Enter your country"
          />
        </div>
        <div>
          <label
            htmlFor="requestedResources"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Requested Resources
          </label>
          <textarea
            id="requestedResources"
            name="requestedResources"
            value={formData.requestedResources}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out resize-none"
            placeholder="Describe the resources you need"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Submit Request
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RequestResourceForm;
