import mongoose, { Document, Schema } from 'mongoose';

export interface IApplicationForm extends Document {
  jobId: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  educationLevel: string;
  coverLetter: string;
  address: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: Date;
}

const applicationFormSchema = new Schema<IApplicationForm>({
  jobId: { type: String, required: true },
  company: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  educationLevel: { type: String, required: true },
  coverLetter: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export const ApplicationForm = mongoose.model<IApplicationForm>('ApplicationForm', applicationFormSchema);