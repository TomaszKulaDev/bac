import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PoplistaSong } from "@/app/muzyka/types";

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

// Stałe czasowe
const NEW_SONG_THRESHOLD = 48 * 60 * 60 * 1000; // 48 godzin (2 dni) w milisekundach
const REMOVE_FROM_NEW_AFTER = 7 * 24 * 60 * 60 * 1000; // 7 dni w milisekundach

export const fetchPoplistaSongs = createAsyncThunk(
  "poplista/fetchSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/musisite/songs");
      if (!response.ok) throw new Error("Failed to fetch songs");

      const songs = await response.json();
      const now = new Date().getTime();

      const sortedSongs = [...songs]
        .map((song) => ({
          ...song,
          votes: {
            up: song.likesCount || 0,
          },
          thumbnail: song.thumbnail || "/images/default-song-image.jpg",
        }))
        .sort((a, b) => b.votes.up - a.votes.up)
        .map((song, index) => {
          const songAge = now - new Date(song.createdAt).getTime();
          const isNew = songAge < NEW_SONG_THRESHOLD;
          const shouldBeVisible = songAge < REMOVE_FROM_NEW_AFTER;

          return {
            ...song,
            position: index + 1,
            previousPosition: index + 1,
            positionChange: 0,
            trend: isNew && shouldBeVisible ? "new" : ("up" as const),
            isVisible: shouldBeVisible, // możemy użyć tego do filtrowania
          };
        });

      // Filtrujemy utwory starsze niż 7 dni z sekcji "Nowe"
      const visibleSongs = sortedSongs.filter(
        (song) => song.trend !== "new" || song.isVisible
      );

      return visibleSongs;
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

      if (song && voteType === "up") {
        song.votes.up++;

        // Sortuj tylko po votes.up
        const sortedSongs = [...state.songs]
          .sort((a, b) => b.votes.up - a.votes.up)
          .map((s, index) => ({
            ...s,
            position: index + 1,
            previousPosition: s.position,
            positionChange: Math.abs(s.position - (index + 1)),
            trend: s.trend, // zachowujemy istniejący trend
          })) as PoplistaSong[]; // dodajemy jawne rzutowanie typu

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
