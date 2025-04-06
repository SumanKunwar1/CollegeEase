import mongoose, { Document, Schema } from 'mongoose';

export interface IBecameMentor extends Document {
  name: string;
  email: string;
  college: string;
  expertise: string;
  experience: string;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

const becameMentorSchema = new Schema<IBecameMentor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  college: { type: String, required: true },
  expertise: { type: String, required: true },
  experience: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IBecameMentor>('BecameMentor', becameMentorSchema);