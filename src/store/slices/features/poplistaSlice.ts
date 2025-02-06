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

export const fetchPoplistaSongs = createAsyncThunk(
  "poplista/fetchSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/musisite/songs");
      if (!response.ok) throw new Error("Failed to fetch songs");

      const songs = await response.json();

      const sortedSongs = [...songs]
        .map((song) => ({
          ...song,
          votes: {
            up: song.likesCount || 0,
            down: 0,
          },
          thumbnail: song.thumbnail || "/images/default-song-image.jpg",
        }))
        .sort((a, b) => b.votes.up - a.votes.up)
        .map((song, index) => ({
          ...song,
          position: index + 1,
          previousPosition: index + 1,
          positionChange: 0,
          trend: "new" as const,
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
        const oldPosition = song.position;

        if (voteType === "up") song.votes.up++;
        else if (voteType === "down") song.votes.down++;

        const sortedSongs = [...state.songs]
          .sort(
            (a, b) => b.votes.up - b.votes.down - (a.votes.up - a.votes.down)
          )
          .map((s, index) => {
            const newPosition = index + 1;
            const positionChange = Math.abs(s.position - newPosition);

            let newTrend: PoplistaSong["trend"];
            if (s.position > newPosition) {
              newTrend = "up";
            } else if (s.position < newPosition) {
              newTrend = "down";
            } else {
              newTrend = "new";
            }

            return {
              ...s,
              previousPosition: s.position,
              position: newPosition,
              positionChange,
              trend: newTrend,
            };
          });

        state.songs = sortedSongs as PoplistaSong[];
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
