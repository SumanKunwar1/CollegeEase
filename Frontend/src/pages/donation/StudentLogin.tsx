import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/students/login`,
        { 
          email, 
          password 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: (status) => status < 500 // Don't throw error for 401
        }
      );

      if (response.data.success) {
        toast.success("Login successful!");
        // Navigate to dashboard with student name
        navigate(`/donate/student-dashboard/${encodeURIComponent(response.data.student.fullName)}`);
      } else {
        toast.error(response.data.message || "Invalid email or password");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.response) {
        // Show specific error message from backend
        toast.error(error.response.data.message || "Invalid email or password");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Student Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
            <Mail className="h-5 w-5 text-blue-600" />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full bg-transparent focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
            <Lock className="h-5 w-5 text-blue-600" />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin inline" />
                Logging in...
              </>
            ) : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a 
            href="/donate/student-registration" 
            className="text-blue-600 hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}