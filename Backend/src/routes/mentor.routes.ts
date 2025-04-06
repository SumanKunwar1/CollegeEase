import express, { RequestHandler } from 'express';
import {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor,
  getMentorById
} from '../controllers/mentor.controller';

const router = express.Router();

router.get('/', getMentors as RequestHandler);
router.post('/', createMentor as RequestHandler);
router.put('/:id', updateMentor as RequestHandler);
router.delete('/:id', deleteMentor as RequestHandler);
router.get('/:id', getMentorById as RequestHandler); 

export default router;