import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist } from '@/app/muzyka/types';

interface PlaylistState {
  playlists: Playlist[];
  error: string | null;
  isLoading: boolean;
}

const initialState: PlaylistState = {
  playlists: [],
  error: null,
  isLoading: false
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
      state.error = null;
    },
    setPlaylistError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setPlaylistLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setPlaylists, setPlaylistError, setPlaylistLoading } = playlistSlice.actions;
export default playlistSlice.reducer; 