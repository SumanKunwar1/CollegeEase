// types/scholarship.ts
export interface ScholarshipDetails {
  _id: any;
  id: string;
  coverImage: string;
  name: string;
  organizationName: string; // Changed from provider
  type: "Merit-based" | "Need-based" | "Research" | "Sports" | "Cultural";
  deadline: string;
  amount: string;
  eligibleCountries: string[];
  requirements: {
    minimumGPA: number;
    preferredGPA: number;
    competitiveGPA: number;
    majorWeights: Record<string, number>;
    countryDiversity: {
      priority: string[];
      weight: number;
    };
  };
  vision: {
    purpose: string;
    impact: string;
    goals: string;
  };
  institution: {
    name: string;
    history: string;
    achievements: string[];
    accreditation: string[];
  };
  eligibility: {
    academicRequirements: string[];
    financialNeed?: string;
    nationality: string[];
    ageLimit?: string;
    studyLevel: string[];
    languageRequirements: string[];
    specialRequirements?: string[];
  };
  benefits: {
    coverage: string[];
    additionalPerks: string[];
  };
  statistics: {
    averageGPAAwarded: number;
    totalApplications: number;
    acceptanceRate: number;
    majorDistribution: Record<string, number>;
  };
  applicationProcess: string[];
  status: "Open" | "Closing Soon" | "Closed";
}