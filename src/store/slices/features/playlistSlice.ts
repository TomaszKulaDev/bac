import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, PlaylistState, UpdatePlaylistOrderAction } from '../types';
import { RootState, AppDispatch } from '@/store/store';
import { updateSongsPlaylists } from './songsSlice';

interface DeletePlaylistResponse {
  message: string;
  success: boolean;
}

type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: {
    status: number;
    message: string;
    details?: string | null;
  };
}

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
      const response = await fetch('/api/musisite/playlists');
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

export const deletePlaylistAndRefetch = createAsyncThunk<
  DeletePlaylistResponse,
  string,
  ThunkConfig
>('playlists/deletePlaylistAndRefetch',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`/api/musisite/playlists/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Wystąpił błąd podczas usuwania playlisty';

        switch (response.status) {
          case 401:
            errorMessage = 'Brak uprawnień do usunięcia playlisty';
            break;
          case 403:
            errorMessage = 'Dostęp zabroniony';
            break;
          case 404:
            errorMessage = 'Nie znaleziono playlisty';
            break;
          case 500:
            errorMessage = 'Błąd serwera podczas usuwania playlisty';
            break;
          default:
            errorMessage = errorData.message || errorMessage;
        }

        return rejectWithValue({
          status: response.status,
          message: errorMessage,
          details: errorData.details || null
        });
      }

      const data = await response.json();
      dispatch(removePlaylist(id));
      await dispatch(fetchPlaylists());
      return data;
    } catch (error: any) {
      return rejectWithValue({
        status: 500,
        message: 'Wystąpił nieoczekiwany błąd podczas usuwania playlisty',
        details: error.message
      });
    }
  }
);

export const { 
  setCurrentPlaylistId, 
  addPlaylist, 
  updatePlaylist, 
  removePlaylist 
} = playlistSlice.actions;

export const selectPlaylists = (state: RootState) => state.playlists.playlists;
export const selectCurrentPlaylistId = (state: RootState) => state.playlists.currentPlaylistId;

export default playlistSlice.reducer; 