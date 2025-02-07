"use client";

import { PoplistaHeader } from "./PoplistaHeader";
import { PoplistaList } from "./PoplistaList";
import { PoplistaFilters } from "./PoplistaFilters";
import { useEffect } from "react";
import { store } from "@/store/store";

export const PoplistaContainer = () => {
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
      <PoplistaHeader />
      <PoplistaFilters />
      <PoplistaList />
    </div>
  );
};
