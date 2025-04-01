import express from 'express';
import {
  getAllColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
  searchColleges,
} from '../controllers/searchCompare.controller';

const router = express.Router();

router.get('/', (req, res) => void getAllColleges(req, res));
router.get('/search', (req, res) => void searchColleges(req, res));
router.get('/:id', (req, res) => void getCollegeById(req, res));
router.post('/', (req, res) => void createCollege(req, res));
router.put('/:id', (req, res) => void updateCollege(req, res));
router.delete('/:id', (req, res) => void deleteCollege(req, res));

export default router;