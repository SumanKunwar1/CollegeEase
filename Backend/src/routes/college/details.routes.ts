import express from 'express';
import {
  getCollegeDetails,
  updateCollegeDetails,
  addProgram,
  uploadCoverImage,
  addCourse,
  removeCourse,
  updateTuitionInfo,
  updateDeadlines,
  updateCareerStats
} from '../../controllers/college/details.controller';

const router = express.Router();

// Remove all authenticate middleware
router.get('/:organizationName', getCollegeDetails);
router.put('/:organizationName', updateCollegeDetails);
router.post('/:organizationName/programs', addProgram);
router.post('/:organizationName/cover-image', uploadCoverImage); // Changed to accept URL
router.post('/:organizationName/courses', addCourse);
router.delete('/:organizationName/courses', removeCourse);
router.put('/:organizationName/tuition', updateTuitionInfo);
router.put('/:organizationName/deadlines', updateDeadlines);
router.put('/:organizationName/career-stats', updateCareerStats);

export default router;