import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/shared/types';
import { getAuthUser, clearAuthUser } from './authUtils';

interface AuthState {
  user: AuthUser | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: getAuthUser(),
  isAuth: !!getAuthUser(),
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
      clearAuthUser();
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;