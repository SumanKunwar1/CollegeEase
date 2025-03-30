import { Types } from 'mongoose';

export type UserType = "institute" | "industry" | "mentor" | "scholarship";

interface BaseUser {
  _id: Types.ObjectId;
  email: string;
  userType: UserType;
  organizationName?: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthFormData {
  email: string;
  password: string;
  userType: UserType;
  organizationName?: string;
  location?: string;
  supportDocuments?: FileList;
}

export interface SafeUser extends Omit<BaseUser, '_id'> {
  _id: string;
}

export interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  status: 'success' | 'fail';
  token?: string;
  data?: {
    user: SafeUser;
  };
  message?: string;
}

export interface AuthError {
  status: 'error';
  message: string;
  code?: number;
  details?: any;
}