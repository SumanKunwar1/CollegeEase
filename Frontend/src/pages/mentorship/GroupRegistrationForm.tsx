// Import necessary React and other dependencies
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios, { AxiosError } from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Define interface for API response structure
interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  orderId?: string;
  paymentId?: string;
  amount?: number;
}

// Define interface for Group Session data
interface GroupSession {
  _id: string;
  title: string;
  mentor: string;
  date: string;
  time: string;
  price: string;
}

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Main component definition
const RegistrationForm = () => {
  // Get route parameters and navigation function
  const { id } = useParams();
  const navigate = useNavigate();

  // Component state definitions
  const [session, setSession] = useState<GroupSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | null>(null);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch group session data on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await apiClient.get<GroupSession>(`/group-sessions/${id}`);
        setSession(response.data);
        setIsLoading(false);
      } catch (err) {
        const error = err as AxiosError<ApiResponse>;
        setError(error.response?.data?.message || "Failed to load session details");
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create PayPal order function
  const createPayPalOrder = async (): Promise<string> => {
    try {
      const response = await apiClient.post<ApiResponse>(
        `/payments/group-paypal/create-order`,
        {
          groupSessionId: id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        }
      );
      
      if (!response.data.orderId) {
        throw new Error("No order ID received");
      }

      alert("Thank you for your registration! We're processing your payment now.");
      return response.data.orderId;
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         'Failed to initiate payment';
      alert(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Handle PayPal order approval
  const onApprovePayPalOrder = async (data: { orderID: string }): Promise<void> => {
    setIsProcessing(true);
    setPaypalError(null);
    
    try {
      const response = await apiClient.post<ApiResponse>(
        `/payments/group-paypal/capture-payment`,
        { orderId: data.orderID }
      );

      if (!response.data.success || !response.data.paymentId) {
        throw new Error(response.data.error || "Payment capture failed");
      }

      alert("Payment successful! Thank you for your registration.");
      navigate("/mentorship/group-session", {
        state: {
          paymentSuccess: true,
          session: session,
          paymentDetails: {
            paymentId: response.data.paymentId,
            orderId: data.orderID,
            amount: response.data.amount
          }
        }
      });
    } catch (err) {
      const error = err as AxiosError<ApiResponse> | Error;
      let errorMessage = 'Payment failed. Please try again.';
      
      if ('response' in error) {
        errorMessage = error.response?.data?.error || 
                      error.response?.data?.message || 
                      error.message;
      } else {
        errorMessage = error.message;
      }

      alert(errorMessage);
      setPaypalError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading state UI
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  // Error state UI
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button 
            onClick={() => navigate("/mentorship/group-session")} 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Group Sessions
          </button>
        </div>
      </div>
    );
  }

  // Session not found UI
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Session not found</h2>
          <button 
            onClick={() => navigate("/mentorship/group-session")} 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Group Sessions
          </button>
        </div>
      </div>
    );
  }

  // Main component UI
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(`/mentorship/group-session/${id}`)} 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to session details
        </button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Register for {session.title}</h2>
            <p className="text-gray-600 mb-6">Led by {session.mentor}</p>

            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <div>
                <p className="text-sm text-gray-600">Session Date</p>
                <p className="font-medium">{session.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium">{session.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium">{session.price}</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {paymentMethod === "paypal" && (
                <div className="mt-4">
                  <PayPalScriptProvider 
                    options={{ 
                      "clientId": "AWhqA1mohaLgdQ7Jse7vZihI2qRans1KvJMlwBYKHeH-ceS-fDMvjhIzVRrJ0Kf75_-Z_4m03dVOfA5b",
                      currency: "USD",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={createPayPalOrder}
                      onApprove={onApprovePayPalOrder}
                      onError={(err) => {
                        console.error("PayPal error:", err);
                        const errorMessage = "Payment failed. Please try another payment method.";
                        alert(errorMessage);
                        setPaypalError(errorMessage);
                      }}
                      onCancel={() => {
                        const cancelMessage = "Payment was cancelled. You can try again.";
                        alert(cancelMessage);
                        setPaypalError(cancelMessage);
                      }}
                    />
                  </PayPalScriptProvider>
                  {paypalError && (
                    <p className="mt-2 text-sm text-red-600">{paypalError}</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`${
                    paymentMethod === "paypal"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  } px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  onClick={() => setPaymentMethod("paypal")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay with PayPal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;