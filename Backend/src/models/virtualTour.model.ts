import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IVirtualTour extends Document {
  title: string;
  url: string;
  thumbnail?: string;
}

export interface ICollege extends Document {
  organizationName: string;
  location: string;
  rating?: number;
  tuitionRange?: string;
  acceptanceRate?: string;
  studentPopulation?: string;
  courses?: string[];
  rankings?: {
    academic: number;
    studentSatisfaction: number;
    placement: number;
  };
  virtualTours: Types.DocumentArray<IVirtualTour>;
  imageUrl?: string;
  programs?: string[];
}

const VirtualTourSchema = new Schema<IVirtualTour>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String }
}, { _id: true });

const CollegeSchema = new Schema<ICollege>({
  organizationName: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  tuitionRange: { type: String },
  acceptanceRate: { type: String },
  studentPopulation: { type: String },
  courses: { type: [String] },
  rankings: {
    academic: { type: Number, default: 0 },
    studentSatisfaction: { type: Number, default: 0 },
    placement: { type: Number, default: 0 }
  },
  virtualTours: [VirtualTourSchema],
  imageUrl: { type: String },
  programs: { type: [String] }
}, { timestamps: true });

export const VirtualTourModel = mongoose.model<ICollege>('VirtualTour', CollegeSchema);
export type VirtualTour = IVirtualTour;
export type College = ICollege;