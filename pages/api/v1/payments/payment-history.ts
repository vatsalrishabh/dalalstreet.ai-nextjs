import type { NextApiRequest, NextApiResponse } from 'next';

const mockPayments = [
  {
    id: '1',
    plan: 'Basic',
    amount: 2000,
    currency: 'INR',
    paymentId: 'pay_abc123',
    orderId: 'order_abc123',
    date: new Date().toLocaleString(),
    status: 'success',
    signature: 'mocked_signature_1',
  },
  {
    id: '2',
    plan: 'Weekly Unlimited',
    amount: 40000,
    currency: 'INR',
    paymentId: 'pay_def456',
    orderId: 'order_def456',
    date: new Date().toLocaleString(),
    status: 'success',
    signature: 'mocked_signature_2',
  },
  {
    id: '3',
    plan: 'Monthly Unlimited',
    amount: 120000,
    currency: 'INR',
    paymentId: 'pay_ghi789',
    orderId: 'order_ghi789',
    date: new Date().toLocaleString(),
    status: 'failed',
    signature: 'mocked_signature_3',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // In real implementation, check auth and fetch from DB
  res.status(200).json({ payments: mockPayments });
} 