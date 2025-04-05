import express from 'express';
import { createOrder, capturePayment } from '../controllers/paypal.controller';
import asyncHandler from '../utils/paymentHandler';

const router = express.Router();

// PayPal routes
router.post('/paypal/create-order', asyncHandler(createOrder));
router.post('/paypal/capture-payment', asyncHandler(capturePayment));

export default router;