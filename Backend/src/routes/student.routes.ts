import express from 'express';
import { registerStudent, getStudentDashboard } from '../controllers/student.controller';
import { handleFileUpload } from '../middlewares/studentUpload.middleware';

const router = express.Router();

router.post('/register', handleFileUpload, registerStudent);
router.get('/dashboard/:id', getStudentDashboard);

export default router;