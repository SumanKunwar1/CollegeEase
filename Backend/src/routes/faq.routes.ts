import express from 'express';
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from '../controllers/faq.controller';

const router = express.Router();

router.route('/')
  .get(getFAQs)
  .post(createFAQ);

router.route('/:id')
  .put(updateFAQ)
  .delete(deleteFAQ);

export default router;