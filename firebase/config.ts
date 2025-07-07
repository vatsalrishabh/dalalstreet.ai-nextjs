// src/firebase/config.ts
import { initializeApp, getApps } from 'firebase/app';

// ✅ First, validate env variables
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
  throw new Error('Missing Firebase environment variables in your frontend ENV files');
}

// ✅ Then use them
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
};

// ✅ Initialize only once
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
