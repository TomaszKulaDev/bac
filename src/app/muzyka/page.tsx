// src/app/muzyka/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import { setSongs, fetchSongs } from "@/store/slices/features/songsSlice";
import { Song } from "./types";
import { RootState } from "@/store/store";

export default function Muzyka() {
  const dispatch = useDispatch();
  const { songs, status, error } = useSelector((state: RootState) => state.songs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSongs() as any);
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Ładowanie...</div>;
  }

  if (status === 'failed') {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">Muzyka</h1>
      <MusicPlayer songs={songs} />
    </div>
  );
}
