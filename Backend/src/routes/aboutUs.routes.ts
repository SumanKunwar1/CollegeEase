// src/routes/aboutUs.routes.ts
import express from 'express';
import { getAboutUs, updateAboutUs } from '../controllers/aboutUs.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.route('/')
  .get(asyncHandler(getAboutUs))
  .put(asyncHandler(updateAboutUs));

export default router;