'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import googlelogo from '@/assets/logo/googlelogo.webp';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/store/redux/slices/authSlice';
import { clearAuthFromLocalStorage } from '@/middleware/localStorage/authMiddleware';
import { RootState } from '@/store/redux/store';
import { BackendUser } from '@/types/auth';
import { initiateGoogleOAuth } from '@/services/authService'; // custom api for login
import { LogOut, User, Mail, Coins, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'animate.css';
import '@/firebase/config';
import { toast } from 'react-toastify';

const SignupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [user ] = useState(useSelector((state: RootState) => state.auth.user));

  // Restore user from localStorage on initial load
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userDetails = localStorage.getItem('userDetails');

      if (token && userDetails) {
        const parsedUser: BackendUser = JSON.parse(userDetails);

        // Validate essential fields before dispatch
        // console.log(parsedUser)
        if (parsedUser?.uid && parsedUser?.email) {
          dispatch(login({ user: parsedUser, token }));
        }
      }
    } catch (err) {
      console.error('Failed to restore user from localStorage', err);
    }
  }, [dispatch]);

  const handleLogout = () => {
    clearAuthFromLocalStorage();
    dispatch(logout());
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();

      const response = await initiateGoogleOAuth(token); // custom backend API
      console .log('Login response:', response);
      const { uid, email, phone_number, credits, premium_expiry_date } = response.data;

      const userName = firebaseUser.displayName || '';
      const userDpUrl = firebaseUser.photoURL || '';

      const backendUser: BackendUser = {
        uid,
        email,
        phone_number,
        credits: credits ?? 0,
        userName,
        userDpUrl,
        premium_expiry_date: premium_expiry_date ?? null,
      };

      // Save to Redux
      dispatch(login({ user: backendUser, token }));

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userDetails', JSON.stringify(backendUser));

      setIsOpen(false);
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Login failed. Please try again.');
    
    } finally {
      setLoading(false);
      toast.success('Login successful!');
    }
  };

  return (
    <>
      {/* Avatar or Login Button */}
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-ghost px-2 rounded-full hover:bg-base-200 transition-transform hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <Image
                src={user.userDpUrl}
                alt={user.userName}
                width={36}
                height={36}
                className="rounded-full border-2 border-primary shadow-md"
              />
              <span className="text-sm font-semibold hidden sm:inline">
                {user.userName?.slice(0, 7)}...
              </span>
            </div>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content z-[100] mt-2 p-3 w-72 menu shadow-xl bg-base-100 border border-base-200 rounded-xl space-y-2 animate__animated animate__fadeIn"
          >
            <li className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{user.userName}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary" />
              <span className="text-sm truncate">{user.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">{user.credits} Credits</span>
            </li>
            {user.premium_expiry_date && (
              <li className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="text-sm">
                  Premium till {new Date(user.premium_expiry_date).toLocaleDateString()}
                </span>
              </li>
            )}
            <li className="pt-2 border-t border-base-300 mt-2">
              <button
                className="btn btn-error btn-sm w-full flex items-center gap-2 text-sm font-medium hover:scale-[1.03] transition-transform"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary btn-sm rounded-md px-4"
          onClick={() => setIsOpen(true)}
        >
          Sign Up / Login
        </motion.button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.dialog
            open
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="modal modal-open z-50"
          >
            <motion.div
              className="modal-box relative max-w-md p-8 bg-base-100 text-base-content shadow-2xl rounded-2xl animate__animated animate__zoomIn"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="text-center space-y-2">
                <h1 className="text-3xl font-extrabold text-primary animate__animated animate__fadeInDown">
                  Welcome to DalalStreet.ai
                </h1>
                <p className="text-gray-500 text-sm animate__animated animate__fadeIn animate__delay-1s">
                  Log in to unlock personalized insights & portfolios.
                </p>
              </div>

              <motion.button
                onClick={handleGoogleSignup}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-4 py-3 px-5 mt-6 text-md font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <Image src={googlelogo} alt="Google logo" width={24} height={24} />
                {loading ? 'Redirecting...' : 'Continue with Google'}
              </motion.button>
            </motion.div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignupModal;
