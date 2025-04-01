import express from 'express';
import {
  getAllColleges,
  getCollege,
  createCollege,
  updateCollege,
  deleteCollege,
  addVirtualTour,
  updateVirtualTour,
  deleteVirtualTour,
  getLocations
} from '../controllers/virtualTour.controller';

const router = express.Router();

// College routes
router.get('/', (req, res) => void getAllColleges(req, res));
router.get('/locations', (req, res) => void getLocations(req, res));
router.get('/:id', (req, res) => void getCollege(req, res));
router.post('/', (req, res) => void createCollege(req, res));
router.put('/:id', (req, res) => void updateCollege(req, res));
router.delete('/:id', (req, res) => void deleteCollege(req, res));

// Virtual tour routes
router.post('/:collegeId/tours', (req, res) => void addVirtualTour(req, res));
router.put('/:collegeId/tours/:tourId', (req, res) => void updateVirtualTour(req, res));
router.delete('/:collegeId/tours/:tourId', (req, res) => void deleteVirtualTour(req, res));

export default router;