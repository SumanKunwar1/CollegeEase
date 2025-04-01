// types/virtualtour.ts
export interface VirtualTour {
    _id: string;
    title: string;
    url: string;
    thumbnail?: string;
  }
  
  export interface College {
    _id: string;
    organizationName: string;
    location: string;
    rating?: number;
    tuitionRange?: string;
    acceptanceRate?: string;
    studentPopulation?: string;
    courses?: string[];
    rankings?: {
      academic: number;
      studentSatisfaction: number;
      placement: number;
    };
    virtualTours: VirtualTour[];
    imageUrl?: string;
    programs?: string[];
  }
  
  export interface CollegeCreateData extends Omit<College, '_id' | 'virtualTours'> {
    virtualTours?: VirtualTour[];
  }
  
  export interface VirtualTourCreateData extends Omit<VirtualTour, '_id'> {}