import { Toaster, toast } from "react-hot-toast";
import { GraduationCap, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
} from "../types/firebase";

function DonationPage() {
  const navigate = useNavigate();

  const handleStudentRegistrationClick = () => {
    navigate("/donate/student-registration");
  };

  const handleStudentLoginClick = () => {
    navigate("/donate/student-login");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      toast.success(`Logged in as ${user.displayName || user.email}`);
      navigate("/donate/student-dashboard"); // Redirect to dashboard after login
    } catch (error) {
      toast.error("Failed to log in with Google");
      console.error(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      toast.success(`Logged in as ${user.displayName || user.email}`);
      navigate("/donate/student-dashboard"); // Redirect to dashboard after login
    } catch (error) {
      toast.error("Failed to log in with Facebook");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left Side: Image */}
        <div className="hidden md:block w-1/2 bg-blue-600">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
            alt="Donation Page Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Options */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              Welcome to CollegeEase
            </h1>
            <p className="text-gray-600">
              Choose an option to get started with CollegeEase.
            </p>
          </div>

          {/* Register as Student */}
          <div className="mb-6">
            <button
              onClick={handleStudentRegistrationClick}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Register as Student
            </button>
          </div>

          {/* Login as Student */}
          <div className="mb-6">
            <button
              onClick={handleStudentLoginClick}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login as Student
            </button>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
            >
              <img
                src="https://img.icons8.com/color/24/000000/google-logo.png"
                alt="Google Logo"
                className="h-5 w-5 mr-2"
              />
              Login with Google
            </button>
            <button
              onClick={handleFacebookLogin}
              className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-300 flex items-center justify-center"
            >
              <img
                src="https://img.icons8.com/color/24/000000/facebook-new.png"
                alt="Facebook Logo"
                className="h-5 w-5 mr-2"
              />
              Login with Facebook
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default DonationPage;
