// controllers/groupPaypal.controller.ts
import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import GroupPayment from '../models/groupPayment.model';
import GroupSession from '../models/groupSession.model';
import dotenv from 'dotenv';

dotenv.config();

const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

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

export const createGroupOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { groupSessionId, firstName, lastName, email, phone } = req.body;

    const groupSession = await GroupSession.findById(groupSessionId);
    if (!groupSession) {
      return res.status(404).json({ error: 'Group session not found' });
    }

    // Convert price to number (remove $ if present)
    const amount = Number(groupSession.price.replace(/[^0-9.-]+/g, ""));

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
          description: `Registration for ${groupSession.title}`,
        }],
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    await GroupPayment.create({
      orderId: response.data.id,
      groupSessionId,
      title: groupSession.title,
      firstName,
      lastName,
      email,
      phone,
      amount,
      paymentMethod: 'paypal',
      status: 'pending'
    });

    return res.json({ orderId: response.data.id });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return res.status(500).json({ error: 'Failed to create PayPal order' });
  }
};

export const captureGroupPayment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { orderId } = req.body;

    const payment = await GroupPayment.findOne({ orderId });
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
    
    await GroupPayment.findOneAndUpdate(
      { orderId: req.body.orderId },
      { status: 'failed' }
    );

    return res.status(500).json({ error: 'Payment capture failed' });
  }
};