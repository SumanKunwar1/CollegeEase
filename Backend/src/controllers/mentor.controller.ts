import { Request, Response } from 'express';
import Mentor from '../models/mentor.model';

export const getMentors = async (req: Request, res: Response) => {
  try {
    const search = req.query.search || '';
    const mentors = await Mentor.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { university: { $regex: search, $options: 'i' } }
      ]
    });
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createMentor = async (req: Request, res: Response) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateMentor = async (req: Request, res: Response) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteMentor = async (req: Request, res: Response) => {
  try {
    await Mentor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mentor deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const getMentorById = async (req: Request, res: Response) => {
    try {
      const mentor = await Mentor.findById(req.params.id);
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
      res.json(mentor);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };