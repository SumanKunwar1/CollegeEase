import { Request, Response } from 'express';
import SuccessStory from '../models/successStory.model';
import { asyncHandler } from '../utils/asyncHandler';

// @desc    Create a new success story
// @route   POST /api/v1/success-stories
// @access  Public
const createSuccessStory = asyncHandler(async (req: Request, res: Response) => {
  const { name, image, university, major, amountRaised, quote, impact } = req.body;
  
  // Convert impact string to array if it's comma separated
  const impactArray = typeof impact === 'string' 
    ? impact.split(',').map(item => item.trim()) 
    : impact;

  const successStory = await SuccessStory.create({
    name,
    image,
    university,
    major,
    amountRaised,
    quote,
    impact: impactArray
  });

  res.status(201).json({
    success: true,
    data: successStory
  });
});

// @desc    Get all success stories
// @route   GET /api/v1/success-stories
// @access  Public
const getSuccessStories = asyncHandler(async (req: Request, res: Response) => {
  const successStories = await SuccessStory.find().sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: successStories.length,
    data: successStories
  });
});

export { createSuccessStory, getSuccessStories };