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
      // Client-side validation
      if (!formData.email || !formData.password || !formData.fullName || 
          !formData.cause || !formData.description || !formData.amountNeeded) {
        toast.error('Please fill all required fields');
        setIsSubmitting(false);
        return;
      }
      
      if (files.length === 0) {
        toast.error('Please upload at least one document');
        setIsSubmitting(false);
        return;
      }
      
      if (files.length > 3) {
        toast.error('Maximum 3 files allowed');
        setIsSubmitting(false);
        return;
      }

      // Check file sizes
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large (max 5MB)`);
          setIsSubmitting(false);
          return;
        }
        if (file.type !== 'application/pdf') {
          toast.error(`File ${file.name} must be a PDF`);
          setIsSubmitting(false);
          return;
        }
      }

      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("cause", formData.cause);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("amountNeeded", formData.amountNeeded);
      formDataToSend.append("password", formData.password);
      
      files.forEach((file) => {
        formDataToSend.append("documents", file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/students/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // Increased timeout to 60 seconds
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(`Upload progress: ${percentCompleted}%`);
            }
          }
        }
      );
      
      if (response.data.success) {
        toast.success("Registration successful!");
        navigate("/donate/student-dashboard");
      } else {
        toast.error(response.data.message || "Registration completed but with warnings");
      }
    } catch (error: any) {
      console.error("Full registration error:", error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else if (error.response) {
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred");
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
                  accept=".pdf"
                  className="w-full bg-transparent focus:outline-none"
                  onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
                  multiple
                />
              </div>
              {files.length > 0 && (
                <div className="text-sm text-gray-500">
                  Selected files: {files.map(f => f.name).join(', ')}
                </div>
              )}

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