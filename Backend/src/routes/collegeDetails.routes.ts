// collegeDetails.routes.ts
import express from 'express';
import {
  getCollegeDetails,
  updateCollegeDetails,
  updatePrograms,
  addReview,
} from '../controllers/collegeDetails.controller';

const router = express.Router();

// Public routes
router.get('/college-details/:organizationName', getCollegeDetails);

// Protected routes (for college admins)
router.put('/college-details/:organizationName', updateCollegeDetails);
router.put('/college-details/:organizationName/programs', updatePrograms);
router.post('/college-details/:organizationName/reviews', addReview);

export default router;