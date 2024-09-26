"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddSongForm from "./components/AddSongForm";
import { RootState } from "@/store/store";
import {
  addSong,
  deleteSong,
  setSongs,
} from "@/store/slices/features/songsSlice";
import { Song as SongModel } from "@/models/Song";
import { Song } from "@/app/muzyka/types";
import { connectToDatabase } from "@/lib/mongodb";
import SongList from "./components/SongList";
import Link from 'next/link';

const AdminMusicPage = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => {
    const fetchSongs = async () => {
      console.log("AdminMusicPage fetchSongs: Start");
      if (songs.length === 0 && typeof window !== "undefined") {
        try {
          const response = await fetch("/api/songs");
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${errorData.error}`
            );
          }
          const fetchedSongs = await response.json();
          console.log("AdminMusicPage fetchSongs: Songs fetched", fetchedSongs);
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
        } catch (error) {
          console.error(
            "AdminMusicPage fetchSongs: Błąd podczas pobierania piosenek:",
            error
          );
        }
      }
    };

    fetchSongs();
  }, [dispatch, songs.length]);

  const handleAddSong = async (newSong: {
    title: string;
    artist: string;
    youtubeLink: string;
  }) => {
    const youtubeId = newSong.youtubeLink.split("v=")[1];
    const song: Song = {
      id: "", // Możesz wygenerować unikalne ID tutaj
      title: newSong.title,
      artist: newSong.artist,
      youtubeId: youtubeId,
      votes: 0,
      score: 0,
      isFavorite: false,
      userVote: null,
    };

    const songForApi = {
      title: newSong.title,
      artist: newSong.artist,
      youtubeLink: newSong.youtubeLink,
      userId: "someUserId", // Dodaj odpowiedni userId, jeśli jest wymagany
    };

    console.log("Dodawanie piosenki:", songForApi);

    try {
      const response = await fetch("/api/submit-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songForApi),
      });

      if (response.ok) {
        console.log("Piosenka dodana pomyślnie");
        dispatch(addSong(song));
      } else {
        const errorData = await response.json();
        console.error("Błąd podczas dodawania piosenki:", errorData);
      }
    } catch (error) {
      console.error("Błąd podczas dodawania piosenki:", error);
    }
  };

  const handleDeleteSong = async (id: string) => {
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Piosenka usunięta pomyślnie");
        dispatch(deleteSong(id));
      } else {
        const errorData = await response.json();
        console.error("Błąd podczas usuwania piosenki:", errorData);
      }
    } catch (error) {
      console.error("Błąd podczas usuwania piosenki:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
          Panel administracyjny - Muzyka
        </h1>
        <Link href="/admin" className="text-blue-500 hover:text-blue-700 transition duration-300">
          Powrót do panelu admina
        </Link>
      </div>
      <AddSongForm onAddSong={handleAddSong} />
      <SongList songs={songs} onDelete={handleDeleteSong} />
    </div>
  );
};

export default AdminMusicPage;
