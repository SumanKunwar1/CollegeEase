import React, { useState } from "react";
import { UserType, AuthFormData } from "../../types/auth";
import { Mail, Lock, Building2, MapPin, FileText } from "lucide-react";

interface AuthFormProps {
  onSubmit: (data: AuthFormData) => Promise<void>;
  error?: string | null;
  isLoading?: boolean;
}

export function AuthForm({ onSubmit, error, isLoading }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [, setUserType] = useState<UserType>("institute");
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [formData, setFormData] = useState<Partial<AuthFormData>>({
    email: "",
    password: "",
    userType: "institute",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (isSignUp) {
      if (formData.password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      if (!formData.userType) {
        errors.userType = "User type is required";
      }

      if (showSignupForm) {
        if (!formData.organizationName && formData.userType !== "mentor") {
          errors.organizationName = "Organization name is required";
        }

        if (!formData.location) {
          errors.location = "Location is required";
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData: AuthFormData = {
      ...formData,
      supportDocuments: files ? Array.from(files) : undefined
    } as AuthFormData;
    
    await onSubmit(submitData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
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
      
      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

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
              className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              required
            />
          </label>
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
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
              className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              required
            />
          </label>
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          )}
        </div>

        {isSignUp && (
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (formErrors.confirmPassword) {
                    setFormErrors(prev => ({ ...prev, confirmPassword: "" }));
                  }
                }}
                className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formErrors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                required
              />
            </label>
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
            )}
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
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.userType ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              required
            >
              <option value="institute">Institute</option>
              <option value="industry">Industry</option>
              <option value="mentor">Mentor</option>
              <option value="scholarship">Scholarship Provider</option>
            </select>
            {formErrors.userType && (
              <p className="text-red-500 text-sm">{formErrors.userType}</p>
            )}
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
                  className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.organizationName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  required={formData.userType !== "mentor"}
                />
              </label>
              {formErrors.organizationName && (
                <p className="text-red-500 text-sm">{formErrors.organizationName}</p>
              )}
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
                  className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.location ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  required
                />
              </label>
              {formErrors.location && (
                <p className="text-red-500 text-sm">{formErrors.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-1">
                    Support Documents (PDF, JPG, PNG)
                  </p>
                  <input
                    type="file"
                    name="supportDocuments"
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </label>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isSignUp ? "Creating Account..." : "Logging In..."}
            </>
          ) : isSignUp ? "Create Account" : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setShowSignupForm(false);
              setFormErrors({});
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