// models/skillDevelopment.model.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISyllabusItem {
  title: string;
  description: string[];
  imageUrl?: string;
}

export interface IInstructor {
  name: string;
  bio: string;
  imageUrl: string;
}

export interface ICourseDetails {
  overview: string;
  syllabus: ISyllabusItem[];
  instructor: IInstructor;
}

export interface ICourse extends Document {
    _id: Types.ObjectId;
    title: string;
    duration: string;
    level: string;
    rating: number;
    students: number;
    imageUrl: string;
    details: ICourseDetails;
  }

export interface ISkillCategory extends Document {
  title: string;
  description: string;
  courses: ICourse[];
}

const syllabusItemSchema = new Schema<ISyllabusItem>({
  title: { type: String, required: true },
  description: { type: [String], required: true },
  imageUrl: { type: String }
});

const instructorSchema = new Schema<IInstructor>({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const courseDetailsSchema = new Schema<ICourseDetails>({
  overview: { type: String, required: true },
  syllabus: [syllabusItemSchema],
  instructor: instructorSchema
});

const courseSchema = new Schema<ICourse>({
    title: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    students: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    details: courseDetailsSchema
  }, { _id: true });  

const skillCategorySchema = new Schema<ISkillCategory>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courses: [courseSchema]
});

export const SkillCategory = mongoose.model<ISkillCategory>('SkillCategory', skillCategorySchema);