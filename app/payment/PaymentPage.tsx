import React from 'react';
import PaymentCard from './PaymentCard';
import { createOrder } from '@/services/paymentService';

const packages = [
  {
    title: 'Trial Pack',
    amount: 20,
    features: ['5 Queries', 'Chat Support', 'Email Summary'],
  },
  {
    title: 'Weekly Pack',
    amount: 400,
    features: ['Unlimited Queries', 'Priority Support', 'Download Reports'],
  },
  {
    title: 'Monthly Pack',
    amount: 1200,
    features: ['Unlimited Queries', 'Video Calls', 'Doctor Recommendations'],
  },
];

const PaymentPage: React.FC = () => {
  const token = localStorage.getItem('token'); // Assumes token is stored here

  const loadRazorpayScript = () => {
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

      const { orderId } = await createOrder(amount, token);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Replace with actual key
        amount: amount * 100, // in paise
        currency: 'INR',
        name: 'DalalStreet.ai',
        description: 'Payment for DalalStreet.ai Plan',
        order_id: orderId,
        handler: (response: any) => {
          console.log('Payment successful:', response);
          // Optional: send response.razorpay_payment_id etc. to backend for verification
        },
        prefill: {
          name: 'Vatsal Rishabh',
          email: 'vatsalrishabh00@gmail.com',
        },
        theme: {
          color: '#FF6A00',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment initiation error:', err);
      alert('Failed to initiate payment');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-base-content mb-8">Choose Your Plan</h1>
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
