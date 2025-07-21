"use client";
import React from "react";
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';
import { createRazorpayOrder } from '@/services/paymentService';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/redux/slices/authSlice";
import { useRef } from 'react';
import Link from 'next/link';

const packages = [
  {
    name: "Basic",
    price: "₹20",
    amount: 20,
    features: [
      "5 queries after free trial",
      "Valid for 7 days",
      "Email support",
    ],
    cta: "Buy Basic",
    highlight: false,
  },
  {
    name: "Weekly Unlimited",
    price: "₹400",
    amount: 400,
    features: [
      "Unlimited queries",
      "Valid for 7 days",
      "Priority support",
    ],
    cta: "Buy Weekly",
    highlight: true,
  },
  {
    name: "Monthly Unlimited",
    price: "₹1200",
    amount: 1200,
    features: [
      "Unlimited queries",
      "Valid for 30 days",
      "Priority support",
    ],
    cta: "Buy Monthly",
    highlight: false,
  },
];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PaymentPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = React.useState<string | null>(null);
  const [receipt, setReceipt] = React.useState<any | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem('userDetails');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        dispatch(login({ user: JSON.parse(storedUser), token: storedToken }));
      }
    }
  }, [dispatch]);

  const handlePrint = () => {
    if (receiptRef.current) {
      const printContents = receiptRef.current.innerHTML;
      const win = window.open('', '', 'height=600,width=400');
      if (win) {
        win.document.write('<html><head><title>Payment Receipt</title>');
        win.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">');
        win.document.write('</head><body >');
        win.document.write(printContents);
        win.document.write('</body></html>');
        win.document.close();
        win.print();
      }
    }
  };

  const handleBuy = async (amount: number, planName: string) => {
    if (!token) {
      alert('You must be logged in to purchase a plan.');
      return;
    }
    setLoading(planName);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Failed to load Razorpay SDK.');
        setLoading(null);
        return;
      }
      const response = await createRazorpayOrder(token, amount);
      const order = response.data;
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        alert('Razorpay key not configured.');
        setLoading(null);
        return;
      }
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'DalalStreet.ai',
        description: planName,
        order_id: order.id,
        handler: function (response: any) {
          setReceipt({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: order.amount,
            currency: order.currency,
            plan: planName,
            date: new Date().toLocaleString(),
          });
        },
        prefill: {},
        theme: { color: '#FF6A00' },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Failed to initiate payment. Please try again.');
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-4">
      <DaisyNavbar />
      <div className="w-full flex justify-end max-w-5xl mb-4">
        <Link href="/payment/history" className="btn btn-outline btn-primary">View Payment History</Link>
      </div>
      <h1 className="text-4xl font-bold text-primary mb-2 text-center">Choose Your Plan</h1>
      <p className="text-base-content/70 mb-10 text-center max-w-xl">
        Unlock the full power of DalalStreet.ai. Pick a plan that fits your needs and start screening smarter today.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`card shadow-xl border border-base-300 bg-base-200 ${pkg.highlight ? "scale-105 border-primary ring-2 ring-primary" : ""} transition-transform`}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl font-bold text-primary mb-2">{pkg.name}</h2>
              <div className="text-3xl font-extrabold mb-4 text-base-content">{pkg.price}</div>
              <ul className="mb-6 space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-base-content">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`btn w-full ${pkg.highlight ? "btn-primary" : "btn-outline btn-primary"} text-base font-semibold`}
                onClick={() => handleBuy(pkg.amount, pkg.name)}
                disabled={loading === pkg.name}
              >
                {loading === pkg.name ? 'Processing...' : pkg.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Receipt Modal */}
      {receipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div ref={receiptRef} className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-base-300 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">Payment Receipt</h2>
            <div className="mb-4 text-base-content">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Plan:</span>
                <span>{receipt.plan}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Amount:</span>
                <span>{receipt.currency} {(receipt.amount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Payment ID:</span>
                <span>{receipt.paymentId}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order ID:</span>
                <span>{receipt.orderId}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Signature:</span>
                <span className="truncate max-w-[120px]">{receipt.signature}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Date:</span>
                <span>{receipt.date}</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-6">
              <button className="btn btn-primary" onClick={handlePrint}>Print</button>
              <button className="btn btn-outline" onClick={() => setReceipt(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 