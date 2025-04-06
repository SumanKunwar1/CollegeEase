// src/routes/mentor.routes.ts
import express from 'express';
import {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor
} from '../controllers/mentor.controller';

const router = express.Router();

router.get('/', getMentors);
router.post('/', createMentor);
router.put('/:id', updateMentor);
router.delete('/:id', deleteMentor);

export default router;