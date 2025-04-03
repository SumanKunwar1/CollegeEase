import { Toaster } from "react-hot-toast";
import { GraduationCap, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";


function DonationPage() {
  const navigate = useNavigate();

  const handleStudentRegistrationClick = () => {
    navigate("/donate/student-registration");
  };

  const handleStudentLoginClick = () => {
    navigate("/donate/student-login");
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

          
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default DonationPage;
