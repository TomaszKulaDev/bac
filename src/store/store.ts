import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import songsReducer from "./slices/features/songsSlice";
import playlistReducer from "./slices/features/playlistSlice";
import poplistaReducer from "./slices/features/poplistaSlice";
import playerReducer from "./slices/playerSlice";
import listenerReducer from "./slices/features/listenerSlice";

// Konfiguracja głównego store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer odpowiedzialny za uwierzytelnianie
    admin: adminReducer, // Reducer odpowiedzialny za zarządzanie użytkownikami przez admina
    songs: songsReducer,
    playlists: playlistReducer,
    poplista: poplistaReducer,
    player: playerReducer,
    listeners: listenerReducer,
  },
});

// Typ RootState reprezentuje cały stan aplikacji
export type RootState = ReturnType<typeof store.getState>;

// Typ AppDispatch reprezentuje funkcję dispatch z naszego store
export type AppDispatch = typeof store.dispatch;
