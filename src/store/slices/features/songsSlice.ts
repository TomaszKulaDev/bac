import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/app/muzyka/types';

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  const response = await fetch('/api/songs');
  if (!response.ok) throw new Error('Nie udało się pobrać piosenek');
  return response.json();
});

export const addSong = createAsyncThunk('songs/addSong', async (song: Omit<Song, "id" | "votes" | "score" | "isFavorite" | "userVote">) => {
  const response = await fetch('/api/submit-song', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song),
  });
  if (!response.ok) throw new Error('Nie udało się dodać piosenki');
  return response.json();
});

export const deleteSong = createAsyncThunk('songs/deleteSong', async (id: string) => {
  const response = await fetch(`/api/songs/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Nie udało się usunąć piosenki');
  return id;
});

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [] as Song[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addSong.fulfilled, (state, action) => {
        state.songs.push(action.payload);
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.songs = state.songs.filter(song => song.id !== action.payload);
      });
  },
});

export const { setSongs } = songsSlice.actions;
export default songsSlice.reducer;
