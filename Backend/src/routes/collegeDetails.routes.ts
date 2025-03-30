import express from 'express';
import {
  getCollegeDetails,
  createOrUpdateCollegeDetails,
} from '../controllers/collegeDetails.controller';

const router = express.Router();

router.get('/:organizationName', getCollegeDetails);
router.put('/:organizationName', createOrUpdateCollegeDetails);

export default router;