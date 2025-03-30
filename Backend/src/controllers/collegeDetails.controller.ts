import { Request, Response } from 'express';
import CollegeDetails from '../models/collegedetails.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { ApiError } from '../utils/apiError';

const getCollegeDetails = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName } = req.params;
  const decodedName = decodeURIComponent(organizationName);
  
  const college = await CollegeDetails.findOne({ 
    organizationName: { $regex: new RegExp(`^${decodedName}$`, 'i') }
  });

  if (!college) {
    throw new ApiError(404, 'College details not found');
  }

  res.status(200).json(new ApiResponse(200, college));
});

const createOrUpdateCollegeDetails = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName } = req.params;
  const decodedName = decodeURIComponent(organizationName);
  const data = req.body;

  let college = await CollegeDetails.findOne({ 
    organizationName: { $regex: new RegExp(`^${decodedName}$`, 'i') }
  });

  if (!college) {
    college = new CollegeDetails({
      organizationName: decodedName,
      ...data
    });
  } else {
    Object.assign(college, data);
  }

  await college.save();
  res.status(200).json(new ApiResponse(200, college, 'College details updated successfully'));
});

export { getCollegeDetails, createOrUpdateCollegeDetails };