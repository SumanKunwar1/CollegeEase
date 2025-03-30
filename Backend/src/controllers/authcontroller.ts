import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { generateToken, verifyToken } from '../config/jwt';
import AppError from '../utils/appError';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/support-docs';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `support-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images (JPEG, JPG, PNG) and PDFs are allowed'));
  }
};

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
}).array('supportDocuments', 5);

export const uploadSupportDocs = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(new AppError('Error uploading files', 400));
    }
    next();
  });
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, userType, organizationName, location } = req.body;
    
    // Validate required fields
    if (!email || !password || !userType || !location) {
      return next(new AppError('Missing required fields', 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    // Handle mentor registration
    if (userType === 'mentor') {
      return next(new AppError('Mentors can only be registered by admin', 403));
    }

    // Validate organization name for non-mentors
    if (userType !== 'mentor' && !organizationName) {
      return next(new AppError('Organization name is required', 400));
    }

    // Handle file uploads
    const supportDocs = (req.files as Express.Multer.File[])?.map(
      (file) => file.path
    );

    // Create new user
    const newUser = await User.create({
      email,
      password,
      userType,
      organizationName: userType === 'mentor' ? undefined : organizationName,
      location,
      supportDocuments: supportDocs,
    });

    // Generate token
    const token = generateToken(newUser._id.toString());

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (error: any) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return next(new AppError(messages.join(', '), 400));
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return next(new AppError('Email or organization already exists', 400));
    }
    
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, userType } = req.body;

    // 1) Check if email and password exist
    if (!email || !password || !userType) {
      return next(new AppError('Please provide email, password and user type', 400));
    }

    // 2) Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) Check if user type matches
    if (user.userType !== userType) {
      return next(
        new AppError(`You are not registered as a ${userType}`, 403)
      );
    }

    // 4) If everything ok, send token to client
    const token = generateToken(user._id.toString());

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verification token
    const decoded = verifyToken(token) as { id: string };

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists.', 401)
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    (req as any).user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo = (...userTypes: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!userTypes.includes((req as any).user.userType)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};