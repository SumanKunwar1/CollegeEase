import { Request, Response } from 'express';
import { CollegeModel } from '../models/searchCompare.model';

export const getAllColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const colleges = await CollegeModel.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colleges', error });
  }
};

export const getCollegeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const college = await CollegeModel.findById(req.params.id);
    if (!college) {
      res.status(404).json({ message: 'College not found' });
      return;
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching college', error });
  }
};

export const createCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCollege = new CollegeModel({
      organizationName: req.body.organizationName || 'New College',
      location: req.body.location || 'Unknown',
      tuitionRange: req.body.tuitionRange || '$0',
      acceptanceRate: req.body.acceptanceRate || '0%',
      studentPopulation: req.body.studentPopulation || '0',
      courses: req.body.courses || [],
    });
    const savedCollege = await newCollege.save();
    res.status(201).json(savedCollege);
  } catch (error) {
    res.status(400).json({ message: 'Error creating college', error });
  }
};

export const updateCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCollege = await CollegeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCollege) {
      res.status(404).json({ message: 'College not found' });
      return;
    }
    res.status(200).json(updatedCollege);
  } catch (error) {
    res.status(400).json({ message: 'Error updating college', error });
  }
};

export const deleteCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCollege = await CollegeModel.findByIdAndDelete(req.params.id);
    if (!deletedCollege) {
      res.status(404).json({ message: 'College not found' });
      return;
    }
    res.status(200).json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting college', error });
  }
};

export const searchColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, location, tuitionRange } = req.query;
    
    let filter: any = {};
    
    if (query) {
      filter.organizationName = { $regex: query as string, $options: 'i' };
    }
    
    if (location && location !== 'all') {
      filter.location = { $regex: location as string, $options: 'i' };
    }
    
    if (tuitionRange && tuitionRange !== 'all') {
      if (tuitionRange === '0-25000') {
        filter.tuitionRange = { $regex: /^\$([0-9]{1,2},)?[0-9]{1,3}$/ };
      } else if (tuitionRange === '25000-50000') {
        filter.tuitionRange = { $regex: /^\$[2-4][0-9],[0-9]{3}$/ };
      } else if (tuitionRange === '50000+') {
        filter.tuitionRange = { $regex: /^\$[5-9][0-9],[0-9]{3}$/ };
      }
    }
    
    const colleges = await CollegeModel.find(filter);
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Error searching colleges', error });
  }
};