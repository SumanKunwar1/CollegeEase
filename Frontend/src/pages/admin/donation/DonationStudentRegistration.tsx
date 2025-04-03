import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, User, Mail, BookOpen, FileText, DollarSign, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const CAUSES = [
  "Tuition Fees",
  "Books and Supplies",
  "Technology Equipment",
  "Transportation",
  "Housing",
];

export default function StudentRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    cause: "",
    description: "",
    amountNeeded: "",
    password: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Validate files
      if (files.some(file => file.size > 5 * 1024 * 1024)) {
        throw new Error('One or more files exceed 5MB limit');
      }
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('cause', formData.cause);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('amountNeeded', formData.amountNeeded);
      formDataToSend.append('password', formData.password);
      files.forEach((file, index) => {
        formDataToSend.append(`documents[${index}]`, file, file.name);
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 1 minute timeout
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/students/register`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          signal: controller.signal,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            console.log(`Upload progress: ${percentCompleted}%`);
          },
          maxBodyLength: 10 * 1024 * 1024, // 10MB
          maxContentLength: 10 * 1024 * 1024 // 10MB
        }
      );
      clearTimeout(timeoutId);
      if (response.data.success) {
        toast.success('Registration successful!');
        navigate('/donate/student-dashboard');
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (axios.isCancel(error)) {
        toast.error('Request timed out. Please try again.');
      } else if (error.response) {
        toast.error(error.response.data?.message || 'Registration failed');
      } else if (error.request) {
        toast.error('No response from server. Check your connection.');
      } else {
        toast.error(error.message || 'An error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Student Registration</h1>
            <p className="text-gray-600">Register to receive support for your educational needs.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Full Name */}
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              {/* Cause */}
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <select
                  required
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.cause}
                  onChange={(e) => setFormData({...formData, cause: e.target.value})}
                >
                  <option value="">Select a cause</option>
                  {CAUSES.map((cause) => (
                    <option key={cause} value={cause}>{cause}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                <textarea
                  required
                  placeholder="Description of Need"
                  rows={3}
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Amount Needed */}
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <input
                  type="number"
                  required
                  placeholder="Amount Needed ($)"
                  min="0"
                  step="0.01"
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.amountNeeded}
                  onChange={(e) => setFormData({...formData, amountNeeded: e.target.value})}
                />
              </div>

              {/* File Upload */}
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
                <input
                  type="file"
                  className="w-full bg-transparent focus:outline-none"
                  onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
                  multiple
                />
              </div>

              {/* Password */}
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}