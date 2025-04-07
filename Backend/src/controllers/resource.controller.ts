import { Request, Response } from 'express';
import Resource from '../models/resource.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ResourceError';
import { ApiResponse } from '../utils/apiResponse';

// Create a new resource
export const createResource = asyncHandler(async (req: Request, res: Response) => {
  const resourceData = req.body;
  
  const resource = await Resource.create(resourceData);
  
  res.status(201).json(
    new ApiResponse(201, resource, 'Resource created successfully')
  );
});

// Get all resources
export const getAllResources = asyncHandler(async (req: Request, res: Response) => {
  const { search } = req.query;
  
  let query = {};
  if (search) {
    query = {
      $or: [
        { title: { $regex: search as string, $options: 'i' } },
        { author: { $regex: search as string, $options: 'i' } },
        { type: { $regex: search as string, $options: 'i' } }
      ]
    };
  }
  
  const resources = await Resource.find(query);
  
  res.status(200).json(
    new ApiResponse(200, resources, 'Resources fetched successfully')
  );
});

// Get a single resource by ID
export const getResourceById = asyncHandler(async (req: Request, res: Response) => {
  const resource = await Resource.findById(req.params.id);
  
  if (!resource) {
    throw new ApiError(404, 'Resource not found');
  }
  
  res.status(200).json(
    new ApiResponse(200, resource, 'Resource fetched successfully')
  );
});

// Update a resource
export const updateResource = asyncHandler(async (req: Request, res: Response) => {
  const updatedResource = await Resource.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  
  if (!updatedResource) {
    throw new ApiError(404, 'Resource not found');
  }
  
  res.status(200).json(
    new ApiResponse(200, updatedResource, 'Resource updated successfully')
  );
});

// Delete a resource
export const deleteResource = asyncHandler(async (req: Request, res: Response) => {
  const deletedResource = await Resource.findByIdAndDelete(req.params.id);
  
  if (!deletedResource) {
    throw new ApiError(404, 'Resource not found');
  }
  
  res.status(200).json(
    new ApiResponse(200, null, 'Resource deleted successfully')
  );
});