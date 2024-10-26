// Importowanie niezbędnych modułów i komponentów
"use client";
import {
  fetchSongs,
  deleteSongAndRefetch,
  deleteAllSongsAndRefetch,
} from "@/store/slices/features/songsSlice";
import SongList from "./components/SongList";
import AdminLayout from "../AdminLayout";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import AddSongForm from "./components/AddSongForm";
import DeleteAllConfirmation from "./components/DeleteAllConfirmation";
import Notification from './components/Notification';

// Główny komponent strony administracyjnej dla muzyki
const AdminMusicPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Pobieranie stanu piosenek z Redux store
  const { songs, status, error } = useSelector(
    (state: RootState) => state.songs
  );

  // Stan do przechowywania zawartości wczytanego pliku
  const [fileContent, setFileContent] = useState(null);
  // Stan do kontrolowania widoczności modalu potwierdzenia usunięcia wszystkich utworów
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Efekt pobierający piosenki przy załadowaniu komponentu
  useEffect(() => {
    console.log("Pobieranie piosenek...");
    dispatch(fetchSongs());
  }, [dispatch]);

  // Efekt logujący aktualny stan piosenek
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

  // Funkcja obsługująca dodawanie nowej piosenki
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

  // Funkcja obsługująca usuwanie piosenki
  const handleDeleteSong = async (id: string) => {
    try {
      await dispatch(deleteSongAndRefetch(id));
      console.log("Piosenka usunięta pomyślnie");
    } catch (error) {
      console.error("Błąd podczas usuwania piosenki:", error);
    }
  };

  // Funkcja obsługująca wczytywanie pliku JSON
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFileContent(json);
          json.forEach((song: any) => {
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

  // Funkcja obsługująca usuwanie wszystkich piosenek
  const handleDeleteAllSongs = async () => {
    try {
      const result = await dispatch(deleteAllSongsAndRefetch()).unwrap();
      setIsDeleteAllModalOpen(false);
      setNotification({
        type: 'success',
        message: 'Wszystkie utwory zostały pomyślnie usunięte'
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Wystąpił nieznany błąd podczas usuwania utworów';
      setNotification({
        type: 'error',
        message: errorMessage
      });
      console.error('Błąd podczas usuwania wszystkich utworów:', error);
    }
  };

  // Renderowanie komponentu w zależności od stanu ładowania
  if (status === "loading") {
    return <div>Ładowanie...</div>;
  }

  if (status === "failed") {
    return <div>Błąd: {error}</div>;
  }

  // Główny render komponentu
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Panel administracyjny - Muzyka</h1>
          <div className="flex gap-4">
            <input type="file" accept=".json" onChange={handleFileChange} />
            <button
              onClick={() => setIsDeleteAllModalOpen(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Usuń wszystkie utwory
            </button>
          </div>
        </div>
        <AddSongForm onAddSong={handleAddSong} />
        <SongList songs={songs} onDelete={handleDeleteSong} />
        
        <DeleteAllConfirmation
          isOpen={isDeleteAllModalOpen}
          onConfirm={handleDeleteAllSongs}
          onCancel={() => setIsDeleteAllModalOpen(false)}
        />
      </div>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminMusicPage;
