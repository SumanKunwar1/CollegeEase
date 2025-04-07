// routes/industryTrend.routes.ts
import express from 'express';
import {
  getIndustryTrends,
  getIndustryTrendCategory,
  createIndustryTrendCategory,
  updateIndustryTrendCategory,
  deleteIndustryTrendCategory,
  addTrendToCategory,
  updateTrendInCategory,
  deleteTrendFromCategory,
} from '../controllers/industryTrend.controller';

const router = express.Router();

router
  .route('/')
  .get(getIndustryTrends)
  .post(createIndustryTrendCategory);

router
  .route('/:categoryId')
  .get(getIndustryTrendCategory)
  .put(updateIndustryTrendCategory)
  .delete(deleteIndustryTrendCategory);

router
  .route('/:categoryId/trends')
  .post(addTrendToCategory);

router
  .route('/:categoryId/trends/:trendId')
  .put(updateTrendInCategory)
  .delete(deleteTrendFromCategory);

export default router;