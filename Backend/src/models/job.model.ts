import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  requirements: string[];
  responsibilities: string[];
  whyJoinUs: string;
}

const jobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  requirements: { type: [String], required: true },
  responsibilities: { type: [String], required: true },
  whyJoinUs: { type: String, required: true },
}, {
  timestamps: true
});

export const Job = mongoose.model<IJob>('Job', jobSchema);