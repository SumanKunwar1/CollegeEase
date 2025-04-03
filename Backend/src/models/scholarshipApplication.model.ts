import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IApplication extends Document {
  studentName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  nationality: string;
  address: string;
  currentEducation: string;
  institution: string;
  gpa: number;
  graduationDate: Date;
  testScores: {
    sat?: number;
    act?: number;
    toefl?: number;
    ielts?: number;
  };
  programLevel: string;
  intendedMajor: string;
  scholarshipType: string;
  financialAid: boolean;
  familyIncome?: number;
  extracurriculars?: string;
  achievements?: string;
  workExperience?: string;
  status: 'pending' | 'approved' | 'rejected';
  organization: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    currentEducation: { type: String, required: true },
    institution: { type: String, required: true },
    gpa: { type: Number, required: true },
    graduationDate: { type: Date, required: true },
    testScores: {
      sat: { type: Number },
      act: { type: Number },
      toefl: { type: Number },
      ielts: { type: Number },
    },
    programLevel: { type: String, required: true },
    intendedMajor: { type: String, required: true },
    scholarshipType: { type: String, required: true },
    financialAid: { type: Boolean, default: false },
    familyIncome: { type: Number },
    extracurriculars: { type: String },
    achievements: { type: String },
    workExperience: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    organization: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Application = mongoose.model<IApplication>('ScholarshipApplication', applicationSchema);
export default Application;