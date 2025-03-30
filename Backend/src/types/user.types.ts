import { IUser as OriginalIUser } from '../models/user';
import { Document } from 'mongoose';

// Define your role types
export const UserRoles = {
  ADMIN: 'admin',
  INSTITUTE: 'institute',
  USER: 'user'
} as const;

export type UserRole = typeof UserRoles[keyof typeof UserRoles];

// Create a new interface that extends the original but fixes the role type
export interface IUser extends Omit<OriginalIUser, 'role'> {
  role: UserRole;
}

// Utility type to convert Mongoose Document to plain object
export type UserWithoutDoc = Omit<IUser, keyof Document>;