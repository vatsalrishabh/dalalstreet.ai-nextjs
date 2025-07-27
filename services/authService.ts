// /src/services/authService.ts
import api from "@/lib/api"; // the custom api which we made
import { LoginResponse } from "@/types/loginApiResponse";




// @hit- /api/v1/auth/login        {Content-Type}
//method - 
//access - users
export const initiateGoogleOAuth = (firebaseIdToken: string):Promise<{data:LoginResponse}> => {
  return api.post(
   `/api/v1/auth/login`,
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
