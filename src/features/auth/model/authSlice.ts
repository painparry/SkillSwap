import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/shared/types';
import { getAuthUser, clearAuthUser } from './authUtils';

interface AuthState {
  user: AuthUser | null;
  isAuth: boolean;
}

const storedUser = getAuthUser();

const initialState: AuthState = {
  user: storedUser,
  isAuth: storedUser !== null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      clearAuthUser();
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;