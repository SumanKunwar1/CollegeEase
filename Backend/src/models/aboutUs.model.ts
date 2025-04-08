// src/models/aboutUs.model.ts
import mongoose, { Document } from 'mongoose';

export interface IAboutUs extends Document {
  title: string;
  tagline: string;
  welcomeTitle: string;
  welcomeDescription: string;
  featuresTitle: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  benefitsTitle: string;
  benefits: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  imageUrl: string;
}

const aboutUsSchema = new mongoose.Schema<IAboutUs>({
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  welcomeTitle: { type: String, required: true },
  welcomeDescription: { type: String, required: true },
  featuresTitle: { type: String, required: true },
  features: [{
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  benefitsTitle: { type: String, required: true },
  benefits: [{ type: String, required: true }],
  ctaTitle: { type: String, required: true },
  ctaDescription: { type: String, required: true },
  ctaButtonText: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

const AboutUs = mongoose.model<IAboutUs>('AboutUs', aboutUsSchema);
export default AboutUs;