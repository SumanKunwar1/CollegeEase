"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminFeatureCard from "../../../components/AdminFeatureCard";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { 
  FaSearch, 
  FaTrophy, 
  FaVrCardboard, 
  FaGraduationCap, 
  FaRobot, 
  FaUserFriends, 
  FaBriefcase, 
  FaComments 
} from "react-icons/fa";

// Icon mapping
const iconComponents: { [key: string]: React.ComponentType<any> } = {
  FaSearch,
  FaTrophy,
  FaVrCardboard,
  FaGraduationCap,
  FaRobot,
  FaUserFriends,
  FaBriefcase,
  FaComments
};

const AdminAboutCollegeEase: React.FC = () => {
  const [aboutData, setAboutData] = useState({
    title: "",
    tagline: "",
    welcomeTitle: "",
    welcomeDescription: "",
    featuresTitle: "",
    features: [] as Array<{ icon: string; title: string; description: string }>,
    benefitsTitle: "",
    benefits: [] as string[],
    ctaTitle: "",
    ctaDescription: "",
    ctaButtonText: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/aboutus`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        
        setAboutData({
          title: data.data.title,
          tagline: data.data.tagline,
          welcomeTitle: data.data.welcomeTitle,
          welcomeDescription: data.data.welcomeDescription,
          featuresTitle: data.data.featuresTitle,
          features: data.data.features,
          benefitsTitle: data.data.benefitsTitle,
          benefits: data.data.benefits,
          ctaTitle: data.data.ctaTitle,
          ctaDescription: data.data.ctaDescription,
          ctaButtonText: data.data.ctaButtonText,
        });
        setImageUrl(data.data.imageUrl);
        setTempImageUrl(data.data.imageUrl);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching about us data:', error);
        setIsLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  // Handle text changes
  const handleTextChange = (field: string, value: string) => {
    setAboutData(prev => ({ ...prev, [field]: value }));
  };

  // Handle feature changes
  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...aboutData.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setAboutData(prev => ({ ...prev, features: updatedFeatures }));
  };

  // Handle benefit changes
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...aboutData.benefits];
    updatedBenefits[index] = value;
    setAboutData(prev => ({ ...prev, benefits: updatedBenefits }));
  };

  // Handle image URL change
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempImageUrl(e.target.value);
  };

  // Apply image URL
  const applyImageUrl = () => {
    setImageUrl(tempImageUrl);
  };

  // Save updates to backend
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/aboutus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...aboutData,
          imageUrl
        })
      });

      if (!response.ok) throw new Error('Failed to update data');

      alert("Changes saved successfully!");
    } catch (error) {
      console.error('Error saving about us data:', error);
      alert("Failed to save changes. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Card className="p-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-700">Main Title & Tagline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={aboutData.title}
                  onChange={(e) => handleTextChange("title", e.target.value)}
                  className="text-2xl font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={aboutData.tagline}
                  onChange={(e) => handleTextChange("tagline", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Welcome Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-700">Image Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="CollegeEase Campus"
                  className="rounded-lg shadow-lg w-full h-auto mb-4"
                />
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      value={tempImageUrl}
                      onChange={handleImageUrlChange}
                      placeholder="Enter image URL"
                      className="flex-1"
                    />
                    <Button onClick={applyImageUrl}>Apply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <Card className="p-6 shadow-md h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-700">Welcome Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="welcomeTitle">Welcome Title</Label>
                  <Input
                    id="welcomeTitle"
                    value={aboutData.welcomeTitle}
                    onChange={(e) => handleTextChange("welcomeTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeDescription">Welcome Description</Label>
                  <Textarea
                    id="welcomeDescription"
                    value={aboutData.welcomeDescription}
                    onChange={(e) => handleTextChange("welcomeDescription", e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="p-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-700">Features Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="featuresTitle">Features Title</Label>
                <Input
                  id="featuresTitle"
                  value={aboutData.featuresTitle}
                  onChange={(e) => handleTextChange("featuresTitle", e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
                {aboutData.features.map((feature, index) => {
                  const IconComponent = iconComponents[feature.icon];
                  return (
                    <AdminFeatureCard
                      key={index}
                      icon={IconComponent ? <IconComponent /> : <div>{feature.icon}</div>}
                      title={feature.title}
                      description={feature.description}
                      onTitleChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                      onDescriptionChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="p-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-700">Benefits Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="benefitsTitle">Benefits Title</Label>
                <Input
                  id="benefitsTitle"
                  value={aboutData.benefitsTitle}
                  onChange={(e) => handleTextChange("benefitsTitle", e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {aboutData.benefits.map((benefit, index) => (
                  <Card key={index} className="p-4 shadow-sm">
                    <Textarea
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      rows={4}
                      className="resize-none border-none focus:ring-0"
                    />
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <Card className="p-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-700">Call to Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ctaTitle">CTA Title</Label>
                <Input
                  id="ctaTitle"
                  value={aboutData.ctaTitle}
                  onChange={(e) => handleTextChange("ctaTitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaDescription">CTA Description</Label>
                <Textarea
                  id="ctaDescription"
                  value={aboutData.ctaDescription}
                  onChange={(e) => handleTextChange("ctaDescription", e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaButtonText">Button Text</Label>
                <Input
                  id="ctaButtonText"
                  value={aboutData.ctaButtonText}
                  onChange={(e) => handleTextChange("ctaButtonText", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Update Button */}
        <div className="text-center mt-16">
          <Button
            onClick={handleSave}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold"
          >
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutCollegeEase;