"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Grip, Plus, Save, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useToast } from "../../../components/ui/use-toast";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
}

export function AdminFAQPage() {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 1,
      question: "What services does CollegeEase provide?",
      answer:
        "CollegeEase offers comprehensive college application support, including personalized guidance, application tracking, essay assistance, and expert advice. We also provide college matching services, deadline reminders, and strategic insights to help you get into your dream schools.",
      isOpen: false,
    },
    {
      id: 2,
      question: "How early should I start the college application process?",
      answer:
        "We recommend starting the college application process during your junior year of high school. This gives you enough time to research colleges, prepare for standardized tests, work on your essays, and gather recommendations without feeling rushed.",
      isOpen: false,
    },
    {
      id: 3,
      question: "How does the college matching service work?",
      answer:
        "Our college matching service uses a sophisticated algorithm that considers your academic profile, interests, career goals, and preferences to suggest colleges that best fit your needs. We analyze factors like location, size, programs offered, and admission requirements.",
      isOpen: false,
    },
    {
      id: 4,
      question: "Can CollegeEase help with financial aid applications?",
      answer:
        "Yes! We provide guidance on completing the FAFSA, CSS Profile, and other financial aid forms. We also offer resources about scholarships, grants, and other funding opportunities to help make college more affordable.",
      isOpen: false,
    },
    {
      id: 5,
      question:
        "What makes CollegeEase different from other college counseling services?",
      answer:
        "CollegeEase combines personalized guidance with innovative technology to provide a comprehensive, stress-free college application experience. Our platform offers real-time tracking, automated reminders, and expert advice all in one place.",
      isOpen: false,
    },
  ]);

  const toggleFAQ = (id: number) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq))
    );
  };

  const updateFAQ = (id: number, field: keyof FAQ, value: string) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };

  const addNewFAQ = () => {
    const newFAQ: FAQ = {
      id: faqs.length > 0 ? Math.max(...faqs.map((faq) => faq.id)) + 1 : 1,
      question: "New Question",
      answer: "Enter answer here...",
      isOpen: true,
    };
    setFaqs([...faqs, newFAQ]);
  };

  const deleteFAQ = (id: number) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const saveChanges = () => {
    // In a real application, this would send data to an API
    toast({
      title: "Changes saved",
      description: "Your FAQs have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage FAQs
          </h1>
          <div className="flex gap-4">
            <Button onClick={addNewFAQ}>
              <Plus className="mr-2 h-4 w-4" />
              Add New FAQ
            </Button>
            <a href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </a>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <div className="mt-2">
                    <Grip className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <Input
                        value={faq.question}
                        onChange={(e) =>
                          updateFAQ(faq.id, "question", e.target.value)
                        }
                        className="text-lg font-semibold mb-2"
                        placeholder="Question"
                      />
                      <div className="flex items-center gap-2 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFAQ(faq.id)}
                        >
                          {faq.isOpen ? <ChevronUp /> : <ChevronDown />}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteFAQ(faq.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {faq.isOpen && (
                      <Textarea
                        value={faq.answer}
                        onChange={(e) =>
                          updateFAQ(faq.id, "answer", e.target.value)
                        }
                        className="mt-2"
                        placeholder="Answer"
                        rows={4}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="sticky bottom-6 bg-white p-4 rounded-lg shadow-lg border flex justify-end">
          <Button onClick={saveChanges} className="w-full md:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
