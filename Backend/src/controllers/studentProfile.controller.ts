// studentProfile.controller.ts
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

export const createStudentProfile = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error('Error creating student profile:', error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

export const updateStudentProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent manual updates to raised amount through this endpoint
    if (updateData.raised !== undefined) {
      return res.status(400).json({ message: 'Cannot directly update raised amount' });
    }

    const updatedProfile = await StudentProfile.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    return res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating student profile:', error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

export const deleteStudentProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProfile = await StudentProfile.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    return res.status(200).json({ message: 'Student profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting student profile:', error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

export const getStudentProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await StudentProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error('Error getting student profile:', error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Add a new endpoint to update raised amount (for internal use)
export const updateRaisedAmount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const updatedProfile = await StudentProfile.findByIdAndUpdate(
      id,
      { $inc: { raised: amount } },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    return res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating raised amount:', error);
    return res.status(500).json({ error: 'Server Error' });
  }
};