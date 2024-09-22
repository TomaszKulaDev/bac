import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from './slices/adminSlice';

// Konfiguracja głównego store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer odpowiedzialny za uwierzytelnianie
    admin: adminReducer, // Reducer odpowiedzialny za zarządzanie użytkownikami przez admina
    // inne reducery mogą być dodane tutaj...
  },
});

// Typ RootState reprezentuje cały stan aplikacji
export type RootState = ReturnType<typeof store.getState>;

// Typ AppDispatch reprezentuje funkcję dispatch z naszego store
export type AppDispatch = typeof store.dispatch;
