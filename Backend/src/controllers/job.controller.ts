// src/controllers/job.controller.ts
import { Request, Response, NextFunction } from 'express';
import { Job } from '../models/job.model';
import { asyncHandler } from '../utils/asyncHandler';

// @desc    Get all jobs
// @route   GET /api/v1/jobs
// @access  Public
export const getJobs = asyncHandler(async (req: Request, res: Response) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: jobs });
});

// @desc    Get single job
// @route   GET /api/v1/jobs/:id
// @access  Public
export const getJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return res.status(404).json({ 
      success: false, 
      message: 'Job not found' 
    });
  }
  
  res.status(200).json({ success: true, data: job });
});

// @desc    Create job
// @route   POST /api/v1/jobs
// @access  Private/Admin
export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.create(req.body);
  res.status(201).json({ success: true, data: job });
});

// @desc    Update job
// @route   PUT /api/v1/jobs/:id
// @access  Private/Admin
export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!job) {
    return res.status(404).json({ 
      success: false, 
      message: 'Job not found' 
    });
  }

  res.status(200).json({ success: true, data: job });
});

// @desc    Delete job
// @route   DELETE /api/v1/jobs/:id
// @access  Private/Admin
export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return res.status(404).json({ 
      success: false, 
      message: 'Job not found' 
    });
  }

  res.status(200).json({ success: true, data: {} });
});