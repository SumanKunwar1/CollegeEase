import express from 'express';
import { createResourceRequest, getResourceRequests } from '../controllers/resourceRequest.controller';

const router = express.Router();

router.post('/', createResourceRequest);
router.get('/', getResourceRequests);

export default router;