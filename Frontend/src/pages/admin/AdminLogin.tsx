import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button"; // Assuming you are using a Button component

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials (for demo purposes)
  const validUsername = "admin";
  const validPassword = "admin123";

  const handleLogin = () => {
    console.log("Entered Username:", username);
    console.log("Entered Password:", password);

    if (
      username.trim() === validUsername &&
      password.trim() === validPassword
    ) {
      sessionStorage.setItem("isAuthenticated", "true"); // Ensure this key matches PrivateRoute
      console.log("Login Successful!");
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } else {
      console.log("Invalid credentials");
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login to Admin Panel</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleLogin} className="w-full mt-4">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
