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
    // Nie próbuj pobierać danych, jeśli sesja wciąż się ładuje
    if (sessionStatus === "loading") {
      console.log("Sesja wciąż się ładuje, czekam...");
      return;
    }

    if (isAuth && session?.user) {
      console.log("Próba pobrania playlist...");
      await dispatch(fetchPlaylists());
    } else {
      console.log(
        "Pominięto pobieranie playlist - brak autoryzacji lub użytkownika"
      );
    }
  }, [dispatch, isAuth, session, sessionStatus]);

  // Efekt do inicjalnego załadowania playlist
  useEffect(() => {
    if (isAuth && !isInitialized && sessionStatus === "authenticated") {
      console.log("Inicjalne ładowanie playlist");
      fetchPlaylistsData();
    }
  }, [isAuth, isInitialized, sessionStatus, fetchPlaylistsData]);

  // Efekt do obsługi ponownych prób w przypadku błędu
  useEffect(() => {
    if (error && isAuth && sessionStatus === "authenticated") {
      console.log("Wykryto błąd, próba ponownego pobrania za 2 sekundy...");
      const retryTimer = setTimeout(() => {
        console.log("Ponowna próba pobrania playlist...");
        fetchPlaylistsData();
      }, 2000);

      return () => {
        console.log("Czyszczenie timera ponownej próby");
        clearTimeout(retryTimer);
      };
    }
  }, [error, isAuth, sessionStatus, fetchPlaylistsData]);

  // Dodajmy logowanie dla debugowania
  useEffect(() => {
    console.log({
      sessionStatus,
      isAuth,
      isInitialized,
      error,
      hasSession: !!session,
      playlistsCount: playlists.length,
    });
  }, [sessionStatus, isAuth, isInitialized, error, session, playlists]);

  return {
    playlists,
    isLoading: status === "loading" || sessionStatus === "loading",
    error,
    isInitialized,
    refreshPlaylists: fetchPlaylistsData,
    isAuthenticated: isAuth,
  };
};
