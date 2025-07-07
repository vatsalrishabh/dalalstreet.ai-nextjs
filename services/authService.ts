// /src/services/authService.ts
import api from "@/lib/api"; // the custom api which we made



// @hit- /api/v1/login        {Content-Type}
//method - 
//access - users
export const initiateGoogleOAuth = (firebaseIdToken: string) => {
  return api.post(
   `${process.env.NEXT_PUBLIC_Base_URL}/api/v1/login`,
    {}, // no body needed, unless your backend expects it
    {
      headers: {
        Authorization: `Bearer ${firebaseIdToken}`,
      },
    }
  );
};


// @hit- /api/v1/login        {Content-Type}
//method - 
//access - users
export const logout = async () => {
  return api.post('/logout');
};

export const getUserProfile = async () => {
  return api.get('/me'); // Example: Get logged-in user info
};
