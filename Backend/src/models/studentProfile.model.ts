import mongoose, { Document } from 'mongoose';

export interface IStudentProfile extends Document {
  studentName: string;
  financialNeeds: string;
  academicHistory: string;
  goals: string;
  raised: number;
  goal: number;
  image: string;
  story?: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentProfileSchema = new mongoose.Schema<IStudentProfile>(
  {
    studentName: { type: String, required: true },
    financialNeeds: { type: String, required: true },
    academicHistory: { type: String, required: true },
    goals: { type: String, required: true },
    raised: { type: Number, default: 0 },
    goal: { type: Number, required: true },
    image: { type: String, required: true },
    story: { type: String },
  },
  { timestamps: true }
);

const StudentProfile = mongoose.model<IStudentProfile>('StudentProfile', studentProfileSchema);
export default StudentProfile;