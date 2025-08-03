// store/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackendUser } from '@/types/auth';

interface AuthState {
  user: BackendUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ✅ Fix: Initialize with null values to prevent hydration issues
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
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
        localStorage.clear();
      }
    },
    // Add a new action to rehydrate from localStorage
    rehydrate(state) {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem('userDetails');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          try {
            state.user = JSON.parse(storedUser);
            state.token = storedToken;
            state.isAuthenticated = true;
          } catch (error) {
            console.error('Error parsing stored user data:', error);
            localStorage.clear();
          }
        }
      }
    },
  },
});

export const { login, logout, rehydrate } = authSlice.actions;
export default authSlice.reducer;
