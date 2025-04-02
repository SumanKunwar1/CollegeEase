// models/scholarship.model.ts
import mongoose, { Document } from 'mongoose';

// Simplified interface for the list view
export interface ScholarshipBasicInfo {
  id?: string;
  name?: string;
  organizationName?: string;
  type?: "Merit-based" | "Need-based" | "Research" | "Sports" | "Cultural";
  deadline?: string;
  amount?: string;
  status?: "Open" | "Closing Soon" | "Closed";
  coverImage?: string;
}

// Full interface extending Document
export interface ScholarshipDocument extends Document {
  coverImage?: string;
  name?: string;
  organizationName?: string;
  type?: "Merit-based" | "Need-based" | "Research" | "Sports" | "Cultural";
  deadline?: string;
  amount?: string;
  eligibleCountries?: string[];
  requirements?: {
    minimumGPA?: number;
    preferredGPA?: number;
    competitiveGPA?: number;
    majorWeights?: Record<string, number>;
    countryDiversity?: {
      priority?: string[];
      weight?: number;
    };
  };
  vision?: {
    purpose?: string;
    impact?: string;
    goals?: string;
  };
  institution?: {
    name?: string;
    history?: string;
    achievements?: string[];
    accreditation?: string[];
  };
  eligibility?: {
    academicRequirements?: string[];
    financialNeed?: string;
    nationality?: string[];
    ageLimit?: string;
    studyLevel?: string[];
    languageRequirements?: string[];
    specialRequirements?: string[];
  };
  benefits?: {
    coverage?: string[];
    additionalPerks?: string[];
  };
  statistics?: {
    averageGPAAwarded?: number;
    totalApplications?: number;
    acceptanceRate?: number;
    majorDistribution?: Record<string, number>;
  };
  applicationProcess?: string[];
  status?: "Open" | "Closing Soon" | "Closed";
}

const ScholarshipSchema = new mongoose.Schema({
  coverImage: { type: String, required: false },
  name: { type: String, required: false },
  organizationName: { type: String, required: false },
  type: {
    type: String,
    enum: ["Merit-based", "Need-based", "Research", "Sports", "Cultural"],
    required: false
  },
  deadline: { type: String, required: false },
  amount: { type: String, required: false },
  eligibleCountries: { type: [String], required: false },
  requirements: {
    minimumGPA: { type: Number, required: false },
    preferredGPA: { type: Number, required: false },
    competitiveGPA: { type: Number, required: false },
    majorWeights: { type: Map, of: Number, required: false },
    countryDiversity: {
      priority: { type: [String], required: false },
      weight: { type: Number, required: false }
    }
  },
  vision: {
    purpose: { type: String, required: false },
    impact: { type: String, required: false },
    goals: { type: String, required: false }
  },
  institution: {
    name: { type: String, required: false },
    history: { type: String, required: false },
    achievements: { type: [String], required: false },
    accreditation: { type: [String], required: false }
  },
  eligibility: {
    academicRequirements: { type: [String], required: false },
    financialNeed: { type: String, required: false },
    nationality: { type: [String], required: false },
    ageLimit: { type: String, required: false },
    studyLevel: { type: [String], required: false },
    languageRequirements: { type: [String], required: false },
    specialRequirements: { type: [String], required: false }
  },
  benefits: {
    coverage: { type: [String], required: false },
    additionalPerks: { type: [String], required: false }
  },
  statistics: {
    averageGPAAwarded: { type: Number, required: false },
    totalApplications: { type: Number, required: false },
    acceptanceRate: { type: Number, required: false },
    majorDistribution: { type: Map, of: Number, required: false }
  },
  applicationProcess: { type: [String], required: false },
  status: {
    type: String,
    enum: ["Open", "Closing Soon", "Closed"],
    required: false
  }
}, { timestamps: true });

export default mongoose.model<ScholarshipDocument>('Scholarship', ScholarshipSchema);