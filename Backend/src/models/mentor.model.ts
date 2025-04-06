// src/models/mentor.model.ts
import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: String,
  title: String,
  university: String,
  location: String,
  imageUrl: String,
  availability: String,
  pricePerHour: Number,
  bio: String,
  expertise: [{ skill: String }],
  mentorStyle: [{ style: String }],
  testimonials: [{
    author: String,
    title: String,
    text: String,
    rating: Number
  }]
}, { timestamps: true });

const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;