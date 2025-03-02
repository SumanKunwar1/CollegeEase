import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  User,
  Mail,
  BookOpen,
  FileText,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import { storage } from "../../../data/donationregistration";
import type { Student } from "../../../types/donationregistration";

const CAUSES = [
  "Tuition Fees",
  "Books and Supplies",
  "Technology Equipment",
  "Transportation",
  "Housing",
];

export default function StudentRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    cause: "",
    description: "",
    amountNeeded: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const student: Student = {
      id: crypto.randomUUID(),
      email: formData.email,
      fullName: formData.fullName,
      cause: formData.cause,
      description: formData.description,
      amountNeeded: Number(formData.amountNeeded),
      documents: ["proof_of_enrollment.pdf"],
      status: "pending",
      createdAt: new Date().toISOString(),
      raised: 0,
      password: formData.password,
    };

    storage.saveStudent(student);
    storage.setCurrentUser(student);

    toast.success("Registration successful!");
    navigate("/donate/student-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-150 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              Student Registration
            </h1>
            <p className="text-gray-600">
              Register to receive support for your educational needs.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <select
                  required
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.cause}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cause: e.target.value }))
                  }
                >
                  <option value="">Select a cause</option>
                  {CAUSES.map((cause) => (
                    <option key={cause} value={cause}>
                      {cause}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                <textarea
                  required
                  placeholder="Description of Need"
                  rows={3}
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <input
                  type="number"
                  required
                  placeholder="Amount Needed ($)"
                  min="0"
                  step="0.01"
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.amountNeeded}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amountNeeded: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
                <input
                  type="file"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full bg-transparent focus:outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
