// services/virtualTour.service.ts
import { College, CollegeCreateData, VirtualTourCreateData } from '../types/virtualTour';

const API_BASE_URL = 'http://localhost:4001/api/v1/virtual-tours';

export const fetchColleges = async (search?: string, location?: string): Promise<College[]> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (location && location !== 'all') params.append('location', location);
    
    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch colleges: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching colleges:', error);
    throw error;
  }
};

export const fetchCollegeById = async (id: string): Promise<College> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch college: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching college with id ${id}:`, error);
    throw error;
  }
};

export const createCollege = async (collegeData: CollegeCreateData): Promise<College> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collegeData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create college: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating college:', error);
    throw error;
  }
};

export const updateCollege = async (id: string, collegeData: Partial<CollegeCreateData>): Promise<College> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collegeData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update college: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating college with id ${id}:`, error);
    throw error;
  }
};

export const deleteCollege = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete college: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error deleting college with id ${id}:`, error);
    throw error;
  }
};

export const addVirtualTour = async (collegeId: string, tourData: VirtualTourCreateData): Promise<College> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${collegeId}/tours`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tourData),
    });
    if (!response.ok) {
      throw new Error(`Failed to add virtual tour: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error adding virtual tour to college ${collegeId}:`, error);
    throw error;
  }
};

export const updateVirtualTour = async (
  collegeId: string,
  tourId: string,
  tourData: Partial<VirtualTourCreateData>
): Promise<College> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${collegeId}/tours/${tourId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tourData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update virtual tour: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating virtual tour ${tourId} in college ${collegeId}:`, error);
    throw error;
  }
};

export const deleteVirtualTour = async (collegeId: string, tourId: string): Promise<College> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${collegeId}/tours/${tourId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete virtual tour: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting virtual tour ${tourId} from college ${collegeId}:`, error);
    throw error;
  }
};

export const fetchLocations = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};