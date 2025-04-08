import express from 'express';
import { createSupportRequest, getSupportRequests } from '../controllers/supportRequest.controller';

const router = express.Router();

router.route('/')
  .post(createSupportRequest)
  .get(getSupportRequests);

export default router;