import express from 'express';
import {
  getAllSkillCategories,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  addCourseToCategory,
  updateCourseInCategory,
  deleteCourseFromCategory,
  getCourseById
} from '../controllers/skillDevelopment.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// Skill Category routes
router.get('/', asyncHandler(getAllSkillCategories));
router.post('/', asyncHandler(createSkillCategory));
router.put('/:id', asyncHandler(updateSkillCategory));
router.delete('/:id', asyncHandler(deleteSkillCategory));

// Course routes within a category
router.post('/:id/courses', asyncHandler(addCourseToCategory));
router.put('/:categoryId/courses/:courseId', asyncHandler(updateCourseInCategory));
router.delete('/:categoryId/courses/:courseId', asyncHandler(deleteCourseFromCategory));
router.get('/course/:courseId', asyncHandler(getCourseById));

export default router;