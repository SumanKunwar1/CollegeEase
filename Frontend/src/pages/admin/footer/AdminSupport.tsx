"use client";

import { useState } from "react";
import { Mail, MessageSquare, Phone, Save } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useToast } from "../../../components/ui/use-toast";

interface ContactInfo {
  email: string;
  phone: string;
  chat: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export function AdminSupportPage() {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "support@collegeease.com",
    phone: "1-800-COLLEGE (265-5343)",
    chat: "Available in your dashboard",
    hours: {
      weekdays: "Monday - Friday: 9AM - 8PM EST",
      saturday: "Saturday: 10AM - 6PM EST",
      sunday: "Sunday: Closed",
    },
  });

  const [formFields, setFormFields] = useState({
    nameLabel: "Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Message",
    buttonText: "Send Message",
  });

  const updateContactInfo = (field: keyof ContactInfo, value: string) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const updateHours = (
    field: keyof typeof contactInfo.hours,
    value: string
  ) => {
    setContactInfo({
      ...contactInfo,
      hours: {
        ...contactInfo.hours,
        [field]: value,
      },
    });
  };

  const updateFormField = (field: keyof typeof formFields, value: string) => {
    setFormFields({ ...formFields, [field]: value });
  };

  const saveChanges = () => {
    // In a real application, this would send data to an API
    toast({
      title: "Changes saved",
      description: "Your support page has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin: Manage Support Page
          </h1>
          <a href="/admin">
            <Button variant="outline">Back to Dashboard</Button>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="text-blue-600 mr-4" />
                  <div className="flex-1">
                    <p className="font-medium">Email Support</p>
                    <Input
                      value={contactInfo.email}
                      onChange={(e) =>
                        updateContactInfo("email", e.target.value)
                      }
                      placeholder="Email address"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="text-blue-600 mr-4" />
                  <div className="flex-1">
                    <p className="font-medium">Phone Support</p>
                    <Input
                      value={contactInfo.phone}
                      onChange={(e) =>
                        updateContactInfo("phone", e.target.value)
                      }
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <MessageSquare className="text-blue-600 mr-4" />
                  <div className="flex-1">
                    <p className="font-medium">Live Chat</p>
                    <Input
                      value={contactInfo.chat}
                      onChange={(e) =>
                        updateContactInfo("chat", e.target.value)
                      }
                      placeholder="Chat availability"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <p className="font-medium">Hours of Operation</p>
                <Input
                  value={contactInfo.hours.weekdays}
                  onChange={(e) => updateHours("weekdays", e.target.value)}
                  placeholder="Weekday hours"
                  className="mb-2"
                />
                <Input
                  value={contactInfo.hours.saturday}
                  onChange={(e) => updateHours("saturday", e.target.value)}
                  placeholder="Saturday hours"
                  className="mb-2"
                />
                <Input
                  value={contactInfo.hours.sunday}
                  onChange={(e) => updateHours("sunday", e.target.value)}
                  placeholder="Sunday hours"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Form Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Name Field Label</p>
                <Input
                  value={formFields.nameLabel}
                  onChange={(e) => updateFormField("nameLabel", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Email Field Label</p>
                <Input
                  value={formFields.emailLabel}
                  onChange={(e) =>
                    updateFormField("emailLabel", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Subject Field Label</p>
                <Input
                  value={formFields.subjectLabel}
                  onChange={(e) =>
                    updateFormField("subjectLabel", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Message Field Label</p>
                <Input
                  value={formFields.messageLabel}
                  onChange={(e) =>
                    updateFormField("messageLabel", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Submit Button Text</p>
                <Input
                  value={formFields.buttonText}
                  onChange={(e) =>
                    updateFormField("buttonText", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
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
