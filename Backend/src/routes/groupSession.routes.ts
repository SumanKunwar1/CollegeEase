import { Router } from 'express';
import { 
  getAllGroupSessions, 
  getGroupSessionById, 
  createGroupSession, 
  updateGroupSession, 
  deleteGroupSession 
} from '../controllers/groupSession.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getAllGroupSessions));
router.get('/:id', asyncHandler(getGroupSessionById));
router.post('/', asyncHandler(createGroupSession));
router.put('/:id', asyncHandler(updateGroupSession));
router.delete('/:id', asyncHandler(deleteGroupSession));

export default router;