import { Request, Response, NextFunction } from 'express';
import collegeDetailsService from '../services/collegeDetails.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';

const getCollegeDetails = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { organizationName } = req.params;
  const college = await collegeDetailsService.getCollegeDetails(organizationName);
  res.status(200).json(new ApiResponse(200, college));
});

const updateCollegeDetails = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { organizationName } = req.params;
  const college = await collegeDetailsService.createOrUpdateCollegeDetails(organizationName, req.body);
  res.status(200).json(new ApiResponse(200, college, 'College details updated successfully'));
});

const updatePrograms = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { organizationName } = req.params;
  const college = await collegeDetailsService.updatePrograms(organizationName, req.body.programs);
  res.status(200).json(new ApiResponse(200, college, 'Programs updated successfully'));
});

const addReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { organizationName } = req.params;
  const college = await collegeDetailsService.addReview(organizationName, req.body);
  res.status(201).json(new ApiResponse(201, college, 'Review added successfully'));
});

export { getCollegeDetails, updateCollegeDetails, updatePrograms, addReview };