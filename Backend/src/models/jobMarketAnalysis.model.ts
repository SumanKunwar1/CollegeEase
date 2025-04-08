// models/jobMarketAnalysis.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface MarketInsight {
  _id: string;
  role: string;
  growth: string;
  avgSalary: string;
  topLocations: string[];
  skills: string[];
  demand: string;
  imageUrl: string;
  detailedAnalysis: {
    jobDescription: string;
    industryTrends: string;
    salaryRange: string;
    careerPath: string[];
    keyCompanies: string[];
    futureOutlook: string;
  };
}

export interface Category extends Document {
  title: string;
  description: string;
  insights: MarketInsight[];
}

const MarketInsightSchema = new Schema<MarketInsight>({
  role: { type: String, required: true },
  growth: { type: String, required: true },
  avgSalary: { type: String, required: true },
  topLocations: { type: [String], required: true },
  skills: { type: [String], required: true },
  demand: { type: String, required: true },
  imageUrl: { type: String, required: true },
  detailedAnalysis: {
    jobDescription: { type: String, required: true },
    industryTrends: { type: String, required: true },
    salaryRange: { type: String, required: true },
    careerPath: { type: [String], required: true },
    keyCompanies: { type: [String], required: true },
    futureOutlook: { type: String, required: true },
  },
});

const CategorySchema = new Schema<Category>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    insights: { type: [MarketInsightSchema], default: [] },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model<Category>('Category', CategorySchema);