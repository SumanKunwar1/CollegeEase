// src/controllers/expertInterview.controller.ts
import { Request, Response } from 'express';
import { InterviewCategory, IInterview, IInterviewCategory } from '../models/expertInterview.model';
import { asyncHandler } from '../utils/asyncHandler';

// Create a new interview category
export const createInterviewCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { category } = req.body;

    const newCategory = await InterviewCategory.create({ 
      category,
      interviews: []
    });

    res.status(201).json({
      success: true,
      data: newCategory
    });
  }
);

// Get all interview categories with interviews
export const getAllInterviewCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await InterviewCategory.find();

    res.status(200).json({
      success: true,
      data: categories
    });
  }
);

// Update an interview category
export const updateInterviewCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { category } = req.body;

    const updatedCategory = await InterviewCategory.findByIdAndUpdate(
      id,
      { category },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Interview category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory
    });
  }
);

// Delete an interview category
export const deleteInterviewCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCategory = await InterviewCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Interview category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
);

// Add an interview to a category
export const addInterviewToCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const interviewData: Omit<IInterview, '_id'> = req.body;

    const category = await InterviewCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Interview category not found'
      });
    }

    category.interviews.push(interviewData as IInterview);
    await category.save();

    res.status(201).json({
      success: true,
      data: category
    });
  }
);

// Update an interview in a category
export const updateInterviewInCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId, interviewId } = req.params;
    const interviewData: Partial<IInterview> = req.body;

    const category = await InterviewCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Interview category not found'
      });
    }

    const interview = category.interviews.id(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    Object.assign(interview, interviewData);
    await category.save();

    res.status(200).json({
      success: true,
      data: category
    });
  }
);

// Delete an interview from a category
export const deleteInterviewFromCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId, interviewId } = req.params;

    const category = await InterviewCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Interview category not found'
      });
    }

    const interview = category.interviews.id(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Updated approach: use pull to remove the subdocument
    category.interviews.pull(interviewId);
    await category.save();

    res.status(200).json({
      success: true,
      data: category
    });
  }
);

// Add or update full interview details
export const updateFullInterviewDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId, interviewId } = req.params;
    const fullInterviewData = req.body;

    const category = await InterviewCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Interview category not found'
      });
    }

    const interview = category.interviews.id(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    interview.fullInterview = fullInterviewData;
    await category.save();

    res.status(200).json({
      success: true,
      data: category
    });
  }
);