import express, { RequestHandler } from 'express';
import { getAllRegisteredUsers, exportUsersToExcel } from '../controllers/admin.signin.controller';

const router = express.Router();

// Type-safe route definitions
router.get('/registered-users', getAllRegisteredUsers as RequestHandler);
router.get('/export-users', exportUsersToExcel as RequestHandler);

// Alternative with explicit typing (if you prefer)
// const registeredUsersHandler: RequestHandler = (req, res, next) => {
//   return getAllRegisteredUsers(req, res).catch(next);
// };
// router.get('/registered-users', registeredUsersHandler);

export default router;