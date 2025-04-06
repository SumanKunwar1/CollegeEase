import express from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
  submitApplication,
  getApplications,
  updateApplicationStatus
} from '../controllers/becameMentor.controller';

const router = express.Router();

// Submit mentor application
router.post('/', asyncHandler(submitApplication));

// Get all mentor applications
router.get('/', asyncHandler(getApplications));

// Update application status
router.put('/:id/status', asyncHandler(updateApplicationStatus));

export default router;