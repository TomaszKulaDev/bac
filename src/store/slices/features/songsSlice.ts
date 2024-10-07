import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Song } from '@/app/muzyka/types';
import { RootState } from '@/store/store'; // Dodaj ten import

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async () => {
    const response = await fetch('/api/songs');
    const data = await response.json();
    // console.log("Pobrane piosenki:", data);
    return data.map((song: any) => ({
      ...song,
      id: song._id || song.id
    }));
  }
);

export const deleteSongAndRefetch = createAsyncThunk(
  'songs/deleteSongAndRefetch',
  async (id: string, { dispatch }) => {
    const response = await fetch(`/api/songs/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete song');
    await dispatch(fetchSongs());
  }
);

export const setCurrentSongIndex = createAction<number>('songs/setCurrentSongIndex');

export const updateSongsPlaylists = createAsyncThunk(
  'songs/updateSongsPlaylists',
  async (payload: { songIds: string[]; playlistId: string; playlistName: string; remove?: boolean }, thunkAPI) => {
    // implementacja
    return payload;
  }
);

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [] as Song[],
    status: 'idle',
    error: null as string | null,
    currentSongIndex: 0
  },
  reducers: {
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    removeSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.songs = action.payload.map((song: any) => ({
          id: song._id.toString(),
          title: song.title,
          artist: song.artist,
          youtubeId: song.youtubeId,
        }));
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(setCurrentSongIndex, (state, action) => {
        state.currentSongIndex = action.payload;
      })
      .addCase(updateSongsPlaylists.fulfilled, (state, action) => {
        const { songIds, playlistId, playlistName, remove } = action.payload;
        state.songs = state.songs.map(song => 
          songIds.includes(song.id) 
            ? { 
                ...song, 
                playlists: remove 
                  ? (song.playlists || []).filter(p => p !== playlistName)
                  : [...new Set([...(song.playlists || []), playlistName])]
              }
            : song
        );
      });
  }
});

export const { addSong, deleteSong, setSongs } = songsSlice.actions;
export default songsSlice.reducer;