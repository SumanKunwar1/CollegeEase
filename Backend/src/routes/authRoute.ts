import express from 'express';
import {
  signup,
  login,
  protect,
  restrictTo,
  uploadSupportDocs,
} from '../controllers/authcontroller';

const router = express.Router();

router.post('/signup', uploadSupportDocs, signup);
router.post('/login', login);

export default router;