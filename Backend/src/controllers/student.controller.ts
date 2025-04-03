import { Request, Response } from 'express';
import Student from '../models/student.model';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Starting registration - Memory usage:', process.memoryUsage());

    // Validate required fields
    const requiredFields = ['email', 'password', 'fullName', 'cause', 'description', 'amountNeeded'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
      return;
    }

    // Validate files
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).json({
        success: false,
        message: 'At least one PDF document is required'
      });
      return;
    }

    // Create upload directory with proper permissions
    const uploadDir = path.join(__dirname, '../../public/uploads/students');
    await fs.ensureDir(uploadDir);
    await fs.chmod(uploadDir, 0o755);

    // Process files with streams
    const documents: string[] = [];
    for (const file of req.files as Express.Multer.File[]) {
      try {
        if (file.mimetype !== 'application/pdf') {
          throw new Error(`Invalid file type: ${file.mimetype}. Only PDFs allowed.`);
        }

        const fileExt = path.extname(file.originalname);
        const fileName = `${uuidv4()}${fileExt}`;
        const filePath = path.join(uploadDir, fileName);

        // Use streams for file handling with proper typing
        const readStream = fs.createReadStream(file.path);
        const writeStream = fs.createWriteStream(filePath);
        
        await new Promise<void>((resolve, reject) => {
          readStream.pipe(writeStream)
            .on('finish', () => resolve())
            .on('error', (error) => reject(error));
        });

        documents.push(`/uploads/students/${fileName}`);
        
        // Remove temp file
        await fs.unlink(file.path);
      } catch (fileError) {
        console.error('File processing error:', fileError);
        throw new Error(`File ${file.originalname} processing failed`);
      }
    }

    // Create and save student
    const student = new Student({
      email: req.body.email,
      fullName: req.body.fullName,
      cause: req.body.cause,
      description: req.body.description,
      amountNeeded: parseFloat(req.body.amountNeeded),
      documents,
      password: req.body.password,
      status: 'pending'
    });

    const savedStudent = await student.save();
    console.log('Student saved successfully. Memory usage:', process.memoryUsage());

    res.status(201).json({
      success: true,
      student: {
        id: savedStudent._id,
        email: savedStudent.email,
        status: savedStudent.status
      }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Registration error:', error);
    
    // Clean up any uploaded files if error occurred
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        try {
          if (file.path) await fs.unlink(file.path);
        } catch (err) {
          console.error('Error cleaning up file:', err);
        }
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: errorMessage
    });
  }
};