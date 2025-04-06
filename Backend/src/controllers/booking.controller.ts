// src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import Booking from '../models/booking.model';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { mentorId } = req.params;
    const { studentName, studentEmail, date, time, notes } = req.body;

    const booking = new Booking({
      mentorId,
      studentName,
      studentEmail,
      date,
      time,
      notes
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch bookings' });
    }
  };