'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import logo from '@/assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { login } from '@/store/redux/slices/authSlice';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initiateGoogleOAuth } from '@/services/authService';
import { BackendUser } from '@/types/auth';
import '@/firebase/config'; // make sure Firebase is initialized
import { toast } from 'react-toastify';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();

      const response = await initiateGoogleOAuth(token); // call your backend API

      const { uid, email, phone_number, credits, premium_expiry_date } = response.data;
     

      const backendUser: BackendUser = {
        uid,
        email,
        phone_number,
        credits: credits ?? 0,
        userName: firebaseUser.displayName || '',
        userDpUrl: firebaseUser.photoURL || '',
        premium_expiry_date: premium_expiry_date ?? null,
      };

      // Save to Redux
      dispatch(login({ user: backendUser, token }));

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userDetails', JSON.stringify(backendUser));

    } catch (error) {
      console.error('Google Login Failed:', error);
      toast.error('Login failed. Please try again.')
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md p-6 shadow-xl border border-base-300 bg-base-200 text-base-content rounded-[--radius-box] backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_theme(colors.primary.DEFAULT)]">
        <div className="flex flex-col items-center mb-4">
          <Image
            src={logo}
            alt="Dalalstreet.ai Logo"
            width={80}
            height={80}
            className="mb-2 rounded-full border border-base-300 shadow-md"
          />
          <h1 className="text-xl font-bold text-primary tracking-wide mb-1">
            Dalalstreet.ai
          </h1>
          <p className="text-sm text-accent-content mb-2 italic">
            📈 AI-Powered Stock Screener
          </p>
          <h2 className="text-2xl font-semibold text-center">
            Welcome Back
          </h2>
          <p className="text-base-content text-sm text-center mt-1 opacity-80">
            Sign in to screen smarter, faster
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn w-full flex items-center justify-center gap-2 py-3 mt-6 bg-neutral hover:bg-primary/10 text-base-content border border-base-300 hover:border-primary transition duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] rounded-[--radius-selector]"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium">
            {loading ? 'Signing in...' : 'Continue with Google'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
