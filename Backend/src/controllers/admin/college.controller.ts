import { Request, Response } from 'express';
import College from '../../models/college.model';
import { ApiResponse } from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiError } from '../../utils/apiError';
import { IUser } from '../../types/user.types';

// Remove individual 'export' keywords from these functions
const createCollege = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName, location, imageUrl, courses, tuitionRange } = req.body;
  
  // Basic validation
  if (!organizationName) {
    throw new ApiError(400, 'Organization name is required');
  }
  
  const college = await College.create({
    organizationName,
    location: location || '',
    imageUrl: imageUrl || '',
    courses: courses || [],
    tuitionRange: tuitionRange || '',
    programs: { undergraduate: [], postgraduate: [], doctorate: [] },
    tuition: [],
    studentReviews: [],
    careerStats: { placementRate: '', averageSalary: '' },
    applicationDeadlines: { fall: '', spring: '' }
  });
  
  res.status(201).json(
    new ApiResponse(201, college, 'College created successfully')
  );
});

const getAllColleges = asyncHandler(async (req: Request, res: Response) => {
  const colleges = await College.find()
    .select('organizationName name location rating imageUrl courses tuitionRange');
    
  res.status(200).json(
    new ApiResponse(200, colleges, 'Colleges fetched successfully')
  );
});

const getCollegeById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    throw new ApiError(400, 'College ID is required');
  }
  
  const college = await College.findById(id);
    
  if (!college) {
    throw new ApiError(404, 'College not found');
  }
  
  res.status(200).json(
    new ApiResponse(200, college, 'College fetched successfully')
  );
});

const getCollegeByOrganizationName = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName } = req.params;
  
  if (!organizationName) {
    throw new ApiError(400, 'Organization name is required');
  }
  
  const college = await College.findOne({ organizationName });
    
  if (!college) {
    throw new ApiError(404, 'College not found');
  }
  
  res.status(200).json(
    new ApiResponse(200, college, 'College fetched successfully')
  );
});

const updateCollegeBasicInfo = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName } = req.params;
  const { location, imageUrl, courses, tuitionRange } = req.body;
  
  if (!organizationName) {
    throw new ApiError(400, 'Organization name is required');
  }
  
  const college = await College.findOneAndUpdate(
    { organizationName },
    { 
      location: location || undefined,
      imageUrl: imageUrl || undefined,
      courses: courses || undefined,
      tuitionRange: tuitionRange || undefined
    },
    { new: true }
  );
  
  if (!college) {
    throw new ApiError(404, 'College not found');
  }
  
  res.status(200).json(
    new ApiResponse(200, college, 'College updated successfully')
  );
});

const deleteCollege = asyncHandler(async (req: Request, res: Response) => {
  const { organizationName } = req.params;
  
  if (!organizationName) {
    throw new ApiError(400, 'Organization name is required');
  }
  
  const college = await College.findOneAndDelete({ organizationName });
  
  if (!college) {
    throw new ApiError(404, 'College not found');
  }
  
  res.status(200).json(
    new ApiResponse(200, null, 'College deleted successfully')
  );
});

// Single export statement at the bottom
export {
  createCollege,
  getAllColleges,
  getCollegeById,
  getCollegeByOrganizationName,
  updateCollegeBasicInfo,
  deleteCollege
};