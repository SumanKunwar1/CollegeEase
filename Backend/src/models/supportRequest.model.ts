import mongoose, { Document, Schema } from 'mongoose';

export interface ISupportRequest extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const supportRequestSchema = new Schema<ISupportRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
  },
  { timestamps: true }
);

const SupportRequest = mongoose.model<ISupportRequest>('SupportRequest', supportRequestSchema);
export default SupportRequest;