// src/store/slices/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfejs reprezentujący stan uwierzytelniania
interface AuthState {
  // Flaga wskazująca, czy użytkownik jest uwierzytelniony
  isAuthenticated: boolean;
  // Obiekt reprezentujący dane użytkownika
  user: {
    id: string; // ID użytkownika
    email: string | null | undefined; // Email użytkownika, może być null lub undefined
    name: string | null | undefined; // Nazwa użytkownika, może być null lub undefined
    role: string | null | undefined; // Rola użytkownika, może być null lub undefined
  } | null; // Użytkownik może być null, jeśli nie jest uwierzytelniony
}

// Początkowy stan uwierzytelniania
const initialState: AuthState = {
  isAuthenticated: false, // Domyślnie użytkownik nie jest uwierzytelniony
  user: null, // Brak danych użytkownika w początkowym stanie
};

// Tworzenie slice dla uwierzytelniania
const authSlice = createSlice({
  name: "auth", // Nazwa slice
  initialState, // Początkowy stan
  reducers: {
    // Akcja logowania
    login: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
      state.isAuthenticated = true; // Ustawienie flagi uwierzytelnienia na true
      state.user = action.payload.user; // Ustawienie danych użytkownika
    },
    // Akcja wylogowania
    logout: (state) => {
      state.isAuthenticated = false; // Ustawienie flagi uwierzytelnienia na false
      state.user = null; // Wyczyszczenie danych użytkownika
    },
  },
});

// Eksportowanie akcji logowania i wylogowania
export const { login, logout } = authSlice.actions;
// Eksportowanie reduktora slice
export default authSlice.reducer;
