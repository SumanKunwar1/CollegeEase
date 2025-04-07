import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  sessionId: string;
  name: string;
  rating: number;
  feedback: string;
  createdAt: Date;
}

const feedbackSchema = new Schema<IFeedback>({
  sessionId: {
    type: String,
    required: [true, 'Session ID is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
  },
  feedback: {
    type: String,
    required: [true, 'Feedback is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);

export default Feedback;