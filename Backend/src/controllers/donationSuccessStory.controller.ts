import { Request, Response } from 'express';
import DonationSuccessStory from '../models/donationSuccessStory.model';

export const createDonationSuccessStory = async (req: Request, res: Response) => {
  try {
    const { name, image, university, major, amountRaised, quote, impact } = req.body;

    // Convert impact string to array if it's a string
    const impactArray = typeof impact === 'string' 
      ? impact.split(',').map(item => item.trim()) 
      : impact;

    const newStory = new DonationSuccessStory({
      name,
      image,
      university,
      major,
      amountRaised: Number(amountRaised),
      quote,
      impact: impactArray,
    });

    await newStory.save();

    res.status(201).json({
      success: true,
      data: newStory,
      message: 'Donation success story created successfully',
    });
  } catch (error) {
    console.error('Error creating donation success story:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create donation success story',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getDonationSuccessStories = async (req: Request, res: Response) => {
  try {
    const stories = await DonationSuccessStory.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: stories,
      message: 'Donation success stories retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching donation success stories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation success stories',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};