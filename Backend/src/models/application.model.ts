import mongoose, { Document } from 'mongoose';

interface IDocument {
  type: string;
  fileName: string;
  filePath: string;
}

interface IPreviousEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  gpa: string;
  graduationDate: string;
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
  // Personal Info
  firstName: string;
  lastName: string;
  dob: string;
  nationality: string;
  // Test Scores
  testType?: string;
  testScore?: string;
  testDate?: string;
  // Additional Info
  projects?: string;
  publications?: string;
  researchExperience?: string;
  workExperience?: string;
  statementOfPurpose: string;
  // Education History
  previousEducation: IPreviousEducation[];
}

const PreviousEducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  gpa: { type: String, required: true },
  graduationDate: { type: String, required: true }
});

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
  // Personal Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true },
  nationality: { type: String, required: true },
  // Test Scores
  testType: { type: String },
  testScore: { type: String },
  testDate: { type: String },
  // Additional Info
  projects: { type: String },
  publications: { type: String },
  researchExperience: { type: String },
  workExperience: { type: String },
  statementOfPurpose: { type: String, required: true },
  // Education History
  previousEducation: [PreviousEducationSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IApplication>('Application', ApplicationSchema);