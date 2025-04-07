import express from 'express';
import {
  submitFeedback,
  getAllFeedback,
  getSessionFeedback,
} from '../controllers/feedback.controller';

const router = express.Router();

router.route('/').post(submitFeedback).get(getAllFeedback);
router.route('/:sessionId').get(getSessionFeedback);

export default router;