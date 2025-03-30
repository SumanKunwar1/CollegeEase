export interface User {
  id: string;
  role: 'student' | 'donor' | 'institution';
  name: string;
  email: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  courses: string[];
  rating: number;
  imageUrl: string;
  tuitionRange: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  description: string;
}

export interface DonationProfile {
  id: string;
  studentName: string;
  academicHistory: string;
  financialNeeds: string;
  goals: string;
  amountNeeded: number;
  amountRaised: number;
}