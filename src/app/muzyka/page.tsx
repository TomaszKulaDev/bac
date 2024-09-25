// src/app/muzyka/page.tsx
"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import { setSongs, fetchSongs } from "@/store/slices/features/songsSlice";
import { Song } from "./types";
import { RootState, AppDispatch } from "@/store/store";

export default function Muzyka() {
  const dispatch = useDispatch<AppDispatch>();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const status = useSelector((state: RootState) => state.songs.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSongs());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (songs.length === 0 && status === 'succeeded') {
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
  }, [dispatch, songs.length, status]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">Muzyka</h1>
      <MusicPlayer />
    </div>
  );
}
