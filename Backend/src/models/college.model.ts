import mongoose, { Document, Schema } from 'mongoose';

interface IProgram {
  name: string;
  type: 'undergraduate' | 'postgraduate' | 'doctorate';
  duration: string;
  description: string;
}

interface IStudentReview {
  studentName: string;
  program: string;
  review: string;
  rating: number;
}

interface ICareerStats {
  placementRate: string;
  averageSalary: string;
  topEmployers?: string[];
}

interface ITuitionInfo {
  level: 'undergraduate' | 'postgraduate' | 'doctorate';
  range: string;
  notes?: string;
}

interface ICollege extends Document {
  organizationName: string;
  location: string;
  rating: number;
  imageUrl: string;
  coverImageUrl?: string;
  courses: string[];
  tuitionRange: string;
  // Optional fields as specified
  programs: {
    undergraduate: IProgram[];
    postgraduate: IProgram[];
    doctorate: IProgram[];
  };
  tuition: ITuitionInfo[];
  facilities?: string[];
  studentReviews: IStudentReview[];
  careerStats: ICareerStats;
  applicationDeadlines: {
    fall: string;
    spring: string;
  };
  // Optional fields
  foundedYear?: number;
  description?: string;
  mission?: string;
  globalRanking?: number;
  alumniCount?: number;
  createdBy?: mongoose.Types.ObjectId;
  managedBy?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const CollegeSchema = new Schema<ICollege>({
  organizationName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  coverImageUrl: { type: String },
  courses: [{ type: String }],
  tuitionRange: { type: String, default: 'Contact for details' },
  foundedYear: { type: Number },
  description: { type: String },
  mission: { type: String },
  globalRanking: { type: Number },
  programs: {
    undergraduate: [{
      name: String,
      type: String,
      duration: String,
      description: String
    }],
    postgraduate: [{
      name: String,
      type: String,
      duration: String,
      description: String
    }],
    doctorate: [{
      name: String,
      type: String,
      duration: String,
      description: String
    }]
  },
  tuition: [{
    level: { type: String, enum: ['undergraduate', 'postgraduate', 'doctorate'] },
    range: String,
    notes: String
  }],
  facilities: [{ type: String }],
  studentReviews: [{
    studentName: String,
    program: String,
    review: String,
    rating: Number
  }],
  careerStats: {
    placementRate: { type: String, default: '' },
    averageSalary: { type: String, default: '' },
    topEmployers: [{ type: String }]
  },
  applicationDeadlines: {
    fall: { type: String, default: '' },
    spring: { type: String, default: '' }
  },
  alumniCount: { type: Number },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  managedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Add index
CollegeSchema.index({ organizationName: 1 }, { unique: true });

export default mongoose.model<ICollege>('College', CollegeSchema);