import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListenerState, Listener } from "@/app/muzyka/types/listener";

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
      action: PayloadAction<Omit<Listener, "lastActive">>
    ) => {
      const index = state.activeListeners.findIndex(
        (l) => l.id === action.payload.id
      );
      const now = Date.now();

      if (index !== -1) {
        state.activeListeners[index] = {
          ...state.activeListeners[index],
          ...action.payload,
          lastActive: now,
        };
      } else {
        state.activeListeners.push({
          ...action.payload,
          lastActive: now,
        });
      }

      // Czyść nieaktywnych słuchaczy (5 minut nieaktywności)
      if (now - state.lastCleanup > 60000) {
        // co minutę
        state.activeListeners = state.activeListeners.filter(
          (listener) => now - listener.lastActive < 300000
        );
        state.lastCleanup = now;
      }
    },
    removeListener: (state, action: PayloadAction<string>) => {
      state.activeListeners = state.activeListeners.filter(
        (l) => l.id !== action.payload
      );
    },
  },
});

export const { updateListener, removeListener } = listenerSlice.actions;
export default listenerSlice.reducer;
