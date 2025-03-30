import mongoose, { Document } from 'mongoose';

interface IProgram {
  name: string;
  description: string;
  duration: string;
  level: 'undergraduate' | 'postgraduate' | 'doctorate';
}

interface IReview {
  studentName: string;
  program: string;
  rating: number;
  review: string;
}

interface ITuition {
  level: string;
  range: string;
  notes: string;
}

interface IDeadlines {
  fall: string;
  spring: string;
  summer: string;
}

interface ICareerStats {
  placementRate: string;
  averageSalary: string;
}

interface ICollegeDetails extends Document {
  organizationName: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  rating: number;
  foundedYear: string;
  globalRanking: number;
  alumniCount: number;
  programs: {
    undergraduate: IProgram[];
    postgraduate: IProgram[];
    doctorate: IProgram[];
  };
  studentReviews: IReview[];
  tuition: ITuition[];
  applicationDeadlines: IDeadlines;
  careerStats: ICareerStats;
}

const CollegeDetailsSchema = new mongoose.Schema<ICollegeDetails>({
  organizationName: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  foundedYear: { type: String, required: true },
  globalRanking: { type: Number, required: true },
  alumniCount: { type: Number, required: true },
  programs: {
    undergraduate: [
      {
        name: String,
        description: String,
        duration: String,
        level: String,
      },
    ],
    postgraduate: [
      {
        name: String,
        description: String,
        duration: String,
        level: String,
      },
    ],
    doctorate: [
      {
        name: String,
        description: String,
        duration: String,
        level: String,
      },
    ],
  },
  studentReviews: [
    {
      studentName: String,
      program: String,
      rating: Number,
      review: String,
    },
  ],
  tuition: [
    {
      level: String,
      range: String,
      notes: String,
    },
  ],
  applicationDeadlines: {
    fall: String,
    spring: String,
    summer: String,
  },
  careerStats: {
    placementRate: String,
    averageSalary: String,
  },
});

export default mongoose.model<ICollegeDetails>('CollegeDetails', CollegeDetailsSchema);