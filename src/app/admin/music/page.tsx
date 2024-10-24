// admin/music/page.tsx
"use client";
import {
  // addSong,
  // deleteSong,
  // setSongs,
  fetchSongs,
  deleteSongAndRefetch,
} from "@/store/slices/features/songsSlice";
// import { Song as SongModel } from "@/models/Song";
// import { Song } from "@/app/muzyka/types";
// import { connectToDatabase } from "@/lib/mongodb";
import SongList from "./components/SongList";
// import Link from "next/link";
import AdminLayout from "../AdminLayout";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import AddSongForm from "./components/AddSongForm";

const AdminMusicPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, status, error } = useSelector(
    (state: RootState) => state.songs
  );

  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    console.log("Pobieranie piosenek...");
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    console.log("Aktualny stan piosenek:", songs);
    songs.forEach((song, index) => {
      console.log(
        `Piosenka ${index + 1} w AdminMusicPage:`,
        song.id ? `ID: ${song.id}` : "Brak ID",
        "Indeks:",
        index
      );
    });
  }, [songs]);

  const handleAddSong = async (newSong: {
    title: string;
    artist: string;
    youtubeLink: string;
    impro: boolean;
    beginnerFriendly: boolean;
  }) => {
    try {
      console.log("Dodawanie piosenki:", newSong);
      const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Odpowiedź serwera:", result);

      if (result.success) {
        console.log("Piosenka dodana pomyślnie");
        dispatch(fetchSongs());
      } else {
        console.error("Błąd podczas dodawania piosenki:", result.error);
      }
    } catch (error) {
      console.error("Błąd podczas dodawania piosenki:", error);
    }
  };

  const handleDeleteSong = async (id: string) => {
    try {
      await dispatch(deleteSongAndRefetch(id));
      console.log("Piosenka usunięta pomyślnie");
    } catch (error) {
      console.error("Błąd podczas usuwania piosenki:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFileContent(json);
          json.forEach((song: any) => {
            // Walidacja danych piosenki
            if (validateSong(song)) {
              handleAddSong(song);
            } else {
              console.error("Nieprawidłowe dane piosenki:", song);
            }
          });
        } catch (error) {
          console.error("Błąd podczas parsowania pliku JSON:", error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error("Niepoprawny format pliku. Wybierz plik JSON.");
    }
  };

  // Funkcja walidująca dane piosenki
  const validateSong = (song: any) => {
    return (
      typeof song.title === 'string' &&
      typeof song.artist === 'string' &&
      typeof song.youtubeLink === 'string' &&
      typeof song.impro === 'boolean' &&
      typeof song.beginnerFriendly === 'boolean'
    );
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
          <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
        <AddSongForm onAddSong={handleAddSong} />
        <SongList songs={songs} onDelete={handleDeleteSong} />
      </div>
    </AdminLayout>
  );
};

export default AdminMusicPage;
