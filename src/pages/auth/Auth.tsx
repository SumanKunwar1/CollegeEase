import { AuthForm } from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { AuthFormData } from "../../types/auth";

export function AuthPage() {
  const navigate = useNavigate();

  const handleSubmit = (data: AuthFormData) => {
    // Simulate user authentication
    // In a real app, this would be an API call
    const userId = crypto.randomUUID(); // Generate a unique ID
    const userSlug = data.organizationName
      ? encodeURIComponent(
          data.organizationName.toLowerCase().replace(/\s+/g, "-")
        )
      : userId;

    // Store user data in localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify({ ...data, id: userId }));

    // Navigate to the appropriate dashboard with the user ID
    navigate(`/dashboard/${data.userType}/${userSlug}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AuthForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AuthPage;
