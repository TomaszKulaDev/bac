import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Song } from "@/app/muzyka/types";

interface PoplistaSong extends Song {
  position: number;
  previousPosition: number;
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

      // Mapowanie danych do formatu poplisty
      return songs.map((song: Song, index: number) => ({
        ...song,
        position: index + 1,
        previousPosition: index + 1, // Tymczasowo to samo, docelowo z bazy
        votes: {
          up: song.likesCount || 0,
          down: 0, // Docelowo z bazy
        },
      }));
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

export const { setFilter } = poplistaSlice.actions;
export default poplistaSlice.reducer;
