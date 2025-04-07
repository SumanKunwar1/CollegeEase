import mongoose, { Document, Schema, Types } from 'mongoose';

interface TrendDetail {
    overview: string;
    keyPoints: string[];
    supportLinks: {
      label: string;
      url: string;
    }[];
  }
  interface Trend extends Document {
    title: string;
    description: string;
    impact: string;
    imageUrl?: string;
    details: TrendDetail;
  }
  
  interface TrendCategory extends Document {
    category: string;
    trends: Trend[];
  }

interface Trend {
  _id: string;
  title: string;
  description: string;
  impact: string;
  imageUrl?: string;
  details: TrendDetail;
}


const trendDetailSchema = new Schema<TrendDetail>({
  overview: { type: String, required: true },
  keyPoints: [{ type: String }],
  supportLinks: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

const trendSchema = new Schema<Trend>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  impact: { type: String, required: true },
  imageUrl: { type: String },
  details: trendDetailSchema,
});

const trendCategorySchema = new Schema<TrendCategory>(
  {
    category: { type: String, required: true, unique: true },
    trends: [trendSchema],
  },
  { timestamps: true }
);

export const IndustryTrendCategory = mongoose.model<TrendCategory>(
  'IndustryTrendCategory',
  trendCategorySchema
);