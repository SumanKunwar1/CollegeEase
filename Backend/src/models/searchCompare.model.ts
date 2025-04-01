import mongoose, { Document } from 'mongoose';

export interface ICollege extends Document {
  organizationName: string;
  location: string;
  tuitionRange: string;
  acceptanceRate: string;
  studentPopulation: string;
  courses: string[];
}

const collegeSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  location: { type: String, required: true },
  tuitionRange: { type: String, required: true },
  acceptanceRate: { type: String, required: true },
  studentPopulation: { type: String, required: true },
  courses: { type: [String], default: [] },
});

export const CollegeModel = mongoose.model<ICollege>('searchCompare', collegeSchema);