import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Minus, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { collegesData } from "../../../data/collegeDetails";
import type { ApplicationDocument } from "../../../types/applicationForm";

const requiredDocuments: ApplicationDocument[] = [
  {
    type: "transcripts",
    required: true,
    description: "Official academic transcripts from all previous institutions",
    acceptedFormats: [".pdf"],
  },
  {
    type: "cv",
    required: true,
    description: "Current CV/Resume",
    acceptedFormats: [".pdf", ".doc", ".docx"],
  },
  {
    type: "recommendation_letters",
    required: true,
    description: "Letters of Recommendation (minimum 2)",
    acceptedFormats: [".pdf"],
  },
  {
    type: "statement_purpose",
    required: true,
    description: "Statement of Purpose",
    acceptedFormats: [".pdf", ".doc", ".docx"],
  },
  {
    type: "research_proposal",
    required: false,
    description: "Research Proposal (required for PhD applications)",
    acceptedFormats: [".pdf"],
  },
  {
    type: "writing_sample",
    required: false,
    description: "Writing Sample or Published Papers",
    acceptedFormats: [".pdf"],
  },
  {
    type: "portfolio",
    required: false,
    description: "Portfolio (if applicable)",
    acceptedFormats: [".pdf"],
  },
];

const ApplicationForm = () => {
  const { id } = useParams();
  const college = collegesData.find((c) => c.id === id);
  const [previousEducation, setPreviousEducation] = useState([{ id: 1 }]);
  const [degreeLevel, setDegreeLevel] = useState<string | undefined>();

  if (!college) {
    return <div>College not found</div>;
  }

  const addEducation = () => {
    setPreviousEducation([
      ...previousEducation,
      { id: previousEducation.length + 1 },
    ]);
  };

  const removeEducation = (id: number) => {
    if (previousEducation.length > 1) {
      setPreviousEducation(previousEducation.filter((edu) => edu.id !== id));
    }
  };

  const filteredPrograms = degreeLevel
    ? college.programs[degreeLevel as keyof typeof college.programs] || []
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 border-b">
            <h1 className="text-3xl font-bold text-white">
              Application Form - {college.name}
            </h1>
            <p className="mt-2 text-blue-100">
              Please fill out all required information carefully
            </p>
          </div>

          <form className="p-8 space-y-12">
            {/* Personal Information */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">1</span>
                </span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <Input
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Program Selection */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">2</span>
                </span>
                Program Selection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Degree Level <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={(value) => setDegreeLevel(value)}>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select degree level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="undergraduate">
                        Undergraduate
                      </SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Program <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {filteredPrograms.map((program) => (
                        <SelectItem key={program.name} value={program.name}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Intake <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select intake" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="fall">
                        Fall {new Date().getFullYear()}
                      </SelectItem>
                      <SelectItem value="spring">
                        Spring {new Date().getFullYear() + 1}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Previous Education */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </span>
                  Previous Education
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addEducation}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>

              <div className="space-y-6">
                {previousEducation.map((edu) => (
                  <div
                    key={edu.id}
                    className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900 flex items-center">
                        <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-blue-600 font-bold text-sm">
                            {edu.id}
                          </span>
                        </span>
                        Education Record
                      </h3>
                      {previousEducation.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Institution <span className="text-red-500">*</span>
                        </label>
                        <Input
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Degree <span className="text-red-500">*</span>
                        </label>
                        <Input
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Field of Study <span className="text-red-500">*</span>
                        </label>
                        <Input
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          GPA <span className="text-red-500">*</span>
                        </label>
                        <Input
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Graduation Date{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="date"
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Test Scores */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">4</span>
                </span>
                Test Scores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Test Type <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="gre">GRE</SelectItem>
                      <SelectItem value="gmat">GMAT</SelectItem>
                      <SelectItem value="toefl">TOEFL</SelectItem>
                      <SelectItem value="ielts">IELTS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Score <span className="text-red-500">*</span>
                  </label>
                  <Input
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Test Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Additional Information */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">5</span>
                </span>
                Additional Information
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Projects (comma-separated URLs)
                  </label>
                  <Input
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    placeholder="https://project1.com, https://project2.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Publications (comma-separated URLs)
                  </label>
                  <Input
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    placeholder="https://publication1.com, https://publication2.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Research Experience
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Work Experience
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                </div>
              </div>
            </section>

            {/* Required Documents */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">6</span>
                </span>
                Required Documents
              </h2>
              <div className="space-y-6">
                {requiredDocuments.map((doc) => (
                  <div
                    key={doc.type}
                    className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <FileText className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">
                            {doc.type
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </h3>
                          {doc.required && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {doc.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Accepted formats: {doc.acceptedFormats.join(", ")}
                        </p>
                        <Input
                          type="file"
                          accept={doc.acceptedFormats.join(",")}
                          required={doc.required}
                          className="mt-3 transition-all focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Statement of Purpose */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">7</span>
                </span>
                Statement of Purpose
              </h2>
              <div className="space-y-2">
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={8}
                  placeholder="Please write your statement of purpose..."
                  required
                />
                <p className="text-sm text-gray-500">
                  Explain your academic interests, career goals, and why you're
                  interested in this program.
                </p>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
