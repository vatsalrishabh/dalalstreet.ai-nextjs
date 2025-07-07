'use client';

import React, { useState } from 'react';
import { initiateGoogleOAuth } from '@/services/authService';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '@/firebase/config'; // 

const SignupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();
       console.log("printing token")
      console.log(token)
      const results = await initiateGoogleOAuth(token); // call the fastapi backend to receive the users credentials 
      console.log(result)
       console.log("printing token")
      console.log(results)
     
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Try again.');
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={() => setIsOpen(true)}>
        Sign Up / Login
      </button>

      {isOpen && (
        <dialog open className="modal modal-open z-50">
          <div className="modal-box relative max-w-md p-8 bg-base-100 text-base-content shadow-lg rounded-xl">
            {/* ❌ Close Icon */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
              disabled={loading}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 🧠 Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-extrabold mb-2">Welcome to DalalStreet.ai</h1>
              <p className="text-gray-500 text-sm mb-6">
                Log in or sign up to access insights, portfolios, and more.
              </p>
            </div>

            {/* ✅ Google Login Button */}
            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 py-3 px-5 text-lg font-medium border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google logo"
                className="w-6 h-6"
              />
              {loading ? 'Redirecting...' : 'Continue with Google'}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default SignupModal;
