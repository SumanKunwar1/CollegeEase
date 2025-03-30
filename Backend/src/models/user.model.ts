import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define user roles as const object
export const UserRoles = {
  ADMIN: 'admin',
  INSTITUTE: 'institute',
  USER: 'user'
} as const;

// Create type from the roles object
export type UserRole = typeof UserRoles[keyof typeof UserRoles];

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  userType: 'institute' | 'industry' | 'mentor' | 'scholarship';
  role: UserRole;
  organizationName?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  correctPassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { 
    type: String,
    required: true,
    enum: ['institute', 'industry', 'mentor', 'scholarship']
  },
  role: { 
    type: String,
    enum: Object.values(UserRoles),
    default: UserRoles.USER
  },
  organizationName: { type: String },
  location: { type: String }
}, { timestamps: true });

UserSchema.methods.correctPassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);