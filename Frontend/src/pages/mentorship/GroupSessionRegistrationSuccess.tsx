import  { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const GroupSessionRegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, registration } = location.state || {};

  useEffect(() => {
    // Verify payment only if we have the required data
    if (registration?.paymentId && registration?.orderId) {
      verifyPayment(registration.paymentId, registration.orderId);
    } else {
      console.error('Missing payment verification parameters');
      navigate('/'); // Redirect to home if missing data
    }
  }, []);

  const verifyPayment = async (paymentId: string, orderId: string) => {
    try {
      const response = await apiClient.get(`/payments/group-paypal/verify-payment`, {
        params: { paymentId, orderId }
      });
      
      if (!response.data.success) {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      // Don't redirect here - just show error to user
    }
  };

  if (!session || !registration) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration details not found</h2>
          <button 
            onClick={() => navigate('/')} 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
          <p className="text-gray-600 mb-6">
            You're now registered for {session.title} with {session.mentor}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Registration Details</h3>
            <p className="text-sm text-gray-600">Date: {session.date}</p>
            <p className="text-sm text-gray-600">Time: {session.time}</p>
            <p className="text-sm text-gray-600">Amount: ${registration.amount}</p>
            <p className="text-sm text-gray-600">Payment ID: {registration.paymentId}</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupSessionRegistrationSuccess;