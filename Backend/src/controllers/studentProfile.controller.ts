import { Request, Response } from 'express';
import StudentProfile from '../models/studentProfile.model';

export const getAllStudentProfiles = async (req: Request, res: Response) => {
  try {
    const students = await StudentProfile.find();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create a new student profile
export const createStudentProfile = async (req: Request, res: Response) => {
  const { studentName, financialNeeds, academicHistory, goals, goal, image } = req.body;
  
  const newProfile = new StudentProfile({
    studentName,
    financialNeeds,
    academicHistory,
    goals,
    raised: 0,
    goal,
    image,
  });

  const savedProfile = await newProfile.save();
  return res.status(201).json(savedProfile);
};

// Update a student profile
export const updateStudentProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedProfile = await StudentProfile.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (!updatedProfile) {
    return res.status(404).json({ message: 'Student profile not found' });
  }

  return res.status(200).json(updatedProfile);
};

// Delete a student profile
export const deleteStudentProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProfile = await StudentProfile.findByIdAndDelete(id);

  if (!deletedProfile) {
    return res.status(404).json({ message: 'Student profile not found' });
  }

  return res.status(200).json({ message: 'Student profile deleted successfully' });
};

// Get a single student profile
export const getStudentProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  const profile = await StudentProfile.findById(id);

  if (!profile) {
    return res.status(404).json({ message: 'Student profile not found' });
  }

  return res.status(200).json(profile);
};