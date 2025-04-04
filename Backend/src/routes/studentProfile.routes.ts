import express from 'express';
import {
  getAllStudentProfiles,
  createStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
  getStudentProfile,
} from '../controllers/studentProfile.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/', asyncHandler(getAllStudentProfiles));
router.post('/', asyncHandler(createStudentProfile));
router.get('/:id', asyncHandler(getStudentProfile));
router.put('/:id', asyncHandler(updateStudentProfile));
router.delete('/:id', asyncHandler(deleteStudentProfile));

export default router;