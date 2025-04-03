import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  cause: String,
  description: String,
  amountNeeded: Number,
  documents: [String],
  status: { type: String, default: 'pending' },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Student', studentSchema);