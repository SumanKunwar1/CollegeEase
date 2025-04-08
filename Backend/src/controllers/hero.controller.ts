// src/controllers/hero.controller.ts
import { Request, Response, NextFunction } from 'express';
import Hero from '../models/hero.model';
import { asyncHandler } from '../utils/asyncHandler';

// @desc    Get hero content
// @route   GET /api/v1/hero
// @access  Public
export const getHeroContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Find or create the hero content (only one document in collection)
  let hero = await Hero.findOne();
  
  if (!hero) {
    // Create default hero content if none exists
    hero = await Hero.create({});
  }

  res.status(200).json({
    success: true,
    data: hero
  });
});

// @desc    Update hero content
// @route   PUT /api/v1/hero
// @access  Private/Admin
export const updateHeroContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Find or create the hero content
  let hero = await Hero.findOne();
  
  if (!hero) {
    hero = await Hero.create(req.body);
  } else {
    hero = await Hero.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true
    });
  }

  res.status(200).json({
    success: true,
    data: hero
  });
});