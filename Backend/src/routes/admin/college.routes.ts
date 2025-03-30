import express from 'express';
import {
  createCollege,
  getAllColleges,
  getCollegeByOrganizationName,
  updateCollegeBasicInfo,
  deleteCollege
} from '../../controllers/admin/college.controller';

const router = express.Router();

router.route('/')
  .post(createCollege)
  .get(getAllColleges);

router.route('/:organizationName')
  .get(getCollegeByOrganizationName)
  .put(updateCollegeBasicInfo)
  .delete(deleteCollege);

export default router;