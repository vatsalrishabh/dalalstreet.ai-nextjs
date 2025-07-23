'use client';
import React, { useEffect, useState } from 'react';
import PaymentCard from './PaymentCard';
import { createOrder } from '@/services/paymentService';

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const packages = [
  {
    title: 'Trial Pack',
    amount: 20,
    features: ['5 Queries', 'Basic Filters'],
  },
  {
    title: 'Weekly Pack',
    amount: 400,
    features: [
      'Unlimited Queries',
      'Technical Indicators (RSI, MACD)',
      'Save Filters',
    ],
  },
  {
    title: 'Monthly Pack',
    amount: 1200,
    features: [
      'Unlimited Queries',
      'Technical Indicators (RSI, MACD)',
      'Save Filters',
    ],
  },
];

const PaymentPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (amount: number) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    try {
      if (!token) {
        alert('User not authenticated.');
        return;
      }

      const orderId = await createOrder(amount, token);
      console.log('Order ID:', orderId);

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || '',
        amount: orderId.amount, // should be in paise
        currency: 'INR',
        name: 'DalalStreet.ai',
        description: 'Payment for DalalStreet.ai Plan',
        order_id: orderId.order_id,
        handler: (response: RazorpayPaymentResponse) => {
          console.log('Payment successful:', response);
        },
        prefill: {
          name: 'Vatsal Rishabh',
          email: 'vatsalrishabh00@gmail.com',
          contact: '1234567890',
        },
        theme: {
          color: '#FF6A00',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment initiation error:', err);
      alert('Failed to initiate payment');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-base-content mb-8">
        Choose Your Plan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <PaymentCard
            key={idx}
            title={pkg.title}
            amount={pkg.amount}
            features={pkg.features}
            onClick={() => initiatePayment(pkg.amount)}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;
