import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import SupportRequest from '../models/supportRequest.model';

// @desc   Create a new support request
// @route  POST /api/v1/support
// @access Public
const createSupportRequest = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  const supportRequest = await SupportRequest.create({
    name,
    email,
    subject,
    message
  });

  res.status(201).json({
    success: true,
    data: supportRequest,
    message: 'Support request submitted successfully'
  });
});

// @desc   Get all support requests (for admin dashboard)
// @route  GET /api/v1/support
// @access Private/Admin
const getSupportRequests = asyncHandler(async (req: Request, res: Response) => {
  const supportRequests = await SupportRequest.find().sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: supportRequests.length,
    data: supportRequests
  });
});

export { createSupportRequest, getSupportRequests };