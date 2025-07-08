// store/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackendUser } from '@/types/auth';

interface AuthState {
  user: BackendUser | null;
  token: string | null;
  isAuthenticated: boolean;

}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}; // in the begining it will be like this user will have uid,name,dpUrl,credits etc

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: BackendUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; // ✅ REQUIRED!
