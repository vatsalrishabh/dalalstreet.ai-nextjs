// types/auth.d.ts
export interface BackendUser {
  uid: string;
  email: string;
  phone_number: string | null;
  credits: number;
   userName: string;
  userDpUrl: string;
  premium_expiry_date?: string | null; // Optional, if your backend provides it
}
