import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const SubmitSuccessStory: React.FC = () => {
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
    // Handle form submission logic (e.g., send data to backend)
    console.log("Submitted Story:", formData, imageFile);
    navigate("/donate/success-stories");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Submit Your Success Story
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="Major"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="number"
            name="amountRaised"
            value={formData.amountRaised}
            onChange={handleChange}
            placeholder="Amount Raised"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            placeholder="Your Quote"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            name="impact"
            value={formData.impact}
            onChange={handleChange}
            placeholder="Impact & Achievements (comma separated)"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <Button type="submit" className="w-full bg-blue-500 text-white">
            Submit Story
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SubmitSuccessStory;
