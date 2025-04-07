import express from 'express';
import {
  submitApplication,
  getApplications,
  getApplicationsByJob
} from '../controllers/applicationForm.controller';

const router = express.Router();

router.route('/')
  .post(submitApplication)
  .get(getApplications);

router.route('/job/:jobId')
  .get(getApplicationsByJob);

export default router;