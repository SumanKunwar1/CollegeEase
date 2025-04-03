import express from 'express';
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
} from '../controllers/scholarshipApplication.controller';

const router = express.Router();

// Public route for submitting applications
router.post('/:organizationName/apply', createApplication);

// Routes for organization admins
router.get('/:organizationName/applications', getApplications);
router.patch('/:id/status', updateApplicationStatus);

export default router;