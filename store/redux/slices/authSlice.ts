// store/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackendUser } from '@/types/auth';

interface AuthState {
  user: BackendUser | null;
  token: string | null;
  isAuthenticated: boolean;

}

const userDetails = localStorage.getItem('userDetails');
const token = localStorage.getItem('token');

const initialState: AuthState = {
  user: userDetails ? (JSON.parse(userDetails) as BackendUser) : null,
  token: token ?? null,
  isAuthenticated: !!token,
};

 // in the begining it will be like this user will have uid,name,dpUrl,credits etc

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: BackendUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

        // persist in localStorage
  localStorage.setItem('userDetails', JSON.stringify(action.payload.user));
  localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

       localStorage.removeItem('userDetails');
  localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; // ✅ REQUIRED!
