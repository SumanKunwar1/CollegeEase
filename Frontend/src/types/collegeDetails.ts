export interface CollegeProgram {
  name: string;
  type: "undergraduate" | "postgraduate" | "doctorate";
  duration: string;
  description?: string;
}

export interface AdmissionRequirement {
  level: "undergraduate" | "postgraduate" | "doctorate";
  requirements: string[];
}

export interface TuitionInfo {
  level: "undergraduate" | "postgraduate" | "doctorate";
  range: string;
  notes?: string;
}

export interface StudentReview {
  id: string;
  studentName: string;
  program: string;
  review: string;
  rating: number;
}

export interface CollegeDetails {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  foundedYear: number;
  description: string;
  mission: string;
  globalRanking: number;
  programs: {
    undergraduate: CollegeProgram[];
    postgraduate: CollegeProgram[];
    doctorate: CollegeProgram[];
  };
  admissionRequirements: AdmissionRequirement[];
  tuition: TuitionInfo[];
  facilities: string[];
  studentReviews: StudentReview[];
  careerStats: {
    placementRate: string;
    topEmployers: string[];
    averageSalary: string;
  };
  applicationDeadlines: {
    fall: string;
    spring: string;
  };
  alumniCount: number;
}
