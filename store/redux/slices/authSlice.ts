// store/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackendUser } from '@/types/auth';

interface AuthState {
  user: BackendUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ✅ Fix: Prevent localStorage usage during SSR
let userDetails: BackendUser | null = null;
let token: string | null = null;

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem('userDetails');
  const storedToken = localStorage.getItem('token');
  userDetails = storedUser ? JSON.parse(storedUser) : null;
  token = storedToken ?? null;
}

const initialState: AuthState = {
  user: userDetails,
  token: token,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: BackendUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // ✅ Safe: runs only in browser
      if (typeof window !== "undefined") {
        localStorage.setItem('userDetails', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // ✅ Safe: runs only in browser
      if (typeof window !== "undefined") {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('token');
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
