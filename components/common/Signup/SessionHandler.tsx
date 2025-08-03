// components/SessionHandler.tsx
'use client';

import { useEffect, useState } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login, logout, rehydrate } from '@/store/redux/slices/authSlice';
import { BackendUser } from '@/types/auth';
import '@/firebase/config';

const SessionHandler = () => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Rehydrate from localStorage on client side
    dispatch(rehydrate());
  }, [dispatch]);

  useEffect(() => {
    if (!isClient) return;

    const auth = getAuth();

    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(); // auto-refreshes if expired
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (token !== tokenFromLocalStorage) {
          localStorage.setItem('token', token);
        }
        const userDetails: BackendUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          phone_number: firebaseUser.phoneNumber || '',
          credits: 0, // optionally fetch from your backend again
          userName: firebaseUser.displayName || '',
          userDpUrl: firebaseUser.photoURL || '',
        };

        dispatch(login({ user: userDetails, token }));
        localStorage.setItem('token', token);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch, isClient]);

  return null;
};

export default SessionHandler;
