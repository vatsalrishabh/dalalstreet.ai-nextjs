import React from 'react';
import { FaRupeeSign, FaCheckCircle } from 'react-icons/fa';

interface PaymentCardProps {
  title: string;
  amount: number;
  features?: string[];
  onClick: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ title, amount, features = [], onClick }) => {
  return (
    <div
      className="card bg-base-100 shadow-xl hover:scale-[1.03] transition-transform duration-300 border border-base-300"
    >
      <div className="card-body items-center text-center p-6">
        <h2 className="card-title text-2xl text-base-content">{title}</h2>

        <div className="text-3xl text-primary font-bold mt-2 flex items-center justify-center">
          <FaRupeeSign className="mr-1" />
          {amount}
          <span className="text-sm text-base-content ml-1 font-normal">/mo</span>
        </div>

        <ul className="text-left mt-4 space-y-2 w-full max-w-xs text-base-content/80">
          {features.length > 0 ? (
            features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <FaCheckCircle className="text-success" /> {feature}
              </li>
            ))
          ) : (
            <li className="text-sm text-base-content/60 italic">No features listed</li>
          )}
        </ul>

        <div className="card-actions mt-6">
          <button onClick={onClick} className="btn btn-primary w-full">
            Get This Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
