// src/models/expertInterview.model.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IInterviewSection {
  title: string;
  content: string;
}

export interface IInterviewResource {
  title: string;
  url: string;
  type: string;
}

export interface IFullInterview {
  introduction: string;
  videoUrl?: string;
  sections: IInterviewSection[];
  keyTakeaways: string[];
  resources: IInterviewResource[];
}

export interface IInterview extends Document {
  name: string;
  role: string;
  topic: string;
  insights: string[];
  imageUrl: string;
  date: string;
  fullInterview?: IFullInterview;
}


export interface IInterviewCategory extends Document {
  category: string;
  interviews: Types.DocumentArray<IInterview & { _id: Types.ObjectId }>;
}

const InterviewSectionSchema = new Schema<IInterviewSection>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const InterviewResourceSchema = new Schema<IInterviewResource>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
});

const FullInterviewSchema = new Schema<IFullInterview>({
  introduction: { type: String, required: true },
  videoUrl: { type: String },
  sections: [InterviewSectionSchema],
  keyTakeaways: [{ type: String }],
  resources: [InterviewResourceSchema],
});

const InterviewSchema = new Schema<IInterview>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  topic: { type: String, required: true },
  insights: [{ type: String }],
  imageUrl: { type: String, required: true },
  date: { type: String, required: true },
  fullInterview: FullInterviewSchema,
});

const InterviewCategorySchema = new Schema<IInterviewCategory>({
  category: { type: String, required: true, unique: true },
  interviews: [InterviewSchema],
});

export const InterviewCategory = mongoose.model<IInterviewCategory>(
  'InterviewCategory',
  InterviewCategorySchema
);