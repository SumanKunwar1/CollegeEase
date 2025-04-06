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

    if (!groupSessionId || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const groupSession = await GroupSession.findById(groupSessionId);
    if (!groupSession) {
      return res.status(404).json({ 
        success: false,
        error: 'Group session not found' 
      });
    }

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

    const payment = await GroupPayment.create({
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

    return res.json({ 
      success: true,
      orderId: payment.orderId,
      amount: payment.amount
    });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to create PayPal order' 
    });
  }
};

export const captureGroupPayment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ 
        success: false,
        error: 'Order ID is required' 
      });
    }

    const payment = await GroupPayment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ 
        success: false,
        error: 'Payment not found' 
      });
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
      paymentId: payment.paymentId,
      amount: payment.amount,
      message: 'Payment successfully captured'
    });

  } catch (error) {
    console.error('PayPal capture error:', error);
    
    await GroupPayment.findOneAndUpdate(
      { orderId: req.body.orderId },
      { status: 'failed' }
    );

    return res.status(500).json({ 
      success: false,
      error: 'Payment capture failed',
      message: 'The payment could not be processed'
    });
  }
};

export const verifyGroupPayment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { paymentId, orderId } = req.query;

    if (!paymentId || !orderId) {
      return res.status(400).json({
        success: false,
        error: 'Missing paymentId or orderId parameters'
      });
    }

    const payment = await GroupPayment.findOne({
      paymentId,
      orderId,
      status: 'completed'
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found or not completed'
      });
    }

    return res.json({
      success: true,
      payment: {
        id: payment._id,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Payment verification failed'
    });
  }
};