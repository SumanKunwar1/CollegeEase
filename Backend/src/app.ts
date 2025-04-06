import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
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
import virtualTourRouter from './routes/virtualTour.routes';
import aboutUsRoutes from './routes/aboutUs.routes';
import scholarshipRouter from './routes/scholarship.routes';
import scholarshipApplicationRouter from './routes/scholarshipApplication.routes';
import successStoryRouter from './routes/successStory.routes';
import studentRouter from './routes/student.routes';
import studentProfileRouter from './routes/studentProfile.routes';
import paymentRouter from './routes/paypal.routes';
import donationSuccessStoryRouter from './routes/donationSuccessStory.routes';
import mentorRouter from './routes/mentor.routes';






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


app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  next();
});


// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Static files
app.use('/uploads', express.static(uploadsDir));



// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/admin/colleges', collegeRouter);
app.use('/api/v1/college-details', collegeDetailsRouter);
app.use('/api/v1/applications', applicationRouter);
app.use('/api/v1/search-compare', searchCompareRouter);
app.use('/api/v1/virtual-tours', virtualTourRouter);
app.use('/api/v1/aboutus', aboutUsRoutes);
app.use('/api/v1', scholarshipRouter);
app.use('/api/v1/scholarship-applications', scholarshipApplicationRouter);
app.use('/api/v1/success-stories', successStoryRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/student-profiles', studentProfileRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/donation-success-stories', donationSuccessStoryRouter);
app.use('/api/v1/mentors', mentorRouter);



// Error handling
app.use(errorHandler);

app.use((req, res, next) => {
  console.log('Request body size:', req.socket.bytesRead);
  next();
});

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