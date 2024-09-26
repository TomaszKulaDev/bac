// src/app/muzyka/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import { setSongs } from "@/store/slices/features/songsSlice";
import { Song } from "./types";
import { RootState } from "@/store/store";

/**
 * Komponent Muzyka jest odpowiedzialny za wyświetlanie strony z muzyką.
 * 
 * - Pobiera listę piosenek z API i zapisuje je w stanie Redux.
 * - Wyświetla komunikat ładowania, dopóki piosenki nie zostaną pobrane.
 * - Po załadowaniu piosenek, wyświetla odtwarzacz muzyki.
 */
export default function Muzyka() {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [isLoading, setIsLoading] = useState(true);
  const songsLoadedRef = useRef(false);

  useEffect(() => {
    const fetchSongs = async () => {
      console.log("fetchSongs: Start");
      if (songs.length === 0 && !songsLoadedRef.current) {
        try {
          const response = await fetch("/api/songs");
          const fetchedSongs = await response.json();
          console.log("fetchSongs: Songs fetched", fetchedSongs);
          const formattedSongs: Song[] = fetchedSongs.map((song: any) => ({
            id: song._id.toString(),
            title: song.title,
            artist: song.artist,
            youtubeId: song.youtubeId,
            votes: song.votes,
            score: song.score,
            isFavorite: song.isFavorite,
            userVote: null,
          }));
          dispatch(setSongs(formattedSongs));
          songsLoadedRef.current = true;
        } catch (error) {
          console.error("Błąd podczas pobierania piosenek:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [dispatch, songs.length]);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">Muzyka</h1>
      <MusicPlayer /> {/* Ta linia odpowiada za wyświetlanie muzyki */}
    </div>
  );
}
