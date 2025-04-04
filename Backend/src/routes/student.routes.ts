import express from 'express';
import { 
  registerStudent, 
  getStudentDashboard, 
  loginStudent 
} from '../controllers/student.controller';
import { handleFileUpload } from '../middlewares/studentUpload.middleware';

const router = express.Router();

router.post('/register', handleFileUpload, registerStudent);
router.get('/dashboard/:name', getStudentDashboard);
router.post('/login', loginStudent);

export default router;