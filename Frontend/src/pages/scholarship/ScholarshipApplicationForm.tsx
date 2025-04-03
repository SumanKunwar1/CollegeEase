import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  BookOpen,
  DollarSign,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  currentEducation: string;
  institution: string;
  gpa: string;
  graduationDate: string;
  satScore: string;
  actScore: string;
  toeflScore: string;
  ieltsScore: string;
  programLevel: string;
  intendedMajor: string;
  scholarshipType: string;
  financialAid: boolean;
  familyIncome: string;
  achievements: string;
}

const ScholarshipApplicationForm = () => {
  const { organizationName: encodedOrgName } = useParams<{ organizationName: string }>();
  const organizationName = encodedOrgName ? decodeURIComponent(encodedOrgName) : "";
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    currentEducation: "",
    institution: "",
    gpa: "",
    graduationDate: "",
    satScore: "",
    actScore: "",
    toeflScore: "",
    ieltsScore: "",
    programLevel: "",
    intendedMajor: "",
    scholarshipType: "",
    financialAid: false,
    familyIncome: "",
    achievements: "",
  });

  const totalSteps = 4;

  useEffect(() => {
    if (!organizationName) {
      toast.error("Organization not specified");
      navigate("/");
    }
  }, [organizationName, navigate]);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.firstName) errors.firstName = "First name is required";
      if (!formData.lastName) errors.lastName = "Last name is required";
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = "Email is invalid";
      }
      if (!formData.phone) errors.phone = "Phone number is required";
      if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
      if (!formData.nationality) errors.nationality = "Nationality is required";
      if (!formData.address) errors.address = "Address is required";
    }

    if (step === 2) {
      if (!formData.currentEducation) errors.currentEducation = "Education level is required";
      if (!formData.institution) errors.institution = "Institution is required";
      if (!formData.gpa) {
        errors.gpa = "GPA is required";
      } else if (isNaN(parseFloat(formData.gpa))) {
        errors.gpa = "GPA must be a number";
      }
      if (!formData.graduationDate) errors.graduationDate = "Graduation date is required";
      if (!formData.programLevel) errors.programLevel = "Program level is required";
      if (!formData.intendedMajor) errors.intendedMajor = "Intended major is required";
    }

    if (step === 3) {
      if (!formData.scholarshipType) errors.scholarshipType = "Scholarship type is required";
      if (!formData.familyIncome) {
        errors.familyIncome = "Family income is required";
      } else if (isNaN(parseInt(formData.familyIncome))) {
        errors.familyIncome = "Family income must be a number";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo(0, 0);
      }
    } else {
      toast.error("Please fix the errors before proceeding");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!organizationName) {
      toast.error("Organization not specified");
      return;
    }
  
    if (!validateStep(currentStep)) {
      toast.error("Please fix all errors before submitting");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const apiUrl = `${
        import.meta.env.VITE_API_BASE_URL
      }/scholarship-applications/${encodeURIComponent(organizationName)}/apply`;
  
      const payload = {
        ...formData,
        gpa: parseFloat(formData.gpa),
        familyIncome: parseInt(formData.familyIncome),
        financialAid: formData.financialAid.toString(),
      };
  
      const response = await axios.post(apiUrl, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        navigate(`/scholarships/${encodeURIComponent(organizationName)}/application-received`);
        toast.success("Application submitted successfully!");
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Full error:", error);
      
      let errorMessage = "Failed to submit application";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        console.error("Server response:", error.response.data);
        
        // Handle validation errors from backend
        if (error.response.data?.error?.errors) {
          const backendErrors = error.response.data.error.errors;
          const errorMap: Record<string, string> = {};
          
          Object.keys(backendErrors).forEach(key => {
            errorMap[key] = backendErrors[key].message;
          });
          
          setFormErrors(errorMap);
          errorMessage = "Please fix the validation errors";
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        errorMessage = "Could not connect to server. Please try again later.";
      } else {
        console.error("Request setup error:", error.message);
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <User className="mr-2" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.firstName ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.lastName ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.dateOfBirth ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nationality *
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.nationality ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.nationality && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.nationality}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.address ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.address && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <BookOpen className="mr-2" /> Academic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Level of Education *
                </label>
                <select
                  name="currentEducation"
                  value={formData.currentEducation}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.currentEducation ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                >
                  <option value="">Select Education Level</option>
                  <option value="high_school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
                {formErrors.currentEducation && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.currentEducation}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current/Previous Institution *
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.institution ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.institution && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.institution}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GPA *
                </label>
                <input
                  type="number"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  max="4"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.gpa ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.gpa && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.gpa}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expected Graduation Date *
                </label>
                <input
                  type="date"
                  name="graduationDate"
                  value={formData.graduationDate}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.graduationDate ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.graduationDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.graduationDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Program Level *
                </label>
                <select
                  name="programLevel"
                  value={formData.programLevel}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.programLevel ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                >
                  <option value="">Select Program Level</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="phd">PhD</option>
                </select>
                {formErrors.programLevel && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.programLevel}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Intended Major *
                </label>
                <input
                  type="text"
                  name="intendedMajor"
                  value={formData.intendedMajor}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.intendedMajor ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                />
                {formErrors.intendedMajor && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.intendedMajor}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SAT Score (if applicable)
                </label>
                <input
                  type="number"
                  name="satScore"
                  value={formData.satScore}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  TOEFL/IELTS Score
                </label>
                <input
                  type="number"
                  name="toeflScore"
                  value={formData.toeflScore}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-gray-400"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <DollarSign className="mr-2" /> Scholarship Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type of Scholarship *
                </label>
                <select
                  name="scholarshipType"
                  value={formData.scholarshipType}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.scholarshipType ? 'border-red-500' : 'border-gray-400'
                  }`}
                  required
                >
                  <option value="">Select Scholarship Type</option>
                  <option value="academic">Academic Merit Scholarship</option>
                  <option value="sports">Sports Scholarship</option>
                  <option value="needBased">Need-based Scholarship</option>
                  <option value="research">Research Scholarship</option>
                  <option value="international">
                    International Student Scholarship
                  </option>
                </select>
                {formErrors.scholarshipType && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.scholarshipType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Annual Family Income (USD) *
                </label>
                <input
                  type="number"
                  name="familyIncome"
                  value={formData.familyIncome}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border ${
                    formErrors.familyIncome ? 'border-red-500' : 'border-gray-400'
                  }`}
                  placeholder="USD"
                  required
                />
                {formErrors.familyIncome && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.familyIncome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Financial Aid
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="financialAid"
                      checked={formData.financialAid}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2">
                      I would like to be considered for additional financial aid
                    </span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Achievements & Awards
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-gray-400"
                  placeholder="List your academic achievements, awards, and honors..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <CheckCircle className="mr-2" /> Review & Submit
            </h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Application Summary
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Please review your information before submitting
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.firstName} {formData.lastName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.email}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Program Level
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.programLevel}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Intended Major
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.intendedMajor}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Scholarship Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.scholarshipType}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Institution
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.institution}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">GPA</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.gpa}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Family Income
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${formData.familyIncome}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <p className="text-sm text-gray-500 mb-4">
                  By clicking submit, you confirm that all provided information
                  is accurate
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Scholarship Application - {organizationName}
            </h1>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
              />
            </div>
            <div className="flex justify-between">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold ${
                    index + 1 <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
          {renderStepContent()}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={isLoading}
              className={`flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                currentStep === 1 ? "invisible" : ""
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            {currentStep === totalSteps ? (
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Application
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className={`flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipApplicationForm;