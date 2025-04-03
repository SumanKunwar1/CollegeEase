"use client"

import { useState } from "react"
import { CheckCircle, FileText, HelpCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "../../components/ui/button"
import { usePDF } from "react-to-pdf"

const ScholarshipApplicationGuides = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isPrinting, setIsPrinting] = useState(false)
  const { toPDF, targetRef } = usePDF({ filename: "scholarship-application-guide.pdf" })

  const guides = [
    {
      id: "preparation",
      title: "Preparation Checklist",
      items: [
        "Gather academic transcripts",
        "Prepare standardized test scores",
        "Update resume/CV",
        "Draft personal statement",
        "Identify potential references",
      ],
    },
    {
      id: "writing",
      title: "Writing Tips",
      items: [
        "Start early and give yourself time to revise",
        "Be specific and use concrete examples",
        "Address the prompt directly",
        "Show, don't tell",
        "Proofread carefully",
      ],
    },
    {
      id: "documents",
      title: "Required Documents",
      items: [
        "Application form",
        "Academic transcripts",
        "Letters of recommendation",
        "Personal statement/Essay",
        "Financial documentation",
      ],
    },
  ]

  const faqs = [
    {
      question: "When should I start applying for scholarships?",
      answer:
        "Start applying for scholarships as early as possible, ideally 6-8 months before the academic year begins. Many scholarships have early deadlines, and starting early gives you time to prepare strong applications.",
    },
    {
      question: "How many scholarships should I apply for?",
      answer:
        "Apply for as many scholarships as you can reasonably handle while maintaining quality applications. A good target is 3-4 applications per week. Remember, it's a numbers game - the more you apply, the better your chances.",
    },
    {
      question: "What makes a strong scholarship essay?",
      answer:
        "A strong scholarship essay is personal, specific, and well-written. It should tell your unique story, demonstrate your achievements and aspirations, and clearly show why you deserve the scholarship.",
    },
  ]

  const handleDownloadPDF = async () => {
    // Remember the current expanded state
    const previousExpandedSection = expandedSection

    // Set printing mode to true (expands all sections)
    setIsPrinting(true)

    // Wait for the state update to be reflected in the DOM
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Generate PDF
    await toPDF()

    // Restore the previous state
    setIsPrinting(false)
    setExpandedSection(previousExpandedSection)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20" ref={targetRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Scholarship Application Guide</h1>
          <p className="mt-2 text-gray-600">Your comprehensive guide to crafting winning scholarship applications</p>
        </div>

        <div className="space-y-8">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50"
                onClick={() => !isPrinting && setExpandedSection(expandedSection === guide.id ? null : guide.id)}
              >
                <h2 className="text-lg font-semibold text-gray-900">{guide.title}</h2>
                {expandedSection === guide.id || isPrinting ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {(expandedSection === guide.id || isPrinting) && (
                <div className="px-6 py-4">
                  <ul className="space-y-4">
                    {guide.items.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">{faq.question}</h3>
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Download Complete Guide</h3>
                <p className="mt-1 text-gray-600">
                  Get our comprehensive PDF guide with detailed tips, templates, and examples
                </p>
                <Button className="mt-4" onClick={handleDownloadPDF}>
                  Download PDF Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScholarshipApplicationGuides

