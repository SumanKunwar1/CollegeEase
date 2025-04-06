import { Router } from 'express';
import {
  getAboutUs,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs
} from '../controllers/aboutUs.controller';

// Create a strongly-typed router
const router: Router = Router();

// Define routes with proper typing
router.get('/', (req, res, next) => {
  Promise.resolve(getAboutUs(req, res))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Promise.resolve(createAboutUs(req, res))
    .catch(next);
});

router.put('/', (req, res, next) => {
  Promise.resolve(updateAboutUs(req, res))
    .catch(next);
});

router.delete('/', (req, res, next) => {
  Promise.resolve(deleteAboutUs(req, res))
    .catch(next);
});

export default router;