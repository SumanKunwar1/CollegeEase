import { Request, Response } from 'express';
import { SkillCategory, ICourse } from '../models/skillDevelopment.model';
import { asyncHandler } from '../utils/asyncHandler';

// Get all skill categories with their courses
export const getAllSkillCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await SkillCategory.find();
  res.status(200).json(categories);
});

// Create a new skill category
export const createSkillCategory = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;
  
  const category = new SkillCategory({
    title,
    description,
    courses: []
  });

  const savedCategory = await category.save();
  res.status(201).json(savedCategory);
});

// Update a skill category
export const updateSkillCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const updatedCategory = await SkillCategory.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );

  if (!updatedCategory) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json(updatedCategory);
});

// Delete a skill category
export const deleteSkillCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedCategory = await SkillCategory.findByIdAndDelete(id);

  if (!deletedCategory) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json({ message: 'Category deleted successfully' });
});

// Add a course to a category
export const addCourseToCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const courseData = req.body;

  const category = await SkillCategory.findById(id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  category.courses.push(courseData);
  const updatedCategory = await category.save();

  res.status(201).json(updatedCategory);
});

// Update a course in a category
export const updateCourseInCategory = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, courseId } = req.params;
  const courseData = req.body;

  const category = await SkillCategory.findById(categoryId);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  const courseIndex = category.courses.findIndex(
    (c) => c._id.toString() === courseId
  );
  
  if (courseIndex === -1) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Update the course while preserving the _id
  const updatedCourse = {
    ...category.courses[courseIndex].toObject(),
    ...courseData
  };

  category.courses[courseIndex] = updatedCourse as ICourse;
  const updatedCategory = await category.save();

  res.status(200).json(updatedCategory);
});

// Delete a course from a category
export const deleteCourseFromCategory = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, courseId } = req.params;

  const category = await SkillCategory.findById(categoryId);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  const courseIndex = category.courses.findIndex(
    (c) => c._id.toString() === courseId
  );
  
  if (courseIndex === -1) {
    res.status(404);
    throw new Error('Course not found');
  }

  category.courses.splice(courseIndex, 1);
  const updatedCategory = await category.save();

  res.status(200).json(updatedCategory);
});

// Get a course by ID
export const getCourseById = asyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const category = await SkillCategory.findOne({ 'courses._id': courseId });
  if (!category) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }

  const course = category.courses.find((c) => c._id.toString() === courseId);
  if (!course) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }

  res.status(200).json(course);
});