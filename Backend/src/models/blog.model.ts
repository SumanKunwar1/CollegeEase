// models/blog.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IContentSection {
  type: 'paragraph' | 'heading';
  content: string;
}

export interface IBlogPost extends Document {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: IContentSection[];
  createdAt: Date;
  updatedAt: Date;
}

const contentSectionSchema = new Schema<IContentSection>({
  type: { type: String, enum: ['paragraph', 'heading'], required: true },
  content: { type: String, required: true }
});

const blogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  excerpt: { type: String, required: false },
  author: { type: String, required: true },
  date: { type: String, required: false },
  readTime: { type: String, required: false },
  image: { type: String, required: true },
  content: [contentSectionSchema]
}, {
  timestamps: true
});

const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
export default BlogPost;