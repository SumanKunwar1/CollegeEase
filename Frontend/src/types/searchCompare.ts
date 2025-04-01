export interface College {
    id: string;
    _id: string;
    organizationName: string;
    location: string;
    tuitionRange: string;
    acceptanceRate: string;
    studentPopulation: string;
    courses: string[];
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface NewCollege {
    organizationName: string;
    location: string;
    tuitionRange: string;
    acceptanceRate: string;
    studentPopulation: string;
    courses: string[];
  }