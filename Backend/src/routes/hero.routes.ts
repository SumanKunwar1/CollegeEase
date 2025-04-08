import express from 'express';
import { getHeroContent, updateHeroContent } from '../controllers/hero.controller';

const router = express.Router();

router.route('/')
  .get(getHeroContent)
  .put(updateHeroContent);

export default router;