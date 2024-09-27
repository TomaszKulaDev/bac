"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddSongForm from "./components/AddSongForm";
import { RootState } from "@/store/store";
import {
  addSong,
  deleteSong,
  setSongs,
  fetchSongs,
} from "@/store/slices/features/songsSlice";
import { Song as SongModel } from "@/models/Song";
import { Song } from "@/app/muzyka/types";
import { connectToDatabase } from "@/lib/mongodb";
import SongList from "./components/SongList";
import Link from "next/link";
import AdminLayout from "../AdminLayout";

const AdminMusicPage = () => {
  const dispatch = useDispatch();
  const { songs, status, error } = useSelector(
    (state: RootState) => state.songs
  );

  useEffect(() => {
    console.log("Pobieranie piosenek...");
    dispatch(fetchSongs() as any);
  }, [dispatch]);

  useEffect(() => {
    console.log("Aktualny stan piosenek:", songs);
  }, [songs]);

  const handleAddSong = async (newSong: {
    title: string;
    artist: string;
    youtubeLink: string;
  }) => {
    const youtubeId = newSong.youtubeLink.split("v=")[1];
    const song: Song = {
      _id: "", // To pole zostanie nadpisane przez bazę danych
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
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(songForApi),
      });

      if (response.ok) {
        console.log("Piosenka dodana pomyślnie");
        dispatch(addSong(song));
        await dispatch(fetchSongs() as any);
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
      console.log("Próba usunięcia piosenki o ID:", id);
      if (!id) {
        console.error("Błąd: Brak ID piosenki");
        return;
      }
      const response = await fetch(`/api/songs/${id}`, {
        method: "DELETE",
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (response.ok) {
        console.log("Piosenka usunięta pomyślnie");
        dispatch(deleteSong(id));
        await dispatch(fetchSongs() as any);
      } else {
        const errorData = await response.json();
        console.error("Błąd podczas usuwania piosenki:", errorData);
      }
    } catch (error) {
      console.error("Błąd podczas usuwania piosenki:", error);
    }
  };

  if (status === "loading") {
    return <div>Ładowanie...</div>;
  }

  if (status === "failed") {
    return <div>Błąd: {error}</div>;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Panel administracyjny - Muzyka</h1>
        </div>
        <AddSongForm onAddSong={handleAddSong} />
        <SongList songs={songs} onDelete={handleDeleteSong} />
      </div>
    </AdminLayout>
  );
};

export default AdminMusicPage;
