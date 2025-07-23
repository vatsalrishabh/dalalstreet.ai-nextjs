'use client';

import React from 'react';
import PaymentPage from './PaymentPage';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';

const page: React.FC = () => {
  return (
    <div>
      <DaisyNavbar />
      <PaymentPage />
    </div>
  );
};

export default page;
    