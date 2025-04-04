import { Request, Response } from 'express';
import Student from '../models/student.model';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    // Simple validation
    if (!req.body.email || !req.body.password || !req.body.fullName) {
      res.status(400).json({ success: false, message: 'Missing required fields' });
      return;
    }

    // Process files if they exist
    const documents: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      const uploadDir = path.join(__dirname, '../../public/uploads/students');
      await fs.ensureDir(uploadDir);
      
      for (const file of req.files) {
        const fileExt = path.extname(file.originalname);
        const fileName = `${uuidv4()}${fileExt}`;
        const filePath = path.join(uploadDir, fileName);
        
        await fs.move(file.path, filePath);
        documents.push(`/uploads/students/${fileName}`);
      }
    }

    // Create student
    const student = new Student({
      email: req.body.email,
      fullName: req.body.fullName,
      cause: req.body.cause || 'General',
      description: req.body.description || '',
      amountNeeded: parseFloat(req.body.amountNeeded) || 0,
      documents,
      password: req.body.password,
      status: 'pending'
    });

    const savedStudent = await student.save();

    // Simplified response
    res.status(201).json({
      success: true,
      studentId: savedStudent._id
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
};

export const getStudentDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    // For college project, we'll skip authentication
    const student = await Student.findById(req.params.id).select('-password');
    
    if (!student) {
      res.status(404).json({ success: false, message: 'Student not found' });
      return;
    }
    
    res.status(200).json({
      success: true,
      student
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
};