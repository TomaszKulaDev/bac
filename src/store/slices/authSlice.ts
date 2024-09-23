// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Modyfikacja interfejsu AuthState
interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string | null | undefined;
    name: string | null | undefined;
    role: string | null | undefined;
    // Dodajemy pole image, które może być obecne w sesji Next.js Auth
    image?: string | null;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    // Nowa akcja do aktualizacji stanu na podstawie sesji
    updateSession: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, updateSession } = authSlice.actions;
export default authSlice.reducer;
