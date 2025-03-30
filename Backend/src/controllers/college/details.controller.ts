import { Request, Response } from 'express';
import mongoose from 'mongoose';
import College from '../../models/college.model';
import { ApiResponse } from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiError } from '../../utils/apiError';

// Define valid program levels
type ProgramLevel = 'undergraduate' | 'postgraduate' | 'doctorate';

// 1. Get College Details
const getCollegeDetails = asyncHandler(async (req: Request, res: Response) => {
  const college = await College.findOne({ 
    organizationName: req.params.organizationName 
  });
  
  if (!college) {
    throw new ApiError(404, 'College not found');
  }

  res.status(200).json(new ApiResponse(200, college, 'College details fetched successfully'));
});

// 2. Update College Details
const updateCollegeDetails = asyncHandler(async (req: Request, res: Response) => {
  const college = await College.findOneAndUpdate(
    { organizationName: req.params.organizationName },
    req.body,
    { new: true }
  );

  if (!college) {
    throw new ApiError(404, 'College not found');
  }

  res.status(200).json(new ApiResponse(200, college, 'College details updated successfully'));
});

// 3. Add Program
const addProgram = asyncHandler(async (req: Request, res: Response) => {
  const { level, program } = req.body;
  if (!['undergraduate', 'postgraduate', 'doctorate'].includes(level)) {
    throw new ApiError(400, 'Invalid program level');
  }

  const college = await College.findOneAndUpdate(
    { organizationName: req.params.organizationName },
    { $push: { [`programs.${level}`]: program } },
    { new: true }
  );

  if (!college) {
    throw new ApiError(404, 'College not found');
  }

  res.status(200).json(
    new ApiResponse(200, college.programs[level as ProgramLevel], 'Program added successfully')
  );
});

// 4. Upload Cover Image (modified to accept URL)
const uploadCoverImage = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName } = req.params;
  const { imageUrl } = req.body;
  
  if (!imageUrl) {
    throw new ApiError(400, 'Image URL is required');
  }
  
  const updatedCollege = await College.findOneAndUpdate(
    { organizationName },
    { coverImageUrl: imageUrl },
    { new: true }
  );
  
  if (!updatedCollege) {
    throw new ApiError(404, 'College not found');
  }
  
  res.status(200).json(
    new ApiResponse(200, updatedCollege, 'Cover image updated successfully')
  );
});

// 5. Add Course
const addCourse = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName } = req.params;
  const { course } = req.body;

  if (!course) {
    throw new ApiError(400, 'Course is required');
  }

  const updatedCollege = await College.findOneAndUpdate(
    { organizationName },
    { $addToSet: { courses: course } },
    { new: true }
  );

  if (!updatedCollege) {
    throw new ApiError(404, 'College not found');
  }

  res.status(200).json(
    new ApiResponse(200, updatedCollege, 'Course added successfully')
  );
});

// 6. Remove Course
const removeCourse = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName } = req.params;
  const { course } = req.body;

  const updatedCollege = await College.findOneAndUpdate(
    { organizationName },
    { $pull: { courses: course } },
    { new: true }
  );

  if (!updatedCollege) {
    throw new ApiError(404, 'College not found');
  }

  res.status(200).json(
    new ApiResponse(200, updatedCollege, 'Course removed successfully')
  );
});

// 7. Update Tuition Info
const updateTuitionInfo = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.tuition) {
    throw new ApiError(400, 'Tuition info is required');
  }

  const college = await College.findOneAndUpdate(
    { organizationName: req.params.organizationName },
    { tuition: req.body.tuition },
    { new: true }
  );

  if (!college) {
    throw new ApiError(404, 'College not found');
  }

  res.status(200).json(
    new ApiResponse(200, college.tuition, 'Tuition info updated successfully')
  );
});

// 8. Update Deadlines
const updateDeadlines = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.deadlines) {
    throw new ApiError(400, 'Deadlines are required');
  }

  const college = await College.findOneAndUpdate(
    { organizationName: req.params.organizationName },
    { applicationDeadlines: req.body.deadlines },
    { new: true }
  );

  if (!college) {
    throw new ApiError(404, 'College not found');
  }

  res.status(200).json(
    new ApiResponse(200, college.applicationDeadlines, 'Deadlines updated successfully')
  );
});

// 9. Update Career Stats
const updateCareerStats = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.placementRate || !req.body.averageSalary) {
    throw new ApiError(400, 'Placement rate and average salary are required');
  }

  const college = await College.findOne({ organizationName: req.params.organizationName });
  if (!college) {
    throw new ApiError(404, 'College not found');
  }

  const updatedCollege = await College.findOneAndUpdate(
    { organizationName: req.params.organizationName },
    { 
      careerStats: {
        placementRate: req.body.placementRate,
        averageSalary: req.body.averageSalary,
        topEmployers: req.body.topEmployers || college.careerStats?.topEmployers || []
      }
    },
    { new: true }
  );

  res.status(200).json(
    new ApiResponse(200, updatedCollege?.careerStats, 'Career stats updated successfully')
  );
});

// Export all functions at once
export {
  getCollegeDetails,
  updateCollegeDetails,
  addProgram,
  uploadCoverImage,
  addCourse,
  removeCourse,
  updateTuitionInfo,
  updateDeadlines,
  updateCareerStats
};