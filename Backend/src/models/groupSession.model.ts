import mongoose, { Document, Schema } from 'mongoose';

export interface ISessionFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ISessionReview {
  author: string;
  text: string;
  rating: number;
}

export interface IGroupSession extends Document {
  title: string;
  mentor: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  price: string;
  tags: string[];
  imageUrl: string;
  description: string;
  features: ISessionFeature[];
  reviews: ISessionReview[];
}

const groupSessionSchema = new Schema<IGroupSession>({
  title: { type: String, required: true },
  mentor: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  participants: { type: Number, required: true },
  price: { type: String, required: true },
  tags: { type: [String], default: [] },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  features: {
    type: [{
      title: String,
      description: String,
      icon: String
    }],
    default: []
  },
  reviews: {
    type: [{
      author: String,
      text: String,
      rating: Number
    }],
    default: []
  }
}, { timestamps: true });

const GroupSession = mongoose.model<IGroupSession>('GroupSession', groupSessionSchema);

export default GroupSession;