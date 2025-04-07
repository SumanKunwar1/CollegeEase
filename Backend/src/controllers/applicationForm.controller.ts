// applicationForm.controller.ts
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

// @desc    Get applications by company name
// @route   GET /api/v1/application-forms/company/:companyName
// @access  Private/Admin
export const getApplicationsByCompany = asyncHandler(async (req: Request, res: Response) => {
  const companyName = decodeURIComponent(req.params.companyName);
  const applications = await ApplicationForm.find({ company: companyName })
    .sort({ createdAt: -1 })
    .select('name email phone educationLevel coverLetter address status createdAt jobId');
  
  // Get job titles for each application
  const applicationsWithJobTitles = await Promise.all(
    applications.map(async (app) => {
      const job = await Job.findById(app.jobId).select('title');
      return {
        ...app.toObject(),
        jobTitle: job?.title || 'Unknown Job'
      };
    })
  );

  res.status(200).json({ 
    success: true, 
    data: applicationsWithJobTitles 
  });
});

// @desc    Update application status
// @route   PATCH /api/v1/application-forms/:id/status
// @access  Private/Admin
export const updateApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  
  const application = await ApplicationForm.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    });
  }

  res.status(200).json({
    success: true,
    data: application
  });
});