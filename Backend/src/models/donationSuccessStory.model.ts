import mongoose, { Document } from 'mongoose';

export interface IDonationSuccessStory extends Document {
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

const donationSuccessStorySchema = new mongoose.Schema<IDonationSuccessStory>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    university: {
      type: String,
      required: [true, 'University is required'],
      trim: true,
    },
    major: {
      type: String,
      required: [true, 'Major is required'],
      trim: true,
    },
    amountRaised: {
      type: Number,
      required: [true, 'Amount raised is required'],
      min: [0, 'Amount raised cannot be negative'],
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
      trim: true,
    },
    impact: {
      type: [String],
      required: [true, 'Impact items are required'],
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: 'At least one impact item is required',
      },
    },
  },
  {
    timestamps: true,
  }
);

const DonationSuccessStory = mongoose.model<IDonationSuccessStory>(
  'DonationSuccessStory',
  donationSuccessStorySchema,
  'donationsuccessstory'
);

export default DonationSuccessStory;