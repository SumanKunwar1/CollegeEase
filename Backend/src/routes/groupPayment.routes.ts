// routes/groupPaypal.routes.ts
import express from 'express';
import { createGroupOrder, captureGroupPayment } from '../controllers/groupPayment.controller';
import asyncHandler from '../utils/paymentHandler';

const router = express.Router();

// Group PayPal routes
router.post('/group-paypal/create-order', asyncHandler(createGroupOrder));
router.post('/group-paypal/capture-payment', asyncHandler(captureGroupPayment));

export default router;