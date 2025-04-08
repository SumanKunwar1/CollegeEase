// src/controllers/aboutUs.controller.ts
import { Request, Response, NextFunction } from 'express';
import AboutUs from '../models/aboutUs.model';
import { asyncHandler } from '../utils/asyncHandler';
import ErrorResponse from '../utils/errorResponse';

// Initialize default data (same as your frontend data)
const initializeDefaultData = async () => {
  const count = await AboutUs.countDocuments();
  if (count === 0) {
    const defaultData = {
      title: "About CollegeEase",
      tagline: "Empowering Your Educational Journey",
      welcomeTitle: "Welcome to CollegeEase",
      welcomeDescription: "CollegeEase is your ultimate companion in navigating the world of higher education...",
      featuresTitle: "What We Offer",
      features: [
        { icon: "FaSearch", title: "Search & Compare Colleges", description: "Easily filter and compare institutions..." },
        { icon: "FaTrophy", title: "College Rankings", description: "Access up-to-date rankings based on..." },
        { icon: "FaVrCardboard", title: "Virtual Campus Tours", description: "Experience campuses from anywhere..." },
        { icon: "FaGraduationCap", title: "Scholarship Finder", description: "Discover funding opportunities..." },
        { icon: "FaRobot", title: "Smart Admission Predictor", description: "Estimate your admission chances..." },
        { icon: "FaUserFriends", title: "Application Guidance & Mentorship", description: "Get expert guidance..." },
        { icon: "FaBriefcase", title: "Career & Internship Opportunities", description: "Prepare for your future..." },
        { icon: "FaComments", title: "Community & Student Forums", description: "Engage with fellow students..." }
      ],
      benefitsTitle: "Why Choose CollegeEase?",
      benefits: [
        "Comprehensive Database – Access thousands of colleges...",
        "User-Friendly Platform – Navigate easily with...",
        "Data-Driven Insights – Make well-informed decisions...",
        "Personalized Support – Get guidance tailored...",
        "Completely Free to Use – Quality education accessible...",
        "Career Advancement – Explore internships..."
      ],
      ctaTitle: "Join Us in Simplifying Education",
      ctaDescription: "Whether you're a high school student exploring options...",
      ctaButtonText: "Start your journey today",
      imageUrl: "/Public/Assets/images/Harvard University.jpg"
    };
    await AboutUs.create(defaultData);
  }
};

// Get About Us data
export const getAboutUs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await initializeDefaultData();
  const aboutUs = await AboutUs.findOne();
  
  if (!aboutUs) {
    return next(new ErrorResponse('About Us data not found', 404));
  }

  res.status(200).json({
    success: true,
    data: aboutUs
  });
});

// Update About Us data
export const updateAboutUs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { 
    title, 
    tagline, 
    welcomeTitle, 
    welcomeDescription, 
    featuresTitle, 
    features, 
    benefitsTitle, 
    benefits, 
    ctaTitle, 
    ctaDescription, 
    ctaButtonText, 
    imageUrl 
  } = req.body;

  const aboutUs = await AboutUs.findOneAndUpdate(
    {},
    { 
      title, 
      tagline, 
      welcomeTitle, 
      welcomeDescription, 
      featuresTitle, 
      features, 
      benefitsTitle, 
      benefits, 
      ctaTitle, 
      ctaDescription, 
      ctaButtonText, 
      imageUrl 
    },
    { new: true, runValidators: true }
  );

  if (!aboutUs) {
    return next(new ErrorResponse('About Us data not found', 404));
  }

  res.status(200).json({
    success: true,
    data: aboutUs
  });
});