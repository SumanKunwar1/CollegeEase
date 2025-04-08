// src/routes/expertInterview.routes.ts
import express from 'express';
import {
  createInterviewCategory,
  getAllInterviewCategories,
  updateInterviewCategory,
  deleteInterviewCategory,
  addInterviewToCategory,
  updateInterviewInCategory,
  deleteInterviewFromCategory,
  updateFullInterviewDetails
} from '../controllers/expertInterview.controller';

const router = express.Router();

// Category routes
router.post('/', createInterviewCategory);
router.get('/', getAllInterviewCategories);
router.put('/:id', updateInterviewCategory);
router.delete('/:id', deleteInterviewCategory);

// Interview routes
router.post('/:id/interviews', addInterviewToCategory);
router.put('/:categoryId/interviews/:interviewId', updateInterviewInCategory);
router.delete('/:categoryId/interviews/:interviewId', deleteInterviewFromCategory);

// Full interview details
router.put('/:categoryId/interviews/:interviewId/full', updateFullInterviewDetails);

export default router;