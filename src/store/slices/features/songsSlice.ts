import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/app/muzyka/types';

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async () => {
    const response = await fetch('/api/songs');
    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }
    return response.json();
  }
);

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [] as Song[],
    status: 'idle',
    error: null as string | null
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
          votes: song.votes,
          score: song.score,
          isFavorite: song.isFavorite,
          userVote: null,
        }));
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export const { addSong, deleteSong, setSongs } = songsSlice.actions;
export default songsSlice.reducer;
