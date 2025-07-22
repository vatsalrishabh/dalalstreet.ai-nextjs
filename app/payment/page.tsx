'use client'
import React from 'react'
import PaymentPage from './PaymentPage'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';
import Loader from '@/components/common/Loader';
import DaisyNavbar from '@/components/common/Navbar/DaisyNavbar';



const page = () => {
    const auth = useSelector((state: RootState) => state.auth);

    
  // if (!auth || !auth.user || !auth.token) {
  //   return <Loader/>; // Or redirect logic
  // }

  return (
    <div>
      <DaisyNavbar/>
      <PaymentPage/>
    </div>
  )
}

export default page
