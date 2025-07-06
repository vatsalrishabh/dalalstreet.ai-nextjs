// /src/services/authService.ts
import api from "@/lib/api"; // the custom api which we made


export const initiateGoogleOAuth = () => {
  // This is usually a redirect
  window.location.href = `${process.env.NEXT_PUBLIC_Base_URL}/api/vi/login`; 
};

export const logout = async () => {
  return api.post('/logout');
};

export const getUserProfile = async () => {
  return api.get('/me'); // Example: Get logged-in user info
};
