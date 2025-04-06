import { Request, Response, NextFunction } from 'express';
import BecameMentor from '../models/becameMentor.model';

export const submitApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, college, expertise, experience, imageUrl } = req.body;
    
    const newApplication = new BecameMentor({
      name,
      email,
      college,
      expertise,
      experience,
      imageUrl
    });

    await newApplication.save();
    
    res.status(201).json({
      success: true,
      data: newApplication
    });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    
    let query = {};
    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      query = {
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { college: searchRegex },
          { expertise: searchRegex }
        ]
      };
    }

    const applications = await BecameMentor.find(query).sort({ submittedAt: -1 });
    
    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedApplication = await BecameMentor.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedApplication
    });
  } catch (error) {
    next(error);
  }
};