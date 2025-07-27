// types/loginApiResponse.ts
export interface LoginResponse {
  uid: string;
  email: string;
  phone_number: string | null;
  credits: number;
  premium_expiry_date: string; // or Date if you parse it
}
