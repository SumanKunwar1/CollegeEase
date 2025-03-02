import React, { useState } from "react";
import { UserType, AuthFormData } from "../../types/auth";
import { Mail, Lock, Building2, MapPin, FileText } from "lucide-react";

interface AuthFormProps {
  onSubmit: (data: AuthFormData) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [, setUserType] = useState<UserType>("institute");
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [formData, setFormData] = useState<Partial<AuthFormData>>({
    email: "",
    password: "",
    userType: "institute",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserTypeSelect = (type: UserType) => {
    if (type === "mentor") {
      alert(
        "Mentors can only log in. Please contact admin for mentor registration."
      );
      return;
    }
    setUserType(type);
    setFormData((prev) => ({ ...prev, userType: type }));
    setShowSignupForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit(formData as AuthFormData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSignUp && !showSignupForm) {
    return (
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Choose Your Role
        </h2>
        <div className="space-y-4">
          {(
            ["institute", "industry", "scholarship", "mentor"] as UserType[]
          ).map((type) => (
            <button
              key={type}
              onClick={() => handleUserTypeSelect(type)}
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="capitalize">{type}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignUp ? "Create Account" : "Sign In"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
        </div>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
        </div>

        {isSignUp && (
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>
          </div>
        )}

        {!isSignUp && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="institute">Institute</option>
              <option value="industry">Industry</option>
              <option value="mentor">Mentor</option>
              <option value="scholarship">Scholarship Provider</option>
            </select>
          </div>
        )}

        {isSignUp && showSignupForm && (
          <>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Organization Name"
                  value={formData.organizationName || ""}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-1">
                    Support Documents
                  </p>
                  <input
                    type="file"
                    name="supportDocuments"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                </div>
              </label>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setShowSignupForm(false);
            }}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>
      </form>
    </div>
  );
}
