// src/app/muzyka/page.tsx
"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import { setSongs } from "@/store/slices/features/songsSlice";
import { Song } from "./types";
import { RootState } from "@/store/store";

export default function Muzyka() {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => {
    if (songs.length === 0) {
      // Tylko jeśli nie ma piosenek w stanie, dodaj początkowe
      const initialSongs: Song[] = [
        {
          id: "1",
          title: "test",
          artist: "Queen",
          youtubeId: "fJ9rUzIMcZQ",
          votes: 0,
          score: 0,
          isFavorite: false,
          userVote: null,
        },
      ];
      dispatch(setSongs(initialSongs));
    }
  }, [dispatch, songs.length]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">Muzyka</h1>
      <MusicPlayer />
    </div>
  );
}
