export interface VirtualTour {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}
export interface College {
  programs: any;
  id: string;
  name: string;
  location: string;
  rating: number;
  tuitionRange: string;
  acceptanceRate: string;
  studentPopulation: string;
  imageUrl: string;
  courses: string[];
  rankings: {
    academic: number;
    studentSatisfaction: number;
    placement: number;
  };
  virtualTours: VirtualTour[];
}

export interface CollegeComparison {
  colleges: College[];
  showModal: boolean;
  onClose: () => void;
}

export interface RankingCriteria {
  id: string;
  name: string;
  key: keyof College["rankings"];
}

export interface ApplicationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}
