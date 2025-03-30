import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:4001/api/v1';

interface College {
  data: any;
  id: string;
  organizationName: string;
  name: string;
  // Add all other college properties
}

interface Program {
  name: string;
  type: string;
  duration: string;
  description: string;
}

// Admin Colleges API
export const adminCollegeApi = {
  getAllColleges: (): Promise<AxiosResponse<College[]>> => 
    axios.get(`${API_BASE_URL}/colleges`),
  
  getCollegeByOrganizationName: (organizationName: string): Promise<AxiosResponse<College>> => 
    axios.get(`${API_BASE_URL}/colleges/${organizationName}`),
  
  createCollege: (collegeData: Partial<College>): Promise<AxiosResponse<College>> => 
    axios.post(`${API_BASE_URL}/colleges`, collegeData),
  
  updateCollege: (organizationName: string, collegeData: Partial<College>): Promise<AxiosResponse<College>> => 
    axios.put(`${API_BASE_URL}/colleges/${organizationName}`, collegeData),
  
  deleteCollege: (organizationName: string): Promise<AxiosResponse<void>> => 
    axios.delete(`${API_BASE_URL}/colleges/${organizationName}`),
  
  addCourse: (organizationName: string, course: string): Promise<AxiosResponse<College>> => 
    axios.post(`${API_BASE_URL}/colleges/${organizationName}/courses`, { course }),
  
  removeCourse: (organizationName: string, course: string): Promise<AxiosResponse<College>> => 
    axios.delete(`${API_BASE_URL}/colleges/${organizationName}/courses`, { data: { course } }),
  
  uploadImage: (organizationName: string, imageFile: File): Promise<AxiosResponse<College>> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return axios.post(`${API_BASE_URL}/colleges/${organizationName}/cover-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

// Institute API (with proper typing)
export const instituteApi = {
  getCollegeDetails: (organizationName: string): Promise<AxiosResponse<College>> => 
    axios.get(`${API_BASE_URL}/colleges/${organizationName}`),
  
  updateCollegeDetails: (organizationName: string, details: Partial<College>): Promise<AxiosResponse<College>> => 
    axios.put(`${API_BASE_URL}/colleges/${organizationName}`, details),
  
  addProgram: (organizationName: string, level: string, program: Program): Promise<AxiosResponse<College>> => 
    axios.post(`${API_BASE_URL}/colleges/${organizationName}/programs`, { level, program }),
  
  uploadCoverImage: (organizationName: string, imageFile: File): Promise<AxiosResponse<College>> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return axios.post(`${API_BASE_URL}/colleges/${organizationName}/cover-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};