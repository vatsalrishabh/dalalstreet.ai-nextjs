'use client';
import React, { useEffect, useState } from 'react';
import PaymentCard from './PaymentCard';
import { createOrder } from '@/services/paymentService';
import { initiateGoogleOAuth } from '@/services/authService';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '@/store/redux/slices/authSlice'; // update as per your actual path
import { BackendUser } from '@/types/auth';
import {toast} from 'react-toastify';

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
  const dispatch = useDispatch();

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
      toast.error('Razorpay SDK failed to load.');
      return;
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
    if (!razorpayKey) {
      console.error('❌ Razorpay key missing in env vars');
      toast.error('Payment service not configured. Please try again later.');
      return;
    }

    try {
      let authToken = token; // first from state which is bring it from localStorage

      // If user is not logged in, sign them in
      if (!authToken) {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const firebaseUser = result.user;
        authToken = await firebaseUser.getIdToken();
        localStorage.setItem('token', authToken);
      }

      const orderId = await createOrder(amount, authToken);
  

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: orderId.amount, // in paise
        currency: 'INR',
        name: 'DalalStreet.ai',
        description: 'Payment for DalalStreet.ai Plan',
        order_id: orderId.order_id,
        handler: async (response: RazorpayPaymentResponse) => {
      

          try {
            if (!authToken) return;

            const userData = await initiateGoogleOAuth(authToken);
            const { uid, email, phone_number, credits , premium_expiry_date} = userData.data;
            const firebaseUser = getAuth().currentUser;

            const backendUser: BackendUser = {
              uid,
              email,
              phone_number,
              credits,
              userName: firebaseUser?.displayName || '',
              userDpUrl: firebaseUser?.photoURL || '',
             premium_expiry_date,
            };

            dispatch(login({ user: backendUser, token: authToken }));
            localStorage.setItem('userDetails', JSON.stringify(backendUser));
            localStorage.setItem('token', authToken);
            setToken(authToken);
            toast.success('Payment successful!');
            window.location.href = '/home'; // Redirect to home or any other page
          } catch (e) {
            console.error('❌ Error updating user after payment', e);
          }
        },
        prefill: {
          name: 'Vatsal Rishabh',
          email: 'vatsalrishabh00@gmail.com',
          contact: '1234567890',
        },
        theme: {
          color: '#00aa76', // primary green
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Payment initiation error:', err);
      toast.error('Failed to initiate payment. Please try again.');
     
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
