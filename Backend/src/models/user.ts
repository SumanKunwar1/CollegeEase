import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  role(role: any): unknown;
  _id: Types.ObjectId;
  email: string;
  password: string;
  userType: 'institute' | 'industry' | 'mentor' | 'scholarship';
  organizationName?: string;
  location: string;
  supportDocuments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  correctPassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  userType: { 
    type: String, 
    required: [true, 'User type is required'],
    enum: {
      values: ['institute', 'industry', 'mentor', 'scholarship'],
      message: 'User type must be either institute, industry, mentor, or scholarship'
    }
  },
  organizationName: { 
    type: String,
    required: [
      function(this: IUser) { return this.userType !== 'mentor'; },
      'Organization name is required for this user type'
    ]
  },
  location: { 
    type: String, 
    required: [true, 'Location is required'] 
  },
  supportDocuments: { type: [String] }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

userSchema.methods.correctPassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;