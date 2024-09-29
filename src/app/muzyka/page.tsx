// src/app/muzyka/page.tsx
"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import { fetchSongs } from "@/store/slices/features/songsSlice";
import { RootState } from "@/store/store";
import BoxOfSongs from "./components/BoxOfSongs";
import BaciataRisingBanner from "./components/BaciataRisingBanner";

const MusicPage: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, status, error, currentSongIndex } = useSelector(
    (state: RootState) => state.songs
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSongs() as any);
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Ładowanie...</div>;
  }

  if (status === "failed") {
    return <div className="text-red-500 text-center">Błąd: {error}</div>;
  }

  return (
    <div className="music-page bg-gray-100 min-h-screen">
      <BaciataRisingBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Witaj w świecie Bachaty!</h2>
        <p className="text-lg text-gray-700 mb-8">
          Odkryj najnowsze hity i klasyki bachaty. Przeglądaj, słuchaj i ciesz się muzyką!
        </p>
        <BoxOfSongs songs={songs} currentSongIndex={currentSongIndex} />
        {songs.length > 0 ? (
          <MusicPlayer songs={songs} />
        ) : (
          <p className="text-center text-gray-500 mt-8">Ładowanie piosenek...</p>
        )}
      </div>
    </div>
  );
};


export default MusicPage;