import express from 'express';
import { 
  registerStudent, 
  getStudentDashboard, 
  loginStudent,
  getAllStudents,
  updateStudentStatus,
  deleteStudents
} from '../controllers/student.controller';
import { handleFileUpload } from '../middlewares/studentUpload.middleware';

const router = express.Router();

router.post('/register', handleFileUpload, registerStudent);
router.get('/dashboard/:name', getStudentDashboard);
router.post('/login', loginStudent);
router.get('/', getAllStudents);
router.patch('/update-status', updateStudentStatus);
router.delete('/', deleteStudents);

export default router;