import { Request, Response, NextFunction } from 'express';
import Application from '../models/scholarshipApplication.model';
import User from '../models/user';
import { asyncHandler } from '../utils/asyncHandler';

export const createApplication = asyncHandler(async (
  req: Request<{ organizationName: string }>,
  res: Response,
  next: NextFunction
) => {
  const { organizationName } = req.params;
  const formData = req.body;

  // Find the organization
  const organization = await User.findOne({ 
    organizationName: decodeURIComponent(organizationName),
    userType: 'scholarship'
  });

  if (!organization) {
    return res.status(404).json({
      status: 'error',
      message: 'Organization not found',
    });
  }

  // Create the application without any document handling
  const application = await Application.create({
    studentName: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    phone: formData.phone,
    dateOfBirth: new Date(formData.dateOfBirth),
    nationality: formData.nationality,
    address: formData.address,
    currentEducation: formData.currentEducation,
    institution: formData.institution,
    gpa: parseFloat(formData.gpa),
    graduationDate: new Date(formData.graduationDate),
    testScores: {
      sat: formData.satScore ? parseInt(formData.satScore) : undefined,
      act: formData.actScore ? parseInt(formData.actScore) : undefined,
      toefl: formData.toeflScore ? parseInt(formData.toeflScore) : undefined,
      ielts: formData.ieltsScore ? parseInt(formData.ieltsScore) : undefined,
    },
    programLevel: formData.programLevel,
    intendedMajor: formData.intendedMajor,
    scholarshipType: formData.scholarshipType,
    financialAid: formData.financialAid === 'true',
    familyIncome: formData.familyIncome ? parseInt(formData.familyIncome) : undefined,
    achievements: formData.achievements || '',
    organization: organization._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      application,
    },
  });
});

export const getApplications = asyncHandler(async (
  req: Request<{ organizationName: string }>,
  res: Response,
  next: NextFunction
) => {
  const { organizationName } = req.params;
  
  const organization = await User.findOne({
    organizationName: decodeURIComponent(organizationName),
    userType: 'scholarship'
  });

  if (!organization) {
    return res.status(404).json({
      status: 'error',
      message: 'Organization not found',
    });
  }

  const applications = await Application.find({
    organization: organization._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: {
      applications,
    },
  });
});

export const updateApplicationStatus = asyncHandler(async (
  req: Request<{ id: string }, {}, { status: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid status value',
    });
  }

  const application = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!application) {
    return res.status(404).json({
      status: 'error',
      message: 'Application not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      application,
    },
  });
});