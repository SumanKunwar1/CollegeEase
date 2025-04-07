import mongoose, { Document, Schema } from 'mongoose';

export interface IResourceRequest extends Document {
  name: string;
  age: number;
  academicBackground: string;
  country: string;
  requestedResources: string;
  createdAt: Date;
}

const ResourceRequestSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  academicBackground: { type: String, required: true },
  country: { type: String, required: true },
  requestedResources: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IResourceRequest>('ResourceRequest', ResourceRequestSchema);