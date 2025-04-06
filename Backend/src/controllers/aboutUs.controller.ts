import { Request, Response } from 'express';
import AboutUs from '../models/aboutUs.model';

export const getAboutUs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const aboutUsData = await AboutUs.findOne();
    if (!aboutUsData) {
      return res.status(200).json({
        title: "About CollegeEase",
        tagline: "Empowering Your Educational Journey",
        // ... other default fields
      });
    }
    return res.status(200).json(aboutUsData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ 
        message: 'Error fetching data', 
        error: error.message 
      });
    }
    return res.status(500).json({ 
      message: 'Unknown error occurred' 
    });
  }
};

export const createAboutUs = async (req: Request, res: Response): Promise<Response> => {
  try {
    await AboutUs.deleteMany({});
    const newAboutUs = new AboutUs(req.body);
    const savedData = await newAboutUs.save();
    return res.status(201).json(savedData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ 
        message: 'Error creating data', 
        error: error.message 
      });
    }
    return res.status(400).json({ 
      message: 'Unknown error occurred' 
    });
  }
};

export const updateAboutUs = async (req: Request, res: Response): Promise<Response> => {
  try {
    let aboutUsData = await AboutUs.findOne();
    
    if (!aboutUsData) {
      aboutUsData = new AboutUs(req.body);
      const savedData = await aboutUsData.save();
      return res.status(200).json(savedData);
    }

    aboutUsData.set(req.body);
    const updatedData = await aboutUsData.save();
    return res.status(200).json(updatedData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ 
        message: 'Error updating data', 
        error: error.message 
      });
    }
    return res.status(400).json({ 
      message: 'Unknown error occurred' 
    });
  }
};

export const deleteAboutUs = async (req: Request, res: Response): Promise<Response> => {
  try {
    await AboutUs.deleteMany({});
    return res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ 
        message: 'Error deleting data', 
        error: error.message 
      });
    }
    return res.status(500).json({ 
      message: 'Unknown error occurred' 
    });
  }
};