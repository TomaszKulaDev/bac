// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DancePreferences {
  styles: string[];
  level: string;
  availability: string;
  location: string;
}

export interface UserBasicInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  dancePreferences?: {
    styles: string[];
    level: string;
    availability: string;
    location: string;
  };
  age?: number;
}

interface AuthState {
  user: UserBasicInfo | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: UserBasicInfo }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<Partial<UserBasicInfo>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
