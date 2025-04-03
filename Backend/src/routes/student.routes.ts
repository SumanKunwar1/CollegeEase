import express from 'express';
import { registerStudent } from '../controllers/student.controller';
import { handleFileUpload, cleanupUploads } from '../middlewares/studentUpload.middleware';

const router = express.Router();

router.post('/register', 
  handleFileUpload,
  cleanupUploads,
  registerStudent
);

export default router;