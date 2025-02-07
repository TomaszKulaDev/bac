"use client";

import { PoplistaHeader } from "./PoplistaHeader";
import { PoplistaList } from "./PoplistaList";
import { PoplistaFilters } from "./PoplistaFilters";
import { useEffect } from "react";
import { store } from "@/store/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const PoplistaContainer = () => {
  const { status, error } = useSelector((state: RootState) => state.poplista);

  useEffect(() => {
    console.group("🎵 PoplistaContainer - Mount");
    const state = store.getState();
    console.log("Stan początkowy:", {
      songsLoaded: state.poplista.songs.length,
      currentFilter: state.poplista.filter,
      playlistId: state.playlists.currentPlaylistId,
    });
    console.groupEnd();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-1 sm:px-4 py-2 sm:py-8">
      {status === "failed" && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
          <p className="text-red-700">Błąd ładowania listy: {error}</p>
        </div>
      )}

      <PoplistaHeader />
      <PoplistaFilters />
      <PoplistaList />
    </div>
  );
};
