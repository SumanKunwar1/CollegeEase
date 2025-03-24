import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What services does CollegeEase provide?",
    answer:
      "CollegeEase offers comprehensive college application support, including personalized guidance, application tracking, essay assistance, and expert advice. We also provide college matching services, deadline reminders, and strategic insights to help you get into your dream schools.",
  },
  {
    question: "How early should I start the college application process?",
    answer:
      "We recommend starting the college application process during your junior year of high school. This gives you enough time to research colleges, prepare for standardized tests, work on your essays, and gather recommendations without feeling rushed.",
  },
  {
    question: "How does the college matching service work?",
    answer:
      "Our college matching service uses a sophisticated algorithm that considers your academic profile, interests, career goals, and preferences to suggest colleges that best fit your needs. We analyze factors like location, size, programs offered, and admission requirements.",
  },
  {
    question: "Can CollegeEase help with financial aid applications?",
    answer:
      "Yes! We provide guidance on completing the FAFSA, CSS Profile, and other financial aid forms. We also offer resources about scholarships, grants, and other funding opportunities to help make college more affordable.",
  },
  {
    question:
      "What makes CollegeEase different from other college counseling services?",
    answer:
      "CollegeEase combines personalized guidance with innovative technology to provide a comprehensive, stress-free college application experience. Our platform offers real-time tracking, automated reminders, and expert advice all in one place.",
  },
];

function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about CollegeEase
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-blue-600" />
                ) : (
                  <ChevronDown className="text-blue-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQsPage;
