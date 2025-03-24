"use client";

import { useState } from "react";
import { Save, Cookie, Trash, Plus } from "lucide-react";
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

interface CookieSection {
  id: number;
  title: string;
  content: string;
}

export function AdminCookiesPage() {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState("March 23, 2024");
  const [headerContent, setHeaderContent] = useState(
    "How CollegeEase uses cookies and similar technologies"
  );
  const [sections, setSections] = useState<CookieSection[]>([
    {
      id: 1,
      title: "Introduction",
      content:
        'This Cookie Policy explains how CollegeEase ("we", "us", or "our") uses cookies and similar technologies when you visit our website at collegeease.com ("Website"). This policy should be read alongside our Privacy Policy and Terms of Service.',
    },
    {
      id: 2,
      title: "What Are Cookies?",
      content:
        "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies enhance user experience by remembering your preferences and enabling certain functionality.",
    },
    {
      id: 3,
      title: "How We Use Cookies",
      content:
        "We use cookies for various purposes, including:\n\n- Essential Cookies: These cookies are necessary for the Website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.\n\n- Analytical/Performance Cookies: These cookies allow us to recognize and count the number of visitors and see how visitors move around our Website. This helps us improve the way our Website works, for example, by ensuring that users find what they are looking for easily.\n\n- Functionality Cookies: These cookies are used to recognize you when you return to our Website. They enable us to personalize our content for you, greet you by name, and remember your preferences (for example, your choice of language or region).\n\n- Targeting Cookies: These cookies record your visit to our Website, the pages you have visited, and the links you have followed. We use this information to make our Website and the advertising displayed on it more relevant to your interests.",
    },
    {
      id: 4,
      title: "Third-Party Cookies",
      content:
        "In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Website and deliver advertisements on and through the Website. These third parties may include:\n\n- Google Analytics (for website analytics)\n- Facebook (for social media integration and advertising)\n- LinkedIn (for social media integration and advertising)\n- Twitter (for social media integration)",
    },
    {
      id: 5,
      title: "Managing Cookies",
      content:
        "Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from version to version. However, you can usually find this information in the menu under 'options', 'settings', or 'preferences'.\n\nPlease note that if you choose to disable cookies, some features of our Website may not function properly.",
    },
    {
      id: 6,
      title: "Changes to This Cookie Policy",
      content:
        'We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.\n\nYou are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.',
    },
    {
      id: 7,
      title: "Contact Us",
      content:
        "If you have any questions about our Cookie Policy, please contact us:\n\n- By email: support@collegeease.com\n- By phone: +1-800-COLLEGE\n- By mail: 123 College Ave, University City, CA 90210",
    },
  ]);

  const updateSection = (
    id: number,
    field: keyof CookieSection,
    value: string
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const addNewSection = () => {
    const newSection: CookieSection = {
      id:
        sections.length > 0
          ? Math.max(...sections.map((section) => section.id)) + 1
          : 1,
      title: "New Section",
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
      description: "Your cookie policy has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Cookie Policy
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
              <Cookie className="w-16 h-16 text-blue-600" />
              <div className="space-y-4 w-full">
                <div>
                  <p className="text-sm font-medium mb-1">Page Title</p>
                  <Input
                    value="Cookie Policy"
                    className="text-xl font-bold"
                    disabled
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Subtitle</p>
                  <Input
                    value={headerContent}
                    onChange={(e) => setHeaderContent(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Last Updated Date</p>
                  <Input
                    value={lastUpdated}
                    onChange={(e) => setLastUpdated(e.target.value)}
                  />
                </div>
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
