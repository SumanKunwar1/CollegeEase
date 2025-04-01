import { Request, Response } from 'express';
import { VirtualTourModel, College, VirtualTour } from '../models/virtualTour.model';

// Get all colleges
export const getAllColleges = async (req: Request, res: Response) => {
  try {
    const { search, location } = req.query;
    
    let query = {};
    
    if (search) {
      query = {
        ...query,
        organizationName: { $regex: search as string, $options: 'i' }
      };
    }
    
    if (location && location !== 'all') {
      query = {
        ...query,
        location: { $regex: location as string, $options: 'i' }
      };
    }
    
    const colleges = await VirtualTourModel.find(query);
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colleges', error });
  }
};

// Get single college
export const getCollege = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const college = await VirtualTourModel.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching college', error });
  }
};

// Create new college
export const createCollege = async (req: Request<{}, {}, College>, res: Response) => {
  try {
    const college = new VirtualTourModel(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ message: 'Error creating college', error });
  }
};

// Update college
export const updateCollege = async (req: Request<{ id: string }, {}, Partial<College>>, res: Response) => {
  try {
    const college = await VirtualTourModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.json(college);
  } catch (error) {
    res.status(400).json({ message: 'Error updating college', error });
  }
};

// Delete college
export const deleteCollege = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const college = await VirtualTourModel.findByIdAndDelete(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting college', error });
  }
};

// Add virtual tour to college
export const addVirtualTour = async (req: Request<{ collegeId: string }, {}, VirtualTour>, res: Response) => {
  try {
    const college = await VirtualTourModel.findById(req.params.collegeId);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    
    college.virtualTours.push(req.body);
    await college.save();
    
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ message: 'Error adding virtual tour', error });
  }
};

// Update virtual tour
export const updateVirtualTour = async (
  req: Request<{ collegeId: string, tourId: string }, {}, Partial<VirtualTour>>,
  res: Response
) => {
  try {
    const { collegeId, tourId } = req.params;
    
    const college = await VirtualTourModel.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    
    const tour = college.virtualTours.id(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Virtual tour not found' });
    }
    
    tour.set(req.body);
    await college.save();
    
    res.json(college);
  } catch (error) {
    res.status(400).json({ message: 'Error updating virtual tour', error });
  }
};

// Delete virtual tour
export const deleteVirtualTour = async (req: Request<{ collegeId: string, tourId: string }>, res: Response) => {
  try {
    const { collegeId, tourId } = req.params;
    
    const college = await VirtualTourModel.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    
    college.virtualTours.pull(tourId);
    await college.save();
    
    res.json(college);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting virtual tour', error });
  }
};

// Get all locations
export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await VirtualTourModel.distinct('location');
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};