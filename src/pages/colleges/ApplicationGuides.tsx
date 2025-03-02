import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import type { ApplicationStep, FAQ } from "../../types/college";

const applicationSteps: ApplicationStep[] = [
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
];

const faqs: FAQ[] = [
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
];

const ApplicationGuides = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  const toggleFAQ = (question: string) => {
    setExpandedFAQs((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">College Application Guide</h1>
        <p className="text-gray-600 mb-8">
          Follow this comprehensive guide to navigate the college application
          process successfully
        </p>

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
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {completedSteps.includes(step.id) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </button>
                <div>
                  <h3 className="text-lg font-medium">{step.title}</h3>
                  <p className="text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "High School Transcripts",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Statement",
              "Activity Resume",
              "Financial Aid Forms",
            ].map((document) => (
              <div
                key={document}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
              >
                <FileText className="h-5 w-5 text-gray-400" />
                <span>{document}</span>
              </div>
            ))}
          </div>
        </div>

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
                    <span className="font-medium">{faq.question}</span>
                  </div>
                  {expandedFAQs.includes(faq.question) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQs.includes(faq.question) && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-4">
            Our counselors are here to guide you through every step of the
            application process.
          </p>
          <div className="flex space-x-4">
            <Button>Schedule Consultation</Button>
            <Button variant="outline">Download Guide PDF</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationGuides;
