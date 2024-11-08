// Importowanie niezbędnych funkcji i typów z biblioteki Redux Toolkit i innych modułów
import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Song } from '@/app/muzyka/types';
import { RootState, AppDispatch } from '@/store/store';

// Asynchroniczna akcja do pobierania piosenek z API
export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/songs');
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          status: response.status,
          message: errorData.message || 'Wystąpił błąd podczas pobierania utworów',
          details: errorData.details || null
        });
      }

      const data = await response.json();
      return data.map((song: any) => ({
        ...song,
        id: song._id,
        impro: song.impro || false,
        beginnerFriendly: song.beginnerFriendly || false
      }));
    } catch (error: any) {
      return rejectWithValue({
        status: 500,
        message: 'Wystąpił nieoczekiwany błąd podczas pobierania utworów',
        details: error.message
      });
    }
  }
);

// Asynchroniczna akcja do usuwania piosenki i odświeżania listy
export const deleteSongAndRefetch = createAsyncThunk(
  'songs/deleteSongAndRefetch',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`/api/songs/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Wystąpił błąd podczas usuwania utworu';

        switch (response.status) {
          case 401:
            errorMessage = 'Brak uprawnień do usunięcia utworu';
            break;
          case 403:
            errorMessage = 'Dostęp zabroniony';
            break;
          case 404:
            errorMessage = 'Nie znaleziono utworu do usunięcia';
            break;
          case 500:
            errorMessage = 'Błąd serwera podczas usuwania utworu';
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
      await dispatch(fetchSongs());
      return data;
    } catch (error: any) {
      return rejectWithValue({
        status: 500,
        message: 'Wystąpił nieoczekiwany błąd podczas usuwania utworu',
        details: error.message
      });
    }
  }
);

// Akcja do ustawiania indeksu aktualnie odtwarzanej piosenki
export const setCurrentSongIndex = createAction<number>('songs/setCurrentSongIndex');

// Asynchroniczna akcja do aktualizacji playlist piosenek
export const updateSongsPlaylists = createAsyncThunk(
  'songs/updateSongsPlaylists',
  async (payload: { songIds: string[]; playlistId: string; playlistName: string; remove?: boolean }, thunkAPI) => {
    // Tutaj powinna być implementacja aktualizacji playlist
    return payload;
  }
);

// Asynchroniczna akcja do synchronizacji piosenek z playlistami
export const syncSongsWithPlaylists = createAsyncThunk<string[], string[], { dispatch: AppDispatch }>(
  'songs/syncWithPlaylists',
  async (playlistNames: string[], thunkAPI) => {
    // Tutaj powinna być implementacja synchronizacji
    return playlistNames;
  }
);

// Asynchroniczna akcja do usuwania wszystkich piosenek i odświeżania listy
export const deleteAllSongsAndRefetch = createAsyncThunk(
  'songs/deleteAllSongsAndRefetch',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/api/songs/deleteAll', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Wystąpił błąd podczas usuwania wszystkich utworów';

        switch (response.status) {
          case 401:
            errorMessage = 'Brak uprawnień do wykonania tej operacji';
            break;
          case 403:
            errorMessage = 'Dostęp zabroniony';
            break;
          case 404:
            errorMessage = 'Nie znaleziono zasobu';
            break;
          case 500:
            errorMessage = 'Błąd serwera podczas usuwania utworów';
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
      await dispatch(fetchSongs());
      return data;
    } catch (error: any) {
      return rejectWithValue({
        status: 500,
        message: 'Wystąpił nieoczekiwany błąd podczas usuwania utworów',
        details: error.message
      });
    }
  }
);

interface UpdatePlaylistPayload {
  songId: string;
  playlistName: string;
  shouldAdd: boolean;
}

const updateSongPlaylists = (song: Song, playlistName: string, shouldAdd: boolean): string[] => {
  const currentPlaylists = song.playlists ?? [];
  
  return shouldAdd 
    ? [...new Set([...currentPlaylists, playlistName])]
    : currentPlaylists.filter(p => p !== playlistName);
};

// Definicja slice'a dla piosenek
const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [] as Song[],
    status: 'idle',
    error: null as string | null,
    currentSongIndex: 0
  },
  reducers: {
    // Reducer do dodawania pojedynczej piosenki
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    // Reducer do usuwania piosenki po ID
    deleteSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
    // Reducer do ustawiania całej listy piosenek
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    // Reducer do usuwania piosenki (duplikat deleteSong - można rozważyć usunięcie)
    removeSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
    updatePlaylist: (state, action: PayloadAction<UpdatePlaylistPayload>) => {
      const song = state.songs.find(s => s.id === action.payload.songId);
      if (song) {
        song.playlists = updateSongPlaylists(
          song, 
          action.payload.playlistName, 
          action.payload.shouldAdd
        );
      }
    },
    cleanupPlaylists: (state, action: PayloadAction<{ validPlaylistNames: string[] }>) => {
      state.songs.forEach(song => {
        if (song.playlists) {
          song.playlists = song.playlists.filter(p => 
            action.payload.validPlaylistNames.includes(p)
          );
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Obsługa stanu ładowania piosenek
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
      })
      // Obsługa pomyślnego pobrania piosenek
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.songs = action.payload.map((song: any) => ({
          id: song._id.toString(),
          title: song.title,
          artist: song.artist,
          youtubeId: song.youtubeId,
        }));
      })
      // Obsługa błędu podczas pobierania piosenek
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Ustawianie indeksu aktualnej piosenki
      .addCase(setCurrentSongIndex, (state, action) => {
        state.currentSongIndex = action.payload;
      })
      // Aktualizacja playlist dla piosenek
      .addCase(updateSongsPlaylists.fulfilled, (state, action) => {
        const { songIds, playlistId, playlistName, remove } = action.payload;
        state.songs = state.songs.map(song => 
          songIds.includes(song.id) 
            ? { 
                ...song, 
                playlists: remove 
                  ? song.playlists.filter(p => p !== playlistName)
                  : [...new Set([...(song.playlists || []), playlistName])]
              }
            : song
        );
      })
      // Synchronizacja piosenek z playlistami
      .addCase(syncSongsWithPlaylists.fulfilled, (state, action) => {
        const validPlaylistNames = action.payload;
        state.songs = state.songs.map(song => ({
          ...song,
          playlists: song.playlists ? song.playlists.filter(p => validPlaylistNames.includes(p)) : []
        }));
      });
  }
});

// Eksport akcji i reducera
export const { addSong, deleteSong, setSongs, updatePlaylist, cleanupPlaylists } = songsSlice.actions;
export default songsSlice.reducer;
