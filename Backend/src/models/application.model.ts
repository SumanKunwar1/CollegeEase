import mongoose, { Document } from 'mongoose';

interface IDocument {
  type: string;
  fileName: string;
  filePath: string;
}

interface IApplication extends Document {
  collegeName: string;
  studentName: string;
  email: string;
  phone: string;
  program: string;
  level: 'undergraduate' | 'postgraduate' | 'doctorate';
  intake: string;
  documents: IDocument[];
  status: 'pending' | 'approved' | 'rejected';
  score?: number;
  interviewDate?: Date;
  createdAt: Date;
}

const ApplicationSchema = new mongoose.Schema<IApplication>({
  collegeName: { type: String, required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  level: { type: String, required: true, enum: ['undergraduate', 'postgraduate', 'doctorate'] },
  intake: { type: String, required: true },
  documents: [{
    type: { type: String, required: true },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true }
  }],
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
  score: { type: Number },
  interviewDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IApplication>('Application', ApplicationSchema);