import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPlaylists } from "@/store/slices/features/playlistSlice";

interface UsePlaylistDataProps {
  isAuthenticated?: boolean; // Opcjonalny parametr
}

export const usePlaylistData = (props?: UsePlaylistDataProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status: sessionStatus } = useSession();
  const { playlists, status, error, isInitialized } = useSelector(
    (state: RootState) => state.playlists
  );

  // Używamy przekazanego isAuthenticated lub wartości z sesji
  const isAuth = props?.isAuthenticated ?? sessionStatus === "authenticated";

  const fetchPlaylistsData = useCallback(async () => {
    if (isAuth && session?.user) {
      await dispatch(fetchPlaylists());
    }
  }, [dispatch, isAuth, session]);

  useEffect(() => {
    if (isAuth && !isInitialized) {
      fetchPlaylistsData();
    }
  }, [isAuth, isInitialized, fetchPlaylistsData]);

  return {
    playlists,
    isLoading: status === "loading",
    error,
    isInitialized,
    refreshPlaylists: fetchPlaylistsData,
    isAuthenticated: isAuth,
  };
};
