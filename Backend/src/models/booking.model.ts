// src/models/booking.model.ts
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  mentorId: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;