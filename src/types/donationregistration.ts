export interface Student {
  raised: number;
  id: string;
  email: string;
  fullName: string;
  cause: string;
  description: string;
  amountNeeded: number;
  documents: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  password: string;
}

export type Donor = {
  id: string;
  email: string;
  fullName: string;
  country: string;
  position: string;
  organization: string;
  phoneNumber: string;
  donationPreference: string;
  createdAt: string;
};

export interface Donation {
  id: string;
  donorId: string;
  studentId: string;
  amount: number;
  date: string;
  studentName: string;
  cause: string;
}
