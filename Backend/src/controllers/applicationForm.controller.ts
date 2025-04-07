import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApplicationForm } from '../models/applicationForm.model';
import { Job } from '../models/job.model';

// @desc    Submit application form
// @route   POST /api/v1/application-forms
// @access  Public
export const submitApplication = asyncHandler(async (req: Request, res: Response) => {
  const { jobId, ...formData } = req.body;

  // Get company name from job
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ 
      success: false, 
      message: 'Job not found' 
    });
  }

  const application = await ApplicationForm.create({
    jobId,
    company: job.company,
    ...formData
  });

  res.status(201).json({ 
    success: true, 
    data: application 
  });
});

// @desc    Get all applications (for admin)
// @route   GET /api/v1/application-forms
// @access  Private/Admin
export const getApplications = asyncHandler(async (req: Request, res: Response) => {
  const applications = await ApplicationForm.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: applications });
});

// @desc    Get applications by job ID
// @route   GET /api/v1/application-forms/job/:jobId
// @access  Private/Admin
export const getApplicationsByJob = asyncHandler(async (req: Request, res: Response) => {
  const applications = await ApplicationForm.find({ jobId: req.params.jobId }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: applications });
});

