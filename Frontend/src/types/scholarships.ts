export type Scholarships = {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibleCountries: string[];
  vision: {
    purpose: string;
  };
  eligibility: {
    academicRequirements: string[];
    studyLevel: string[];
    ageLimit: string;
  };
  benefits: {
    coverage: string[];
    additionalPerks: string[];
  };
  status: string;
  type: string;
  applicationProcess: string[];
  institution: {
    history: string;
    achievements: string[];
  };
  coverImage?: string;
};
