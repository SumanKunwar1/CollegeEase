import express from 'express';
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  addInsight,
  updateInsight,
  deleteInsight,
  searchInsights,
} from '../controllers/jobMarketAnalysis.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// Category routes
router.post('/categories', asyncHandler(createCategory));
router.get('/categories', asyncHandler(getAllCategories));
router.put('/categories/:id', asyncHandler(updateCategory));
router.delete('/categories/:id', asyncHandler(deleteCategory));

// Insight routes
router.post('/categories/:id/insights', asyncHandler(addInsight));
router.put('/categories/:categoryId/insights/:insightId', asyncHandler(updateInsight));
router.delete('/categories/:categoryId/insights/:insightId', asyncHandler(deleteInsight));

// Search route
router.get('/search', asyncHandler(searchInsights));

export default router;