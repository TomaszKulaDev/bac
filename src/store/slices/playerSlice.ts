import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  repeatMode: "none" | "all" | "one";
  currentTime: number;
  duration: number;
}

const initialState: PlayerState = {
  isPlaying: false,
  volume: 100,
  isMuted: false,
  repeatMode: "none",
  currentTime: 0,
  duration: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    togglePlayback: (state, action: PayloadAction<boolean | undefined>) => {
      state.isPlaying = action.payload ?? !state.isPlaying;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setRepeatMode: (
      state,
      action: PayloadAction<PlayerState["repeatMode"]>
    ) => {
      state.repeatMode = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
  },
});

export const {
  togglePlayback,
  setVolume,
  toggleMute,
  setRepeatMode,
  setCurrentTime,
  setDuration,
} = playerSlice.actions;

export default playerSlice.reducer;
