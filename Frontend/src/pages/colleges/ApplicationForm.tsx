import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus, FileText, Upload } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api/v1';

// Type Definitions
type Program = {
  _id?: string;
  name: string;
  level: "undergraduate" | "postgraduate" | "doctorate";
  duration: string;
  description: string;
};

type ProgramLevel = "undergraduate" | "postgraduate" | "doctorate";

type Programs = {
  [K in ProgramLevel]?: Program[];
};

type CollegeType = {
  organizationName: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  rating: number;
  foundedYear: string;
  globalRanking: number;
  alumniCount: number;
  programs: Programs;
};

type ApplicationDocument = {
  type: string;
  required: boolean;
  description: string;
  acceptedFormats: string[];
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  nationality: string;
  degreeLevel: ProgramLevel;
  program: string;
  intake: string;
  testType?: string;
  testScore?: string;
  testDate?: string;
  projects?: string;
  publications?: string;
  researchExperience?: string;
  workExperience?: string;
  statementOfPurpose: string;
  previousEducation: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    gpa: string;
    graduationDate: string;
  }>;
};

const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  degreeLevel: z.enum(["undergraduate", "postgraduate", "doctorate"]),
  program: z.string().min(1, "Program is required"),
  intake: z.string().min(1, "Intake is required"),
  testType: z.string().optional(),
  testScore: z.string().optional(),
  testDate: z.string().optional(),
  projects: z.string().optional(),
  publications: z.string().optional(),
  researchExperience: z.string().optional(),
  workExperience: z.string().optional(),
  statementOfPurpose: z.string().min(100, "Statement of purpose must be at least 100 characters"),
  previousEducation: z.array(z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    gpa: z.string().min(1, "GPA is required"),
    graduationDate: z.string().min(1, "Graduation date is required"),
  }))
});

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
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [college, setCollege] = useState<CollegeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [previousEducation, setPreviousEducation] = useState([{ id: 1 }]);
  const [degreeLevel, setDegreeLevel] = useState<ProgramLevel | undefined>();
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      previousEducation: [{
        institution: "",
        degree: "",
        fieldOfStudy: "",
        gpa: "",
        graduationDate: ""
      }]
    }
  });

  const formatOrganizationName = (name: string) => {
    return name ? decodeURIComponent(name).replace(/%20/g, ' ') : '';
  };

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        setLoading(true);
        const formattedOrgName = formatOrganizationName(name || '');
        
        if (!formattedOrgName) {
          throw new Error('College name is required');
        }

        const response = await fetch(`${API_BASE_URL}/college-details/${encodeURIComponent(formattedOrgName)}`);
        
        if (!response.ok) {
          throw new Error('College not found');
        }
        
        const data = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error(data.message || 'Invalid data format');
        }

        setCollege(data.data);
      } catch (error) {
        console.error("Error fetching college details:", error);
        toast.error("Failed to load college details");
        navigate("/colleges");
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [name, navigate]);

  const addEducation = () => {
    setPreviousEducation([...previousEducation, { id: previousEducation.length + 1 }]);
    setValue(`previousEducation.${previousEducation.length}`, {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      gpa: "",
      graduationDate: ""
    });
  };

  const removeEducation = (index: number) => {
    if (previousEducation.length > 1) {
      const newEducation = [...previousEducation];
      newEducation.splice(index, 1);
      setPreviousEducation(newEducation);
    }
  };

  const handleFileChange = (type: string, fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const newFiles = Array.from(fileList);
      setFiles(prev => ({
        ...prev,
        [type]: [...(prev[type] || []), ...newFiles]
      }));
    }
  };

  const removeFile = (type: string, index: number) => {
    setFiles(prev => {
      const updatedFiles = [...(prev[type] || [])];
      updatedFiles.splice(index, 1);
      return {
        ...prev,
        [type]: updatedFiles
      };
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Append all form data as JSON string
      formData.append('data', JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        nationality: data.nationality,
        studentName: `${data.firstName} ${data.lastName}`,
        level: data.degreeLevel,
        program: data.program,
        intake: data.intake,
        testType: data.testType,
        testScore: data.testScore,
        testDate: data.testDate,
        projects: data.projects,
        publications: data.publications,
        researchExperience: data.researchExperience,
        workExperience: data.workExperience,
        statementOfPurpose: data.statementOfPurpose,
        previousEducation: data.previousEducation
      }));
      
      // Append files
      Object.entries(files).forEach(([type, fileList]) => {
        fileList.forEach((file, ) => {
          formData.append(type, file);
        });
      });
      
      const response = await fetch(`${API_BASE_URL}/applications/${encodeURIComponent(college?.organizationName || '')}`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }
      
      toast.success('Application submitted successfully!');
      navigate(`/colleges/${name}`);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPrograms = degreeLevel && college?.programs 
    ? college.programs[degreeLevel] || []
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading College Details...</h2>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">College Not Found</h2>
          <Button onClick={() => navigate("/colleges")} className="mt-4">
            Back to Colleges
          </Button>
        </div>
      </div>
    );
  }

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

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-12">
            {/* Personal Information Section */}
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
                    {...register("firstName")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register("lastName")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    {...register("phone")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    {...register("dob")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.dob && (
                    <p className="text-sm text-red-500">{errors.dob.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register("nationality")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.nationality && (
                    <p className="text-sm text-red-500">{errors.nationality.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Program Selection Section */}
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
                  <select
                    {...register("degreeLevel")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setDegreeLevel(e.target.value as ProgramLevel)}
                  >
                    <option value="">Select degree level</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="doctorate">Doctorate</option>
                  </select>
                  {errors.degreeLevel && (
                    <p className="text-sm text-red-500">{errors.degreeLevel.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Program <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("program")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select program</option>
                    {filteredPrograms.map((program) => (
                      <option key={program._id || program.name} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                  {errors.program && (
                    <p className="text-sm text-red-500">{errors.program.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Intake <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("intake")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select intake</option>
                    <option value="fall">Fall {new Date().getFullYear()}</option>
                    <option value="spring">Spring {new Date().getFullYear() + 1}</option>
                  </select>
                  {errors.intake && (
                    <p className="text-sm text-red-500">{errors.intake.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Previous Education Section */}
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
                {previousEducation.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900 flex items-center">
                        <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-blue-600 font-bold text-sm">
                            {index + 1}
                          </span>
                        </span>
                        Education Record
                      </h3>
                      {previousEducation.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(index)}
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
                          {...register(`previousEducation.${index}.institution`)}
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.previousEducation?.[index]?.institution && (
                          <p className="text-sm text-red-500">
                            {errors.previousEducation[index]?.institution?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Degree <span className="text-red-500">*</span>
                        </label>
                        <Input
                          {...register(`previousEducation.${index}.degree`)}
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.previousEducation?.[index]?.degree && (
                          <p className="text-sm text-red-500">
                            {errors.previousEducation[index]?.degree?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Field of Study <span className="text-red-500">*</span>
                        </label>
                        <Input
                          {...register(`previousEducation.${index}.fieldOfStudy`)}
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.previousEducation?.[index]?.fieldOfStudy && (
                          <p className="text-sm text-red-500">
                            {errors.previousEducation[index]?.fieldOfStudy?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          GPA <span className="text-red-500">*</span>
                        </label>
                        <Input
                          {...register(`previousEducation.${index}.gpa`)}
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.previousEducation?.[index]?.gpa && (
                          <p className="text-sm text-red-500">
                            {errors.previousEducation[index]?.gpa?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Graduation Date <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="date"
                          {...register(`previousEducation.${index}.graduationDate`)}
                          className="transition-all focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.previousEducation?.[index]?.graduationDate && (
                          <p className="text-sm text-red-500">
                            {errors.previousEducation[index]?.graduationDate?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Test Scores Section */}
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
                    Test Type
                  </label>
                  <select
                    {...register("testType")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select test type</option>
                    <option value="gre">GRE</option>
                    <option value="gmat">GMAT</option>
                    <option value="toefl">TOEFL</option>
                    <option value="ielts">IELTS</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Score
                  </label>
                  <Input
                    {...register("testScore")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Test Date
                  </label>
                  <Input
                    type="date"
                    {...register("testDate")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Additional Information Section */}
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
                    {...register("projects")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    placeholder="https://project1.com, https://project2.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Publications (comma-separated URLs)
                  </label>
                  <Input
                    {...register("publications")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                    placeholder="https://publication1.com, https://publication2.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Research Experience
                  </label>
                  <textarea
                    {...register("researchExperience")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Work Experience
                  </label>
                  <textarea
                    {...register("workExperience")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                </div>
              </div>
            </section>

            {/* Required Documents Section */}
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
                        
                        {/* File Upload Area */}
                        <div className="mt-3">
                          <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                            <div className="flex flex-col items-center justify-center">
                              <Upload className="w-6 h-6 text-gray-500 mb-2" />
                              <p className="text-sm text-gray-500">
                                <span className="font-medium">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                {doc.acceptedFormats.map(f => f.replace('.', '')).join(', ')} files only
                              </p>
                            </div>
                            <input
                              type="file"
                              accept={doc.acceptedFormats.join(",")}
                              required={doc.required && (!files[doc.type] || files[doc.type].length === 0)}
                              className="hidden"
                              onChange={(e) => handleFileChange(doc.type, e.target.files)}
                              multiple={doc.type === 'recommendation_letters'}
                            />
                          </label>
                          
                          {/* Display uploaded files */}
                          {files[doc.type]?.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {files[doc.type].map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-white border rounded">
                                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(doc.type, index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Statement of Purpose Section */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">7</span>
                </span>
                Statement of Purpose
              </h2>
              <div className="space-y-2">
                <textarea
                  {...register("statementOfPurpose")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={8}
                  placeholder="Please write your statement of purpose..."
                />
                {errors.statementOfPurpose && (
                  <p className="text-sm text-red-500">{errors.statementOfPurpose.message}</p>
                )}
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
                onClick={() => navigate(`/colleges/${name}`)}
              >
                Back to College
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;