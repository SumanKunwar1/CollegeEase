// src/routes/booking.routes.ts
import express from 'express';
import { createBooking, getAllBookings } from '../controllers/booking.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/mentors/:mentorId/bookings', asyncHandler(createBooking));
router.get('/bookings', asyncHandler(getAllBookings)); 

export default router;