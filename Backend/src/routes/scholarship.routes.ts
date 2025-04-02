// routes/scholarship.routes.ts
import express from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
  createScholarship,
  getScholarships,
  getScholarshipByOrganization,
  updateScholarship,
  deleteScholarship
} from '../controllers/scholarship.controller';

const router = express.Router();

router.post('/scholarships', asyncHandler(createScholarship));
router.get('/scholarships', asyncHandler(getScholarships));
router.get('/scholarships/organization/:organizationName', asyncHandler(getScholarshipByOrganization));
router.put('/scholarships/organization/:organizationName', asyncHandler(updateScholarship));
router.delete('/scholarships/organization/:organizationName', asyncHandler(deleteScholarship));

export default router;