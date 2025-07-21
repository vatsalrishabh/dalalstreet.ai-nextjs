"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";
import { getPaymentHistory } from "@/services/paymentService";
import PaymentHistory from "@/components/payment/PaymentHistory";
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';

export default function PaymentHistoryPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getPaymentHistory(token, 1, 10)
      .then((res) => {
        setPayments(res.data.payments || []);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load payment history.");
        setPayments([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-4">
      <DaisyNavbar />
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">Your Payment History</h1>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error justify-center mb-8">{error}</div>
        ) : (
          <PaymentHistory payments={payments} />
        )}
      </div>
    </div>
  );
} 