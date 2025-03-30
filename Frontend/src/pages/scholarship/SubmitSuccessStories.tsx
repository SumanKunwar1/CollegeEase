import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Upload,
  User,
  GraduationCap,
  Award,
  MessageCircle,
} from "lucide-react";

const ScholarshipSubmitSuccessStory: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    university: "",
    major: "",
    amountRaised: "",
    quote: "",
    impact: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setImageFile(file);
      } else {
        alert("Please upload a valid image file (JPG, JPEG, PNG)");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Story:", formData, imageFile);
    navigate("/scholarships/success-stories");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Share Your Success Story
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <User className="text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-3 py-2 bg-transparent focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Upload className="text-gray-400" />
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleImageChange}
              className="w-full px-3 py-2 bg-transparent focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <GraduationCap className="text-gray-400" />
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="University"
              className="w-full px-3 py-2 bg-transparent focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Award className="text-gray-400" />
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="Major"
              className="w-full px-3 py-2 bg-transparent focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Award className="text-gray-400" />
            <input
              type="number"
              name="amountRaised"
              value={formData.amountRaised}
              onChange={handleChange}
              placeholder="Amount Raised"
              className="w-full px-3 py-2 bg-transparent focus:outline-none"
              required
            />
          </div>
          <div className="flex items-start border rounded-lg px-3 py-2 bg-gray-50">
            <MessageCircle className="text-gray-400 mt-2" />
            <textarea
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              placeholder="Your Quote"
              className="w-full px-3 py-2 bg-transparent focus:outline-none"
              required
            />
          </div>
          <div className="flex items-start border rounded-lg px-3 py-2 bg-gray-50">
            <MessageCircle className="text-gray-400 mt-2" />
            <textarea
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              placeholder="Impact & Achievements (comma separated)"
              className="w-full px-3 py-2 bg-transparent focus:outline-none"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Submit Story
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipSubmitSuccessStory;
