import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPlaylists } from "@/store/slices/features/playlistSlice";

export const usePlaylistData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status: sessionStatus } = useSession();
  const { playlists, status, error, isInitialized } = useSelector(
    (state: RootState) => state.playlists
  );

  const fetchPlaylistsData = useCallback(async () => {
    if (sessionStatus === "authenticated" && session?.user) {
      await dispatch(fetchPlaylists());
    }
  }, [dispatch, sessionStatus, session]);

  useEffect(() => {
    if (sessionStatus === "authenticated" && !isInitialized) {
      fetchPlaylistsData();
    }
  }, [sessionStatus, isInitialized, fetchPlaylistsData]);

  return {
    playlists,
    isLoading: status === "loading",
    error,
    isInitialized,
    refreshPlaylists: fetchPlaylistsData,
    isAuthenticated: sessionStatus === "authenticated",
  };
};
