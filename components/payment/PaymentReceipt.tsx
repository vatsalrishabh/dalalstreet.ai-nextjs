import React, { useRef } from 'react';

interface Payment {
  id: string;
  plan: string;
  amount: number;
  currency: string;
  paymentId: string;
  orderId: string;
  date: string;
  status: string;
  signature?: string;
}

interface PaymentReceiptProps {
  payment: Payment;
}

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ payment }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div ref={receiptRef} className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-base-300 animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">Payment Receipt</h2>
        <div className="mb-4 text-base-content">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Plan:</span>
            <span>{payment.plan}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Amount:</span>
            <span>{payment.currency} {(payment.amount / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Payment ID:</span>
            <span>{payment.paymentId}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order ID:</span>
            <span>{payment.orderId}</span>
          </div>
          {payment.signature && (
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Signature:</span>
              <span className="truncate max-w-[120px]">{payment.signature}</span>
            </div>
          )}
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Date:</span>
            <span>{payment.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Status:</span>
            <span className={`badge ${payment.status === 'success' ? 'badge-success' : 'badge-error'}`}>{payment.status}</span>
          </div>
        </div>
        <div className="flex gap-4 justify-center mt-6">
          <button className="btn btn-primary" onClick={handlePrint}>Print</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt; 