import React from 'react';

interface Payment {
  id: string;
  plan: string;
  amount: number;
  currency: string;
  paymentId: string;
  orderId: string;
  date: string;
  status: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  return (
    <div className="overflow-x-auto w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">Payment History</h2>
      <table className="table w-full bg-base-200 rounded-xl shadow">
        <thead>
          <tr className="bg-base-300 text-base-content">
            <th>Date</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-base-content/60">No payments found.</td>
            </tr>
          ) : (
            payments.map((p) => (
              <tr key={p.id} className="hover:bg-base-100 transition">
                <td>{p.date}</td>
                <td>{p.plan}</td>
                <td>{p.currency} {(p.amount / 100).toFixed(2)}</td>
                <td>
                  <span className={`badge ${p.status === 'success' ? 'badge-success' : 'badge-error'}`}>{p.status}</span>
                </td>
                <td>
                  <a href={`/payment/receipt/${p.id}`} className="btn btn-xs btn-outline btn-primary">View</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory; 