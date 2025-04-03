import mongoose, { Document, Schema } from 'mongoose';

export interface ISuccessStory extends Document {
  name: string;
  image: string;
  university: string;
  major: string;
  amountRaised: number;
  quote: string;
  impact: string[];
  createdAt: Date;
  updatedAt: Date;
}

const successStorySchema = new Schema<ISuccessStory>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    university: { type: String, required: true },
    major: { type: String, required: true },
    amountRaised: { type: Number, required: true },
    quote: { type: String, required: true },
    impact: { type: [String], required: true },
  },
  { timestamps: true }
);

const SuccessStory = mongoose.model<ISuccessStory>('SuccessStory', successStorySchema);
export default SuccessStory;