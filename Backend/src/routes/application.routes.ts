import express from 'express';
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  downloadDocuments,
  downloadSelectedDocuments
} from '../controllers/application.controller';
import { upload } from '../middlewares/multer.middleware';

const router = express.Router();

router.post('/:collegeName', 
  upload.any(), // Changed from fields() to any() to handle dynamic fields
  submitApplication
);

router.get('/:collegeName', getApplications);
router.put('/:id', updateApplicationStatus);
router.get('/:id/download', downloadDocuments);
router.post('/:id/download-selected', downloadSelectedDocuments);

export default router;