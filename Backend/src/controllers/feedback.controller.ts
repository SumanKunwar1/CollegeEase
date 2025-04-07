import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import Feedback from '../models/feedback.model';

// @desc    Submit feedback for a group session
// @route   POST /api/v1/feedback
// @access  Public
export const submitFeedback = asyncHandler(async (req: Request, res: Response) => {
  const { sessionId, name, rating, feedback } = req.body;

  const newFeedback = await Feedback.create({
    sessionId,
    name,
    rating,
    feedback,
  });

  res.status(201).json({
    success: true,
    data: newFeedback,
    message: 'Thank you for your feedback!',
  });
});

// @desc    Get all feedback for group sessions
// @route   GET /api/v1/feedback
// @access  Public
export const getAllFeedback = asyncHandler(async (req: Request, res: Response) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    data: feedbacks,
  });
});

// @desc    Get feedback for a specific session
// @route   GET /api/v1/feedback/:sessionId
// @access  Public
export const getSessionFeedback = asyncHandler(async (req: Request, res: Response) => {
  const feedbacks = await Feedback.find({ sessionId: req.params.sessionId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    data: feedbacks,
  });
});