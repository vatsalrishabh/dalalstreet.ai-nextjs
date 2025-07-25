// components/SessionHandler.tsx
'use client';

import { useEffect } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/store/redux/slices/authSlice';
import { BackendUser } from '@/types/auth';

const SessionHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(); // auto-refreshes if expired
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
  }, [dispatch]);

  return null;
};

export default SessionHandler;
