import mongoose, { Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  author: string;
  type: string;
  description: string;
  downloadUrl: string;
  downloadCount: number;
  rating: number;
  reviewCount: number;
  datePublished: Date;
  fileSize: string;
  detailedDescription?: string;
  requirements?: string[];
  videoUrl?: string;
  imageUrl?: string;
}

const resourceSchema = new mongoose.Schema<IResource>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  downloadUrl: { type: String, required: true },
  downloadCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  datePublished: { type: Date, default: Date.now },
  fileSize: { type: String, required: true },
  detailedDescription: { type: String },
  requirements: { type: [String], default: [] },
  videoUrl: { type: String },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

const Resource = mongoose.model<IResource>('Resource', resourceSchema);

export default Resource;