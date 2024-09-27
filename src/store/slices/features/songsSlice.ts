// src/store/slices/features/songsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/app/muzyka/types';

interface SongsState {
  songs: Song[];
}

const initialState: SongsState = {
  songs: [],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
    updateSong: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
  },
});

export const { setSongs, addSong, deleteSong, updateSong } = songsSlice.actions;
export default songsSlice.reducer;
