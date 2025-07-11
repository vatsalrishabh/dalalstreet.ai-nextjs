"use client"
import { useEffect } from "react";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "@/store/redux/slices/authSlice";
import { clearAuthFromLocalStorage } from "@/middleware/localStorage/authMiddleware";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        // Token expired or user signed out
        dispatch(logout());
        clearAuthFromLocalStorage();
        console.warn("🔒 Logged out due to expired or invalid token.");
      } else {
        // const token = await user.getIdToken(); // You can optionally re-store a fresh token
        
      }
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [dispatch]);

  return null;
}
