// src/app/muzyka/page.tsx
"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import { fetchSongs } from "@/store/slices/features/songsSlice";
import { Song } from "./types";
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
    return <div>Ładowanie...</div>;
  }

  if (status === "failed") {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div className="music-page">
      <BaciataRisingBanner />
      <BoxOfSongs songs={songs} currentSongIndex={currentSongIndex} />
      {songs.length > 0 ? (
        <MusicPlayer songs={songs} />
      ) : (
        <p>Ładowanie piosenek...</p>
      )}
    </div>
  );
};

export default MusicPage;
