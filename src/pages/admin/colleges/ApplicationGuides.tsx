import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Plus,
  Trash,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { ApplicationStep, FAQ } from "../../../types/college";

const AdminApplicationGuides = () => {
  // State for application steps
  const [applicationSteps, setApplicationSteps] = useState<ApplicationStep[]>([
    {
      id: "1",
      title: "Research and Choose Colleges",
      description:
        "Research colleges that match your academic goals, financial situation, and preferences.",
      completed: false,
    },
    {
      id: "2",
      title: "Prepare Application Materials",
      description:
        "Gather transcripts, test scores, essays, and letters of recommendation.",
      completed: false,
    },
    {
      id: "3",
      title: "Complete Application Forms",
      description:
        "Fill out the Common Application or individual college applications.",
      completed: false,
    },
    {
      id: "4",
      title: "Submit Financial Aid Applications",
      description: "Complete FAFSA and CSS Profile if required.",
      completed: false,
    },
  ]);

  // State for FAQs
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "When should I start my college applications?",
      answer:
        "Start preparing for college applications during your junior year of high school. Begin the actual application process the summer before your senior year.",
    },
    {
      question: "How many colleges should I apply to?",
      answer:
        "Most counselors recommend applying to 6-10 colleges, including reach schools, target schools, and safety schools.",
    },
    {
      question: "What is the Common Application?",
      answer:
        "The Common Application is a standardized college application accepted by over 900 colleges. It simplifies the process by allowing you to submit one application to multiple schools.",
    },
  ]);

  // State for required documents
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>([
    "High School Transcripts",
    "SAT/ACT Scores",
    "Letters of Recommendation",
    "Personal Statement",
    "Activity Resume",
    "Financial Aid Forms",
  ]);

  // State for PDF file
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  // State for completed steps and expanded FAQs
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  // Toggle step completion
  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  // Toggle FAQ expansion
  const toggleFAQ = (question: string) => {
    setExpandedFAQs((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  // Add a new application step
  const addApplicationStep = () => {
    const newStep: ApplicationStep = {
      id: (applicationSteps.length + 1).toString(),
      title: "New Step",
      description: "Description of the new step.",
      completed: false,
    };
    setApplicationSteps((prev) => [...prev, newStep]);
  };

  // Delete an application step
  const deleteApplicationStep = (stepId: string) => {
    setApplicationSteps((prev) => prev.filter((step) => step.id !== stepId));
  };

  // Add a new FAQ
  const addFAQ = () => {
    const newFAQ: FAQ = {
      question: "New FAQ Question",
      answer: "Answer to the new FAQ question.",
    };
    setFaqs((prev) => [...prev, newFAQ]);
  };

  // Delete an FAQ
  const deleteFAQ = (question: string) => {
    setFaqs((prev) => prev.filter((faq) => faq.question !== question));
  };

  // Add a new required document
  const addRequiredDocument = () => {
    setRequiredDocuments((prev) => [...prev, "New Document"]);
  };

  // Delete a required document
  const deleteRequiredDocument = (document: string) => {
    setRequiredDocuments((prev) => prev.filter((doc) => doc !== document));
  };

  // Handle PDF file upload
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPdfFile(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updates
  const handleSave = () => {
    console.log("Updated Application Steps:", applicationSteps);
    console.log("Updated FAQs:", faqs);
    console.log("Updated Required Documents:", requiredDocuments);
    console.log("Updated PDF File:", pdfFile);
    alert("Changes saved successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <h1
          contentEditable
          suppressContentEditableWarning
          className="text-3xl font-bold mb-4 outline-none"
        >
          College Application Guide
        </h1>
        <p
          contentEditable
          suppressContentEditableWarning
          className="text-gray-600 mb-8 outline-none"
        >
          Follow this comprehensive guide to navigate the college application
          process successfully
        </p>

        {/* Application Checklist */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Application Checklist</h2>
          <div className="space-y-4">
            {applicationSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200"
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className={`flex-shrink-0 w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center ${
                    completedSteps.includes(step.id)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {completedSteps.includes(step.id) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </button>
                <div className="flex-1">
                  <h3
                    contentEditable
                    suppressContentEditableWarning
                    className="text-lg font-medium outline-none"
                  >
                    {step.title}
                  </h3>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    className="text-gray-600 mt-1 outline-none"
                  >
                    {step.description}
                  </p>
                </div>
                <button
                  onClick={() => deleteApplicationStep(step.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              onClick={addApplicationStep}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="h-5 w-5" />
              <span>Add Step</span>
            </button>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {requiredDocuments.map((document) => (
              <div
                key={document}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="outline-none"
                  >
                    {document}
                  </span>
                </div>
                <button
                  onClick={() => deleteRequiredDocument(document)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              onClick={addRequiredDocument}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="h-5 w-5" />
              <span>Add Document</span>
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() => toggleFAQ(faq.question)}
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="font-medium outline-none"
                    >
                      {faq.question}
                    </span>
                  </div>
                  {expandedFAQs.includes(faq.question) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQs.includes(faq.question) && (
                  <div className="px-4 pb-4">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      className="text-gray-600 outline-none"
                    >
                      {faq.answer}
                    </p>
                    <button
                      onClick={() => deleteFAQ(faq.question)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={addFAQ}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="h-5 w-5" />
              <span>Add FAQ</span>
            </button>
          </div>
        </div>

        {/* Need More Help? */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
          <p
            contentEditable
            suppressContentEditableWarning
            className="text-gray-600 mb-4 outline-none"
          >
            Our counselors are here to guide you through every step of the
            application process.
          </p>
          <div className="flex space-x-4">
            <Button>Schedule Consultation</Button>
            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline">
                {pdfFile ? "Update Guide PDF" : "Upload Guide PDF"}
              </Button>
            </div>
          </div>
        </div>

        {/* Save Update Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationGuides;
