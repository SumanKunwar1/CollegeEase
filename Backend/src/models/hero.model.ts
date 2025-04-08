// src/models/hero.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IHero extends Document {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  description: string;
  stats: {
    colleges: string;
    students: string;
    scholarships: string;
  };
  bannerMedia: {
    type: string;
    src: string;
  };
}

const HeroSchema: Schema = new Schema({
  titleLine1: { type: String, required: true, default: "Your journey to" },
  titleLine2: { type: String, required: true, default: "higher education" },
  titleLine3: { type: String, required: true, default: "starts here" },
  description: { 
    type: String, 
    required: true, 
    default: "Find your perfect college, discover scholarships, and connect with a community that supports your educational dreams." 
  },
  stats: {
    colleges: { type: String, required: true, default: "1000+" },
    students: { type: String, required: true, default: "50K+" },
    scholarships: { type: String, required: true, default: "5K+" }
  },
  bannerMedia: {
    type: { type: String, required: true, enum: ['image', 'video'], default: 'video' },
    src: { 
      type: String, 
      required: true, 
      default: "/Public/Assets/videos/Banner Video.mp4" 
    }
  }
}, { timestamps: true });

export default mongoose.model<IHero>('Hero', HeroSchema);