import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import errorHandler from './middlewares/errorHandler';
import authRouter from './routes/authRoute';
import connectDB from './config/db';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.signin.route';
import collegeRouter from './routes/admin/college.routes';
import detailsRouter from './routes/college/details.routes';
import collegeDetailsRouter from './routes/collegeDetails.routes';
import applicationRouter from './routes/application.routes';
import searchCompareRouter from './routes/searchCompare.routes'; 



dotenv.config();

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/admin/colleges', collegeRouter);
app.use('/api/v1/college-details', collegeDetailsRouter);
app.use('/api/v1/college-details', collegeDetailsRouter);
app.use('/api/v1/applications', applicationRouter);
app.use('/api/v1/search-compare', searchCompareRouter);

// Error handling
app.use(errorHandler);

// Database connection
connectDB().then(() => {
  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Database state: ${mongoose.STATES[mongoose.connection.readyState]}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});

export default app;