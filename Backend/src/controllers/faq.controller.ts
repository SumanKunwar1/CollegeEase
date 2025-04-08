import { Request, Response, NextFunction } from 'express';
import FAQ from '../models/faq.model';
import { asyncHandler } from '../utils/asyncHandler';

// @desc    Get all FAQs
// @route   GET /api/v1/faqs
// @access  Private/Admin
export const getFAQs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const faqs = await FAQ.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: faqs.length,
    data: faqs,
  });
});

// @desc    Create a new FAQ
// @route   POST /api/v1/faqs
// @access  Private/Admin
export const createFAQ = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { question, answer } = req.body;

  const faq = await FAQ.create({
    question,
    answer,
  });

  res.status(201).json({
    success: true,
    data: faq,
  });
});

// @desc    Update a FAQ
// @route   PUT /api/v1/faqs/:id
// @access  Private/Admin
export const updateFAQ = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { question, answer } = req.body;

  const faq = await FAQ.findByIdAndUpdate(
    req.params.id,
    {
      question,
      answer,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!faq) {
    return next(new Error('FAQ not found'));
  }

  res.status(200).json({
    success: true,
    data: faq,
  });
});

// @desc    Delete a FAQ
// @route   DELETE /api/v1/faqs/:id
// @access  Private/Admin
export const deleteFAQ = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);

  if (!faq) {
    return next(new Error('FAQ not found'));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});