'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import googlelogo from '@/assets/logo/googlelogo.webp';
import { initiateGoogleOAuth } from '@/services/authService';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '@/store/redux/slices/authSlice';
import {
  getUserInfoFromLocalStorage,
  persistAuthToLocalStorage,
  clearAuthFromLocalStorage,
} from '@/middleware/localStorage/authMiddleware';
import '@/firebase/config';
import { BackendUser } from '@/types/auth';

// Optional: Icons
import { LogOut, User, Mail, Coins } from 'lucide-react';

const SignupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<{ user: BackendUser; token: string } | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();
    setUserDetails(userInfo);
  }, []);

  const handleLogout = () => {
    clearAuthFromLocalStorage();
    setUserDetails(null);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();
      const results = await initiateGoogleOAuth(token);

      const { uid, email, phone_number, credits } = results.data;
      const userName = firebaseUser.displayName || '';
      const userDpUrl = firebaseUser.photoURL || '';

      const user = { uid, email, phone_number, credits, userName, userDpUrl };
      persistAuthToLocalStorage(user, token);
      setUserDetails({ user, token });

      dispatch(login({ user, token }));
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
      {/* Show dropdown if logged in */}
      {userDetails?.user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost px-2 rounded-full hover:bg-base-200">
            <div className="flex items-center gap-2">
              <Image
                src={userDetails.user.userDpUrl}
                alt={userDetails.user.userName}
                width={36}
                height={36}
                className="rounded-full border-2 border-primary shadow-md"
              />
              <span className="text-sm font-semibold hidden sm:inline">
                {userDetails.user.userName?.slice(0, 7)}...
              </span>
            </div>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content z-[100] mt-2 p-3 w-72 menu shadow-xl bg-base-100 border border-base-200 rounded-xl space-y-2"
          >
            <li className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{userDetails.user.userName}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary" />
              <span className="text-sm truncate">{userDetails.user.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">{userDetails.user.credits} Credits</span>
            </li>
            <li className="pt-2 border-t border-base-300 mt-2">
              <button
                className="btn btn-error btn-sm w-full flex items-center gap-2 text-sm font-medium"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button className="btn btn-primary btn-sm rounded-md px-4" onClick={() => setIsOpen(true)}>
          Sign Up / Login
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <dialog open className="modal modal-open z-50">
          <div className="modal-box relative max-w-md p-8 bg-base-100 text-base-content shadow-2xl rounded-2xl">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
              disabled={loading}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary mb-2">Welcome to DalalStreet.ai</h1>
              <p className="text-gray-500 text-sm mb-6">Log in to unlock personalized insights & portfolios.</p>
            </div>

            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 py-3 px-5 text-md font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Image src={googlelogo} alt="Google logo" width={24} height={24} />
              {loading ? 'Redirecting...' : 'Continue with Google'}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default SignupModal;
