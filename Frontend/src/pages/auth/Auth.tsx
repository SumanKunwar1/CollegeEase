import { AuthForm } from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { AuthFormData } from "../../types/auth";
import { useState } from "react";
import axios from "axios";

// Using Vite's environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api/v1';

export function AuthPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      const endpoint = data.organizationName ? '/auth/signup' : '/auth/login';
      
      if (data.organizationName) {
        // Sign up with file upload
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('userType', data.userType);
        formData.append('organizationName', data.organizationName);
        formData.append('location', data.location || '');

        // Handle file uploads if they exist
        if (data.supportDocuments) {
          Array.from(data.supportDocuments).forEach((file: File) => {
            formData.append('supportDocuments', file);
          });
        }

        response = await axios.post(`${API_BASE_URL}${endpoint}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
      } else {
        // Regular login
        response = await axios.post(`${API_BASE_URL}${endpoint}`, {
          email: data.email,
          password: data.password,
          userType: data.userType,
        }, {
          withCredentials: true,
        });
      }

      // Store user data and token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));

      // Navigate to dashboard
      const userSlug = data.organizationName
      ? encodeURIComponent(data.organizationName.toLowerCase().replace(/\s+/g, '-'))
      : response.data.data.user.organizationName; // Use organization name instead of ID
    
    navigate(`/dashboard/${data.userType}/${userSlug}`);
    
    } catch (err: any) {
      console.error('Authentication error:', err);
      
      let errorMessage = 'An error occurred during authentication';
      
      if (err.response) {
        errorMessage = err.response.data?.message || 
                      err.response.data?.error?.message || 
                      errorMessage;
      } else if (err.request) {
        errorMessage = 'No response received from server - check your connection';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AuthForm onSubmit={handleSubmit} error={error} isLoading={isLoading} />
    </div>
  );
}

export default AuthPage;