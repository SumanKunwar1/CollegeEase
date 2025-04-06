import express from 'express';
import {
  createDonationSuccessStory,
  getDonationSuccessStories,
} from '../controllers/donationSuccessStory.controller';

const router = express.Router();

// Create a new donation success story
router.post('/', createDonationSuccessStory);

// Get all donation success stories
router.get('/', getDonationSuccessStories);

export default router;