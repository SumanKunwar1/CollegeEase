"use client";

import { useState } from "react";
import { Save, FileText, Trash, Plus } from "lucide-react";
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

interface TermsSection {
  id: number;
  title: string;
  content: string;
}

export function AdminTermsOfServicePage() {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState("March 15, 2024");
  const [sections, setSections] = useState<TermsSection[]>([
    {
      id: 1,
      title: "1. Agreement to Terms",
      content:
        "By accessing or using CollegeEase's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.",
    },
    {
      id: 2,
      title: "2. Description of Services",
      content:
        "CollegeEase provides college application assistance, including but not limited to:\n- Application tracking and management\n- Essay writing assistance\n- College matching services\n- Deadline reminders\n- Expert guidance and resources",
    },
    {
      id: 3,
      title: "3. User Accounts",
      content:
        "- You must provide accurate and complete information when creating an account\n- You are responsible for maintaining the security of your account\n- You must notify us immediately of any unauthorized access\n- We reserve the right to terminate accounts that violate our terms",
    },
    {
      id: 4,
      title: "4. Payment Terms",
      content:
        "- All fees are charged in advance for our services\n- Refunds are available within 30 days of purchase if services are unused\n- Subscription plans automatically renew unless cancelled\n- Price changes will be notified 30 days in advance",
    },
    {
      id: 5,
      title: "5. Intellectual Property",
      content:
        "All content, features, and functionality of our services are owned by CollegeEase and are protected by international copyright, trademark, and other intellectual property laws.",
    },
    {
      id: 6,
      title: "6. User Content",
      content:
        "- You retain ownership of content you submit\n- You grant us license to use your content for providing services\n- You are responsible for the content you submit\n- We may remove content that violates our terms",
    },
    {
      id: 7,
      title: "7. Limitation of Liability",
      content:
        "CollegeEase shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.",
    },
    {
      id: 8,
      title: "8. Changes to Terms",
      content:
        "We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website.",
    },
    {
      id: 9,
      title: "9. Contact Information",
      content:
        "For questions about these Terms of Service, please contact us at:\nEmail: legal@collegeease.com\nPhone: 1-800-COLLEGE",
    },
  ]);

  const updateSection = (
    id: number,
    field: keyof TermsSection,
    value: string
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const addNewSection = () => {
    const newSection: TermsSection = {
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
      description: "Your terms of service have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Terms of Service
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
              <FileText className="w-16 h-16 text-blue-600" />
              <Input
                value="Terms of Service"
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
