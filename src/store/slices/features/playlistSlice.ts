import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, PlaylistState, UpdatePlaylistOrderAction } from '../types';
import { RootState } from '@/store/store';
import { updateSongsPlaylists } from './songsSlice';

const initialState: PlaylistState = {
  playlists: [],
  currentPlaylistId: null,
  status: 'idle',
  error: null
};

export const fetchPlaylists = createAsyncThunk(
  'playlists/fetchPlaylists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/playlists');
      if (!response.ok) {
        throw new Error('Nie udało się pobrać playlist');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlaylistOrder = createAsyncThunk(
  'playlist/updateOrder',
  async (payload: { playlistId: string; newOrder: string[] }, thunkAPI) => {
    try {
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setCurrentPlaylistId: (state, action: PayloadAction<string | null>) => {
      state.currentPlaylistId = action.payload;
    },
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
      }
    },
    removePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(p => p.id !== action.payload);
      if (state.currentPlaylistId === action.payload) {
        state.currentPlaylistId = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = 'idle';
        state.playlists = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updatePlaylistOrder.fulfilled, (state, action) => {
        const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
        if (playlist) {
          playlist.songs = action.payload.newOrder;
        }
      });
  }
});

export const { 
  setCurrentPlaylistId, 
  addPlaylist, 
  updatePlaylist, 
  removePlaylist 
} = playlistSlice.actions;

export const selectPlaylists = (state: RootState) => state.playlists.playlists;
export const selectCurrentPlaylistId = (state: RootState) => state.playlists.currentPlaylistId;

export default playlistSlice.reducer; 