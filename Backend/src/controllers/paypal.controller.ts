import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import Payment from '../models/payment.model';
import dotenv from 'dotenv';

dotenv.config();

const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

// Define PayPal API response types
interface PayPalAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface PayPalOrderResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

interface PayPalCaptureResponse {
  id: string;
  status: string;
  purchase_units: Array<{
    payments: {
      captures: Array<{
        id: string;
        status: string;
      }>;
    };
  }>;
}

// Helper to get PayPal access token
const getPayPalAccessToken = async (): Promise<string> => {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const response: AxiosResponse<PayPalAccessTokenResponse> = await axios.post(
    `${PAYPAL_API_BASE}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

// Create PayPal order
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { amount, studentProfileId, donorEmail, donorName, isAnonymous } = req.body;

    const accessToken = await getPayPalAccessToken();
    const response: AxiosResponse<PayPalOrderResponse> = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount.toString(),
          },
          description: `Education Donation`,
        }],
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Save payment record
    await Payment.create({
      orderId: response.data.id,
      studentProfileId,
      amount,
      donorEmail,
      donorName: isAnonymous ? undefined : donorName,
      isAnonymous,
      paymentMethod: 'paypal',
      status: 'pending'
    });

    return res.json({ orderId: response.data.id });

  } catch (error) {
    console.error('PayPal create order error:', error);
    return res.status(500).json({ error: 'Failed to create PayPal order' });
  }
};

// Capture PayPal payment
export const capturePayment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { orderId } = req.body;

    // Verify payment exists
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const accessToken = await getPayPalAccessToken();
    const response: AxiosResponse<PayPalCaptureResponse> = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Update payment record
    payment.paymentId = response.data.id;
    payment.status = 'completed';
    await payment.save();

    return res.json({ 
      success: true, 
      paymentId: response.data.id,
      amount: payment.amount
    });

  } catch (error) {
    console.error('PayPal capture error:', error);
    
    // Update payment as failed
    await Payment.findOneAndUpdate(
      { orderId: req.body.orderId },
      { status: 'failed' }
    );

    return res.status(500).json({ error: 'Payment capture failed' });
  }
};