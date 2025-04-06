import mongoose, { Document, Schema } from 'mongoose';

export interface IAboutUs extends Document {
  title: string;
  tagline: string;
  welcomeTitle: string;
  welcomeDescription: string;
  featuresTitle: string;
  benefitsTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  imageUrl: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefits: string[];
}

const AboutUsSchema: Schema = new Schema({
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  welcomeTitle: { type: String, required: true },
  welcomeDescription: { type: String, required: true },
  featuresTitle: { type: String, required: true },
  benefitsTitle: { type: String, required: true },
  ctaTitle: { type: String, required: true },
  ctaDescription: { type: String, required: true },
  ctaButtonText: { type: String, required: true },
  imageUrl: { type: String, required: true },
  features: [{
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  benefits: [{ type: String, required: true }]
});

export default mongoose.model<IAboutUs>('AboutUs', AboutUsSchema);