import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Playlist, PlaylistState, UpdatePlaylistOrderAction } from "../types";
import { RootState, AppDispatch } from "@/store/store";
import { updateSongsPlaylists } from "./songsSlice";

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
};

interface SongReference {
  _id?: string;
  id?: string;
}

interface UpdatePlaylistError {
  message?: string;
  status?: number;
  details?: string;
}

const initialState: PlaylistState = {
  playlists: [],
  currentPlaylistId: null,
  status: "idle",
  error: null,
  isInitialized: false,
};

export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/musisite/playlists");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Nie udało się pobrać playlist");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Nie udało się pobrać playlist",
        status: error.status || 500,
      });
    }
  }
);

export const updatePlaylistOrder = createAsyncThunk(
  "playlist/updateOrder",
  async (payload: { playlistId: string; newOrder: string[] }, thunkAPI) => {
    try {
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePlaylistWithSong = createAsyncThunk<
  Playlist,
  { playlistId: string; songId: string },
  {
    rejectValue: UpdatePlaylistError;
  }
>(
  "playlists/updatePlaylistWithSong",
  async ({ playlistId, songId }, { dispatch, rejectWithValue }) => {
    try {
      console.log("Sending request to update playlist:", {
        playlistId,
        songId,
      });

      const response = await fetch(`/api/musisite/playlists/${playlistId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error:", {
          status: response.status,
          errorData,
          playlistId,
          songId,
        });
        return rejectWithValue({
          message: errorData.error || "Nie udało się zaktualizować playlisty",
          status: response.status,
        });
      }

      const updatedPlaylist = await response.json();
      console.log("Received updated playlist:", updatedPlaylist);

      if (!updatedPlaylist || !Array.isArray(updatedPlaylist.songs)) {
        console.error("Invalid playlist data received:", updatedPlaylist);
        return rejectWithValue({
          message: "Otrzymano nieprawidłowe dane playlisty",
          status: 500,
        });
      }

      // Normalize the playlist data
      const normalizedPlaylist = {
        ...updatedPlaylist,
        id: updatedPlaylist._id,
        _id: updatedPlaylist._id,
        songs: updatedPlaylist.songs.map((song: any) =>
          typeof song === "string" ? song : song._id || song.id
        ),
      };

      // Update songs playlists
      await dispatch(
        updateSongsPlaylists({
          songIds: [songId],
          playlistId: normalizedPlaylist.id,
          playlistName: normalizedPlaylist.name,
        })
      );

      return normalizedPlaylist;
    } catch (error) {
      console.error("Error in updatePlaylistWithSong:", error);
      return rejectWithValue({
        message:
          error instanceof Error
            ? error.message
            : "Wystąpił nieoczekiwany błąd",
        status: 500,
        details: error instanceof Error ? error.stack : undefined,
      });
    }
  }
);

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setCurrentPlaylistId: (state, action: PayloadAction<string | null>) => {
      state.currentPlaylistId = action.payload;
    },
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex(
        (p) =>
          p.id === action.payload.id ||
          p._id === action.payload._id ||
          p.id === action.payload._id
      );
      if (index !== -1) {
        state.playlists[index] = {
          ...action.payload,
          id: action.payload._id || action.payload.id,
          _id: action.payload._id || action.payload.id,
          songs: [...action.payload.songs],
        };
      }
    },
    removePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter((p) => p.id !== action.payload);
      if (state.currentPlaylistId === action.payload) {
        state.currentPlaylistId = null;
      }
    },
    resetPlaylistState: (state) => {
      return initialState;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = "idle";
        state.playlists = action.payload;
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isInitialized = true;
      })
      .addCase(updatePlaylistOrder.fulfilled, (state, action) => {
        const playlist = state.playlists.find(
          (p) => p.id === action.payload.playlistId
        );
        if (playlist) {
          playlist.songs = action.payload.newOrder;
        }
      })
      .addCase(updatePlaylistWithSong.fulfilled, (state, action) => {
        const normalizedPlaylist = {
          ...action.payload,
          id: action.payload._id || action.payload.id,
          _id: action.payload._id || action.payload.id,
          songs: action.payload.songs.map((songId: any) =>
            typeof songId === "string" ? songId : songId._id || songId.id
          ),
        };

        const index = state.playlists.findIndex(
          (p) =>
            p.id === normalizedPlaylist.id || p._id === normalizedPlaylist._id
        );

        if (index !== -1) {
          state.playlists[index] = normalizedPlaylist;
        } else {
          state.playlists.push(normalizedPlaylist);
        }
      })
      .addCase(updatePlaylistWithSong.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Nie udało się zaktualizować playlisty";
        state.status = "failed";
        console.error("Failed to update playlist:", action.payload);
      });
  },
});

export const deletePlaylistAndRefetch = createAsyncThunk<
  DeletePlaylistResponse,
  string,
  ThunkConfig
>(
  "playlists/deletePlaylistAndRefetch",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`/api/musisite/playlists/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Wystąpił błąd podczas usuwania playlisty";

        switch (response.status) {
          case 401:
            errorMessage = "Brak uprawnień do usunięcia playlisty";
            break;
          case 403:
            errorMessage = "Dostęp zabroniony";
            break;
          case 404:
            errorMessage = "Nie znaleziono playlisty";
            break;
          case 500:
            errorMessage = "Błąd serwera podczas usuwania playlisty";
            break;
          default:
            errorMessage = errorData.message || errorMessage;
        }

        return rejectWithValue({
          status: response.status,
          message: errorMessage,
          details: errorData.details || null,
        });
      }

      const data = await response.json();
      dispatch(removePlaylist(id));
      await dispatch(fetchPlaylists());
      return data;
    } catch (error: any) {
      return rejectWithValue({
        status: 500,
        message: "Wystąpił nieoczekiwany błąd podczas usuwania playlisty",
        details: error.message,
      });
    }
  }
);

export const {
  setCurrentPlaylistId,
  addPlaylist,
  updatePlaylist,
  removePlaylist,
} = playlistSlice.actions;

export const selectPlaylists = (state: RootState) => state.playlists.playlists;
export const selectCurrentPlaylistId = (state: RootState) =>
  state.playlists.currentPlaylistId;

export default playlistSlice.reducer;
