import { Request, Response } from 'express';
import ResourceRequest from '../models/resourceRequest.model';
import { asyncHandler } from '../utils/asyncHandler';

export const createResourceRequest = asyncHandler(async (req: Request, res: Response) => {
  const { name, age, academicBackground, country, requestedResources } = req.body;

  const resourceRequest = await ResourceRequest.create({
    name,
    age: Number(age),
    academicBackground,
    country,
    requestedResources
  });

  res.status(201).json({
    success: true,
    data: resourceRequest
  });
});

export const getResourceRequests = asyncHandler(async (req: Request, res: Response) => {
  const requests = await ResourceRequest.find().sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    data: requests
  });
});