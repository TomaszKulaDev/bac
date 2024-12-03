// src/store/slices/authSlice.ts
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { UserBasicInfo, AuthState } from "../../types/auth";
import { RootState } from "../store";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: UserBasicInfo }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const selectUser = createSelector(
  [(state: RootState) => state.auth],
  (auth) => auth.user
);

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
