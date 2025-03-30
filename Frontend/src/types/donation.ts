export interface DonationProfile {
  id: string;
  studentName: string;
  story: string;
  academicHistory: string;
  financialNeeds: string;
  goals: string;
  goal: number;
  raised: number;
  image: string;
}

export interface DonationFormData {
  amount: number;
  email: string;
  fullName: string;
  message?: string;
  anonymous: boolean;
}
