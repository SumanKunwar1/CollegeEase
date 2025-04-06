// models/groupPayment.model.ts
import mongoose, { Document } from 'mongoose';

export interface IGroupPayment extends Document {
  orderId: string;
  paymentId?: string;
  groupSessionId: mongoose.Types.ObjectId;
  title: string; // Store session title
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'paypal' | 'credit_card';
  createdAt: Date;
  updatedAt: Date;
}

const groupPaymentSchema = new mongoose.Schema<IGroupPayment>(
  {
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String },
    groupSessionId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'GroupSession' 
    },
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
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

const GroupPayment = mongoose.model<IGroupPayment>('GroupPayment', groupPaymentSchema);
export default GroupPayment;