import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListenerState, Listener } from "@/app/muzyka/types/listener";
import { v4 as uuidv4 } from "uuid";

const initialState: ListenerState = {
  activeListeners: [],
  lastCleanup: Date.now(),
};

const listenerSlice = createSlice({
  name: "listeners",
  initialState,
  reducers: {
    updateListener: (
      state,
      action: PayloadAction<{
        userId: string;
        currentSong?: string;
        isPlaying: boolean;
        deviceType: "mobile" | "desktop" | "tablet";
      }>
    ) => {
      const now = Date.now();
      const { userId, currentSong, isPlaying, deviceType } = action.payload;

      // Pobierz lub wygeneruj deviceId
      const deviceId =
        globalThis?.localStorage?.getItem("deviceId") || uuidv4();
      if (globalThis?.localStorage) {
        localStorage.setItem("deviceId", deviceId);
      }

      console.group("🎧 Listener Update");
      console.log("Aktualizacja słuchacza:", {
        userId,
        deviceId,
        currentSong,
        isPlaying,
        deviceType,
        timestamp: new Date(now).toISOString(),
      });

      const existingListenerIndex = state.activeListeners.findIndex(
        (l) => l.userId === userId && l.deviceId === deviceId
      );

      if (existingListenerIndex !== -1) {
        // Aktualizuj istniejącego słuchacza
        state.activeListeners[existingListenerIndex] = {
          ...state.activeListeners[existingListenerIndex],
          lastActive: now,
          currentSong,
          isPlaying,
          deviceType,
        };
      } else {
        // Dodaj nowego słuchacza
        state.activeListeners.push({
          id: uuidv4(),
          userId,
          deviceId,
          lastActive: now,
          currentSong,
          isPlaying,
          deviceType,
        });
      }

      // Czyść nieaktywnych słuchaczy
      if (now - state.lastCleanup > 60000) {
        const before = state.activeListeners.length;
        state.activeListeners = state.activeListeners.filter((listener) => {
          const isActive = now - listener.lastActive < 300000;
          if (!isActive) {
            console.log("Usuwanie nieaktywnego słuchacza:", {
              userId: listener.userId,
              deviceId: listener.deviceId,
              lastActive: new Date(listener.lastActive).toISOString(),
            });
          }
          return isActive;
        });
        console.log(
          `Wyczyszczono ${
            before - state.activeListeners.length
          } nieaktywnych słuchaczy`
        );
        state.lastCleanup = now;
      }

      console.log("Aktywni słuchacze:", state.activeListeners);
      console.groupEnd();
    },
    removeListener: (
      state,
      action: PayloadAction<{
        userId: string;
        deviceId: string;
      }>
    ) => {
      const { userId, deviceId } = action.payload;
      console.log("Usuwanie słuchacza:", { userId, deviceId });
      state.activeListeners = state.activeListeners.filter(
        (l) => !(l.userId === userId && l.deviceId === deviceId)
      );
    },
  },
});

export const { updateListener, removeListener } = listenerSlice.actions;
export default listenerSlice.reducer;
