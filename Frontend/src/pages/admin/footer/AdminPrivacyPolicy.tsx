"use client";

import { useState } from "react";
import { Save, Shield, Trash, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useToast } from "../../../components/ui/use-toast";

interface PolicySection {
  id: number;
  title: string;
  content: string;
}

export function AdminPrivacyPolicyPage() {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState("March 15, 2024");
  const [sections, setSections] = useState<PolicySection[]>([
    {
      id: 1,
      title: "1. Introduction",
      content:
        'CollegeEase ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.',
    },
    {
      id: 2,
      title: "2. Information We Collect",
      content:
        "We collect information that you provide directly to us, including:\n\n- Personal information (name, email address, phone number)\n- Academic information (test scores, GPA, transcripts)\n- College preferences and application details\n- Payment information",
    },
    {
      id: 3,
      title: "3. How We Use Your Information",
      content:
        "We use the information we collect to:\n\n- Provide and improve our services\n- Personalize your experience\n- Process your applications\n- Communicate with you\n- Analyze and enhance our platform",
    },
    {
      id: 4,
      title: "4. Information Sharing",
      content:
        "We do not sell your personal information. We may share your information with:\n\n- College admissions offices (with your consent)\n- Service providers who assist in our operations\n- Legal authorities when required by law",
    },
    {
      id: 5,
      title: "5. Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      id: 6,
      title: "6. Your Rights",
      content:
        "You have the right to:\n\n- Access your personal information\n- Correct inaccurate information\n- Request deletion of your information\n- Opt-out of marketing communications",
    },
    {
      id: 7,
      title: "7. Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at:\nEmail: privacy@collegeease.com\nPhone: 1-800-COLLEGE",
    },
  ]);

  const updateSection = (
    id: number,
    field: keyof PolicySection,
    value: string
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const addNewSection = () => {
    const newSection: PolicySection = {
      id:
        sections.length > 0
          ? Math.max(...sections.map((section) => section.id)) + 1
          : 1,
      title: `${sections.length + 1}. New Section`,
      content: "Enter content here...",
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = (id: number) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const saveChanges = () => {
    // In a real application, this would send data to an API
    toast({
      title: "Changes saved",
      description: "Your privacy policy has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Privacy Policy
          </h1>
          <div className="flex gap-4">
            <Button onClick={addNewSection} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add New Section
            </Button>
            <a href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </a>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Header Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center flex-col gap-4">
              <Shield className="w-16 h-16 text-blue-600" />
              <Input
                value="Privacy Policy"
                className="text-2xl font-bold text-center"
                disabled
              />
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Last updated:</span>
                <Input
                  value={lastUpdated}
                  onChange={(e) => setLastUpdated(e.target.value)}
                  className="w-40"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 mb-8">
          {sections.map((section) => (
            <Card key={section.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      updateSection(section.id, "title", e.target.value)
                    }
                    className="text-xl font-semibold"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSection(section.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <Textarea
                  value={section.content}
                  onChange={(e) =>
                    updateSection(section.id, "content", e.target.value)
                  }
                  className="min-h-[150px]"
                  rows={6}
                />
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
