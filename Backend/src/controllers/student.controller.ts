import { Request, Response } from 'express';
import Student from '../models/student.model';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.email || !req.body.password || !req.body.fullName) {
      res.status(400).json({ success: false, message: 'Missing required fields' });
      return;
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      res.status(400).json({ success: false, message: 'Email already registered' });
      return;
    }

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
    
    const student = new Student({
      email: req.body.email,
      fullName: req.body.fullName,
      cause: req.body.cause || 'General',
      description: req.body.description || '',
      amountNeeded: parseFloat(req.body.amountNeeded) || 0,
      documents,
      password: req.body.password, // In a real app, you should hash this
      status: 'pending'
    });
    
    const savedStudent = await student.save();
    
    res.status(201).json({
      success: true,
      student: {
        fullName: savedStudent.fullName,
        email: savedStudent.email,
        status: savedStudent.status
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

export const loginStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password required' });
      return;
    }
    
    const student = await Student.findOne({ email });
    
    if (!student) {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
      return;
    }

    // Simple password comparison (for college project only)
    // In a real app, you should use bcrypt.compare()
    if (student.password !== password) {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      student: {
        fullName: student.fullName,
        email: student.email,
        status: student.status
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again.' 
    });
  }
};

export const getStudentDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findOne({ fullName: req.params.name }).select('-password');
    
    if (!student) {
      res.status(404).json({ success: false, message: 'Student not found' });
      return;
    }
    
    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard' });
  }
};