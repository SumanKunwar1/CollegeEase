import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const GroupRegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for registering. You will receive a confirmation email
            shortly with all the session details.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupRegistrationSuccess;
