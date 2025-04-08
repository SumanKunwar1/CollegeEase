// controllers/jobMarketAnalysis.controller.ts
import { Request, Response, NextFunction } from 'express';
import { CategoryModel, MarketInsight } from '../models/jobMarketAnalysis.model';
import { asyncHandler } from '../utils/asyncHandler';

// Create a new category
export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const category = await CategoryModel.create({
    title,
    description,
    insights: [],
  });

  res.status(201).json({
    success: true,
    data: category,
  });
});

// Get all categories with insights
export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await CategoryModel.find();
  res.status(200).json({
    success: true,
    data: categories,
  });
});

// Update a category
export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { title, description },
    { new: true, runValidators: true }
  );

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// Delete a category
export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

// Add insight to a category
export const addInsight = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const insightData: MarketInsight = req.body;

  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { $push: { insights: insightData } },
    { new: true, runValidators: true }
  );

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(201).json({
    success: true,
    data: category,
  });
});

// Update an insight
export const updateInsight = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, insightId } = req.params;
  const insightData: MarketInsight = req.body;

  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  const insightIndex = category.insights.findIndex(
    (insight) => insight._id.toString() === insightId
  );

  if (insightIndex === -1) {
    res.status(404);
    throw new Error('Insight not found');
  }

  category.insights[insightIndex] = {
    ...category.insights[insightIndex],
    ...insightData,
  };

  await category.save();

  res.status(200).json({
    success: true,
    data: category,
  });
});

// Delete an insight
export const deleteInsight = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, insightId } = req.params;

  const category = await CategoryModel.findByIdAndUpdate(
    categoryId,
    { $pull: { insights: { _id: insightId } } },
    { new: true }
  );

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// Search insights
export const searchInsights = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    const categories = await CategoryModel.find();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  }

  const searchQuery = query.toLowerCase();

  const categories = await CategoryModel.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $match: {
        $or: [
          { 'category.title': { $regex: searchQuery, $options: 'i' } },
          { 'insights.role': { $regex: searchQuery, $options: 'i' } },
          { 'insights.skills': { $regex: searchQuery, $options: 'i' } },
          { 'insights.topLocations': { $regex: searchQuery, $options: 'i' } },
        ],
      },
    },
    {
      $project: {
        title: '$category.title',
        description: '$category.description',
        insights: {
          $filter: {
            input: '$insights',
            as: 'insight',
            cond: {
              $or: [
                { $regexMatch: { input: '$$insight.role', regex: searchQuery, options: 'i' } },
                {
                  $gt: [
                    {
                      $size: {
                        $filter: {
                          input: '$$insight.skills',
                          as: 'skill',
                          cond: {
                            $regexMatch: { input: '$$skill', regex: searchQuery, options: 'i' },
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
                {
                  $gt: [
                    {
                      $size: {
                        $filter: {
                          input: '$$insight.topLocations',
                          as: 'location',
                          cond: {
                            $regexMatch: { input: '$$location', regex: searchQuery, options: 'i' },
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $match: {
        $or: [{ 'insights.0': { $exists: true } }, { title: { $regex: searchQuery, $options: 'i' } }],
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: categories,
  });
});