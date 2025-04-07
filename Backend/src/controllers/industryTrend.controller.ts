// controllers/industryTrend.controller.ts
import { Request, Response, NextFunction } from 'express';
import { IndustryTrendCategory } from '../models/industryTrend.model';
import { asyncHandler } from '../utils/asyncHandler';

// @desc    Get all industry trend categories with their trends
// @route   GET /api/v1/industry-trends
// @access  Public
export const getIndustryTrends = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await IndustryTrendCategory.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  }
);

// @desc    Get single industry trend category
// @route   GET /api/v1/industry-trends/:categoryId
// @access  Public
export const getIndustryTrendCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await IndustryTrendCategory.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found with id of ${req.params.categoryId}`
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  }
);

// @desc    Create new industry trend category
// @route   POST /api/v1/industry-trends
// @access  Public
export const createIndustryTrendCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await IndustryTrendCategory.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  }
);

// @desc    Update industry trend category
// @route   PUT /api/v1/industry-trends/:categoryId
// @access  Public
export const updateIndustryTrendCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await IndustryTrendCategory.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found with id of ${req.params.categoryId}`
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  }
);

// @desc    Delete industry trend category
// @route   DELETE /api/v1/industry-trends/:categoryId
// @access  Public
export const deleteIndustryTrendCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await IndustryTrendCategory.findByIdAndDelete(
      req.params.categoryId
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found with id of ${req.params.categoryId}`
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);

// @desc    Add trend to category
// @route   POST /api/v1/industry-trends/:categoryId/trends
// @access  Public
export const addTrendToCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await IndustryTrendCategory.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found with id of ${req.params.categoryId}`
      });
    }

    category.trends.push(req.body);
    await category.save();

    res.status(201).json({
      success: true,
      data: category,
    });
  }
);

// @desc    Update trend in category
// @route   PUT /api/v1/industry-trends/:categoryId/trends/:trendId
// @access  Public
export const updateTrendInCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await IndustryTrendCategory.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found with id of ${req.params.categoryId}`
      });
    }

    const trendIndex = category.trends.findIndex(
      (trend) => trend._id.toString() === req.params.trendId
    );

    if (trendIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Trend not found with id of ${req.params.trendId}`
      });
    }

    category.trends[trendIndex] = {
      ...(category.trends[trendIndex] as any).toObject(),
      ...req.body,
    };

    await category.save();

    res.status(200).json({
      success: true,
      data: category,
    });
  }
);

// @desc    Delete trend from category
// @route   DELETE /api/v1/industry-trends/:categoryId/trends/:trendId
// @access  Public
export const deleteTrendFromCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await IndustryTrendCategory.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found with id of ${req.params.categoryId}`
      });
    }

    category.trends = category.trends.filter(
      (trend) => trend._id.toString() !== req.params.trendId
    );

    await category.save();

    res.status(200).json({
      success: true,
      data: category,
    });
  }
);