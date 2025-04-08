"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Grip, Plus, Save, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useEnhancedToast } from "../../../components/ui/enhanced-toast";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

export function AdminFAQPage() {
  const { toast } = useEnhancedToast();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/faqs`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      
      const data = await response.json();
      setFaqs(data.data.map((faq: FAQ) => ({ ...faq, isOpen: false })));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: "Error",
        description: "Failed to load FAQs",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const toggleFAQ = (id: string) => {
    setFaqs(
      faqs.map((faq) => (faq._id === id ? { ...faq, isOpen: !faq.isOpen } : faq))
    );
  };

  const updateFAQ = (id: string, field: keyof FAQ, value: string) => {
    setFaqs(
      faqs.map((faq) => (faq._id === id ? { ...faq, [field]: value } : faq))
    );
  };

  const addNewFAQ = () => {
    const newFAQ: FAQ = {
      _id: `temp-${Date.now()}`,
      question: "New Question",
      answer: "Enter answer here...",
      isOpen: true,
    };
    setFaqs([...faqs, newFAQ]);
  };

  const deleteFAQ = async (id: string) => {
    // Don't try to delete temporary FAQs (ones not yet saved to backend)
    if (id.startsWith('temp-')) {
      setFaqs(faqs.filter((faq) => faq._id !== id));
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/faqs/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete FAQ');
      }

      setFaqs(faqs.filter((faq) => faq._id !== id));
      toast({
        title: "Success",
        description: "FAQ deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to delete FAQ",
        variant: "destructive",
      });
    }
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Process all FAQs - create new ones and update existing ones
      const results = await Promise.allSettled(
        faqs.map(async (faq) => {
          if (faq._id.startsWith('temp-')) {
            // Create new FAQ
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/faqs`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                question: faq.question,
                answer: faq.answer,
              }),
              credentials: 'include',
            });

            if (!response.ok) {
              throw new Error('Failed to create FAQ');
            }

            return await response.json();
          } else {
            // Update existing FAQ
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/faqs/${faq._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                question: faq.question,
                answer: faq.answer,
              }),
              credentials: 'include',
            });

            if (!response.ok) {
              throw new Error('Failed to update FAQ');
            }

            return await response.json();
          }
        })
      );

      // Check for any errors
      const errors = results.filter(result => result.status === 'rejected');
      if (errors.length > 0) {
        throw new Error('Some operations failed');
      }

      // Refresh the FAQs list
      await fetchFAQs();
      
      toast({
        title: "Success",
        description: "All changes saved successfully",
      });
    } catch (error) {
      console.error('Error saving FAQs:', error);
      toast({
        title: "Error",
        description: "Failed to save some changes",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin: Manage FAQs</h1>
          <div className="flex justify-center items-center h-64">
            <p>Loading FAQs...</p>
          </div>
        </div>
      </div>
    );
  }

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
          {faqs.length === 0 ? (
            <Card>
              <CardContent className="p-4 text-center">
                <p>No FAQs found. Add your first FAQ!</p>
              </CardContent>
            </Card>
          ) : (
            faqs.map((faq) => (
              <Card key={faq._id} className="overflow-hidden">
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
                            updateFAQ(faq._id, "question", e.target.value)
                          }
                          className="text-lg font-semibold mb-2"
                          placeholder="Question"
                        />
                        <div className="flex items-center gap-2 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFAQ(faq._id)}
                          >
                            {faq.isOpen ? <ChevronUp /> : <ChevronDown />}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteFAQ(faq._id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {faq.isOpen && (
                        <Textarea
                          value={faq.answer}
                          onChange={(e) =>
                            updateFAQ(faq._id, "answer", e.target.value)
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
            ))
          )}
        </div>

        <div className="sticky bottom-6 bg-white p-4 rounded-lg shadow-lg border flex justify-end">
          <Button onClick={saveChanges} className="w-full md:w-auto" disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}