import mongoose, { Document } from 'mongoose';

export interface IPayment extends Document {
  orderId: string;
  paymentId?: string;
  studentProfileId: mongoose.Types.ObjectId;
  amount: number;
  donorEmail: string;
  donorName?: string;
  isAnonymous: boolean;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'paypal' | 'credit_card';
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String },
    studentProfileId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'StudentProfile' 
    },
    amount: { type: Number, required: true },
    donorEmail: { type: String, required: true },
    donorName: { type: String },
    isAnonymous: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending' 
    },
    paymentMethod: { 
      type: String, 
      enum: ['paypal', 'credit_card'], 
      required: true 
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;