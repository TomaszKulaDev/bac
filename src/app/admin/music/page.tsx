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
    const loadSongs = async () => {
      try {
        const result = await dispatch(fetchSongs()).unwrap();
        console.log("Piosenki pobrane pomyślnie:", result);
      } catch (error: any) {
        setNotification({
          type: 'error',
          message: error.message || 'Wystąpił błąd podczas pobierania piosenek'
        });
        console.error("Błąd podczas pobierania piosenek:", {
          status: error.status,
          message: error.message,
          details: error.details
        });
      }
    };

    loadSongs();
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
        setNotification({
          type: 'error',
          message: errorData.message || `Błąd HTTP: ${response.status}`
        });
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Odpowiedź serwera:", result);

      if (result.success) {
        console.log("Piosenka dodana pomyślnie");
        dispatch(fetchSongs());
        setNotification({
          type: 'success',
          message: 'Piosenka została pomyślnie dodana'
        });
      } else {
        setNotification({
          type: 'error',
          message: result.error || 'Wystąpił błąd podczas dodawania piosenki'
        });
        console.error("Błąd podczas dodawania piosenki:", result.error);
      }
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.message || 'Wystąpił nieoczekiwany błąd podczas dodawania piosenki'
      });
      console.error("Błąd podczas dodawania piosenki:", error);
    }
  };

  // Funkcja obsługująca usuwanie piosenki
  const handleDeleteSong = async (id: string) => {
    try {
      const result = await dispatch(deleteSongAndRefetch(id)).unwrap();
      setNotification({
        type: 'success',
        message: 'Piosenka została pomyślnie usunięta'
      });
    } catch (error: any) {
      const errorDetails = error.details ? `: ${error.details}` : '';
      setNotification({
        type: 'error',
        message: `${error.message}${errorDetails}`
      });
      
      console.error('Błąd podczas usuwania piosenki:', {
        status: error.status,
        message: error.message,
        details: error.details
      });

      if (error.status === 401 || error.status === 403) {
        console.log('Użytkownik nie ma uprawnień do usuwania piosenek');
      }
    }
  };

  // Funkcja obsługująca wczytywanie pliku JSON
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFileContent(json);
          let successCount = 0;
          let errorCount = 0;

          for (const song of json) {
            if (validateSong(song)) {
              try {
                await handleAddSong(song);
                successCount++;
              } catch {
                errorCount++;
              }
            } else {
              errorCount++;
              console.error("Nieprawidłowe dane piosenki:", song);
            }
          }

          setNotification({
            type: successCount > 0 ? 'success' : 'error',
            message: `Zaimportowano ${successCount} piosenek${errorCount > 0 ? `, ${errorCount} błędów` : ''}`
          });
        } catch (error) {
          setNotification({
            type: 'error',
            message: 'Błąd podczas parsowania pliku JSON'
          });
          console.error("Błąd podczas parsowania pliku JSON:", error);
        }
      };
      reader.readAsText(file);
    } else {
      setNotification({
        type: 'error',
        message: 'Niepoprawny format pliku. Wybierz plik JSON.'
      });
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
      const errorDetails = error.details ? `: ${error.details}` : '';
      setNotification({
        type: 'error',
        message: `${error.message}${errorDetails}`
      });
      
      // Logowanie błędu z dodatkowymi informacjami
      console.error('Błąd podczas usuwania wszystkich utworów:', {
        status: error.status,
        message: error.message,
        details: error.details
      });
      
      // Dodatkowa logika dla konkretnych kodów błędów
      if (error.status === 401 || error.status === 403) {
        // Możemy np. przekierować do strony logowania
        console.log('Użytkownik nie ma uprawnień - należy się zalogować');
      }
    }
  };

  // Renderowanie komponentu w zależności od stanu ładowania
  if (status === "loading") {
    return (
      <AdminLayout>
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <span className="ml-3">Ładowanie danych...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (status === "failed") {
    return (
      <AdminLayout>
        <div className="container mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Błąd! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </AdminLayout>
    );
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
