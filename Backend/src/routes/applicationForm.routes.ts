// applicationForm.routes.ts
import express from 'express';
import {
  submitApplication,
  getApplicationsByCompany,
  updateApplicationStatus
} from '../controllers/applicationForm.controller';

const router = express.Router();

router.route('/')
  .post(submitApplication);

router.route('/company/:companyName')
  .get(getApplicationsByCompany);

router.route('/:id/status')
  .patch(updateApplicationStatus);

export default router;