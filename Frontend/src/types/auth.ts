export type UserType = "institute" | "industry" | "mentor" | "scholarship";

export interface AuthFormData {
  email: string;
  password: string;
  userType: UserType;
  organizationName?: string;
  location?: string;
  supportDocuments?: FileList;
}

export interface User {
  id: string;
  email: string;
  userType: UserType;
  organizationName?: string;
  location?: string;
}
