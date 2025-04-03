import express from 'express';
import { createSuccessStory, getSuccessStories } from '../controllers/successStory.controller';

const router = express.Router();

router.route('/')
  .post(createSuccessStory)
  .get(getSuccessStories);

export default router;