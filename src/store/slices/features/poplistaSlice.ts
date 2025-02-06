import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Song } from "@/app/muzyka/types";

interface PoplistaSong extends Song {
  position: number; // Aktualna pozycja w rankingu
  previousPosition: number | null;
  votes: {
    up: number;
    down: number;
  };
}

interface PoplistaState {
  songs: PoplistaSong[];
  status: "idle" | "loading" | "failed";
  error: string | null;
  filter: "all" | "new" | "rising" | "falling";
}

const initialState: PoplistaState = {
  songs: [],
  status: "idle",
  error: null,
  filter: "all",
};

export const fetchPoplistaSongs = createAsyncThunk(
  "poplista/fetchSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/musisite/songs");
      if (!response.ok) throw new Error("Failed to fetch songs");

      const songs = await response.json();

      // Sortujemy po głosach i przypisujemy pozycje
      const sortedSongs = [...songs]
        .map((song) => ({
          ...song,
          votes: {
            up: song.likesCount || 0,
            down: 0,
          },
        }))
        .sort((a, b) => b.votes.up - a.votes.up)
        .map((song, index) => ({
          ...song,
          position: index + 1,
          previousPosition: null,
        }));

      return sortedSongs;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const poplistaSlice = createSlice({
  name: "poplista",
  initialState,
  reducers: {
    updateVotes: (state, action) => {
      const { songId, voteType } = action.payload;
      const song = state.songs.find((s) => s.id === songId);

      if (song) {
        // Aktualizuj głosy
        if (voteType === "up") song.votes.up++;
        else if (voteType === "down") song.votes.down++;

        // Zapisz poprzednie pozycje
        state.songs = state.songs.map((s) => ({
          ...s,
          previousPosition: s.position,
        }));

        // Przelicz pozycje na podstawie głosów
        const sortedSongs = [...state.songs]
          .sort(
            (a, b) => b.votes.up - b.votes.down - (a.votes.up - a.votes.down)
          )
          .map((s, index) => ({
            ...s,
            position: index + 1,
          }));

        state.songs = sortedSongs;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoplistaSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPoplistaSongs.fulfilled, (state, action) => {
        state.status = "idle";
        state.songs = action.payload;
      })
      .addCase(fetchPoplistaSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { updateVotes, setFilter } = poplistaSlice.actions;
export default poplistaSlice.reducer;
