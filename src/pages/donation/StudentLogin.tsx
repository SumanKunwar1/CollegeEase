import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { storage } from "../../data/donationregistration";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const student = storage
      .getStudents()
      .find((s) => s.email === email && s.password === password);

    if (student) {
      storage.setCurrentUser(student);
      toast.success("Login successful!");
      navigate("/donate/student-dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left Side: Image */}
        <div className="hidden md:block w-1/2 bg-blue-600">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
            alt="Login Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <LogIn className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              Student Login
            </h1>
            <p className="text-gray-600">
              Welcome back! Please log in to continue.
            </p>
          </div>
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
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register" // Replace with your registration route
                className="text-blue-600 hover:underline"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
