"use client";
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
        console.warn("🚫 User not found — logging out");
        dispatch(logout());
        clearAuthFromLocalStorage();
      }
    });

    // 🔁 Check every 5 minutes if the token is expired
    const tokenCheckInterval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          const expTime = new Date(tokenResult.expirationTime).getTime();
          const now = Date.now();

          if (now > expTime) {
            console.warn("⚠️ Token expired — logging out");
            dispatch(logout());
            clearAuthFromLocalStorage();
          }
        } catch (err) {
          console.error("Token check failed", err);
        }
      }
    }, 5 * 60 * 1000); // every 5 minutes

    return () => {
      unsubscribe();
      clearInterval(tokenCheckInterval);
    };
  }, [dispatch]);

  return null;
}
