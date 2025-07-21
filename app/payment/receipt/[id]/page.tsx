import React from 'react';
import PaymentReceipt from '@/components/payment/PaymentReceipt';

// Mock function to fetch payment by ID (replace with real API call)
async function getPaymentById(id: string) {
  // TODO: Replace with real API call
  return {
    id,
    plan: 'Monthly Unlimited',
    amount: 120000,
    currency: 'INR',
    paymentId: 'pay_1234567890',
    orderId: 'order_1234567890',
    date: new Date().toLocaleString(),
    status: 'success',
    signature: 'mocked_signature',
  };
}

export default async function ReceiptPage({ params }: { params: { id: string } }) {
  const payment = await getPaymentById(params.id);
  return <PaymentReceipt payment={payment} />;
} 