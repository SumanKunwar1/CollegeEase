export interface DetailedAnalysis {
  jobDescription: string;
  industryTrends: string;
  salaryRange: string;
  careerPath: string[];
  keyCompanies: string[];
  futureOutlook: string;
}

export interface MarketInsight {
  role: string;
  growth: string;
  avgSalary: string;
  topLocations: string[];
  skills: string[];
  demand: string;
  imageUrl: string;
  detailedAnalysis: DetailedAnalysis;
}

export interface Category {
  title: string;
  description: string;
  insights: MarketInsight[];
}
