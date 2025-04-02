// controllers/scholarship.controller.ts
import { Request, Response } from 'express';
import Scholarship from '../models/scholarship.model';

export const createScholarship = async (req: Request, res: Response) => {
  try {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (err) {
    res.status(500).json({ message: 'Error creating scholarship', error: err });
  }
};

export const getScholarships = async (req: Request, res: Response) => {
  try {
    const scholarships = await Scholarship.find({}, {
      name: 1,
      organizationName: 1,
      type: 1,
      deadline: 1,
      amount: 1,
      status: 1,
      coverImage: 1
    }).lean();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching scholarships', error: err });
  }
};

export const getScholarshipByOrganization = async (req: Request, res: Response) => {
  try {
    const scholarship = await Scholarship.findOne({ 
      organizationName: req.params.organizationName 
    }).lean();
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.json(scholarship);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error fetching scholarship', 
      error: err 
    });
  }
};

export const updateScholarship = async (req: Request, res: Response) => {
  try {
    const updatedScholarship = await Scholarship.findOneAndUpdate(
      { organizationName: req.params.organizationName },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.json(updatedScholarship);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error updating scholarship', 
      error: err 
    });
  }
};

export const deleteScholarship = async (req: Request, res: Response) => {
  try {
    const deletedScholarship = await Scholarship.findOneAndDelete({
      organizationName: req.params.organizationName
    });
    
    if (!deletedScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error deleting scholarship', 
      error: err 
    });
  }
};