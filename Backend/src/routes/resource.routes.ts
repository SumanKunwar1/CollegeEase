import express from 'express';
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource
} from '../controllers/resource.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/', asyncHandler(createResource));
router.get('/', asyncHandler(getAllResources));
router.get('/:id', asyncHandler(getResourceById));
router.put('/:id', asyncHandler(updateResource));
router.delete('/:id', asyncHandler(deleteResource));

export default router;