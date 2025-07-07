// types/auth.d.ts
export interface BackendUser {
  uid: string;
  email: string;
  phone_number: string | null;
  credits: number;
}
