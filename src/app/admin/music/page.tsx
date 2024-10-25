// admin/music/page.tsx
"use client";
import {
  // importowanie akcji z songsSlice
  fetchSongs,
  deleteSongAndRefetch,
} from "@/store/slices/features/songsSlice";
import SongList from "./components/SongList"; // importowanie komponentu SongList
import AdminLayout from "../AdminLayout"; // importowanie komponentu AdminLayout
import React, { useEffect, useState } from "react"; // importowanie React i hooków useEffect oraz useState
import { useSelector, useDispatch } from "react-redux"; // importowanie hooków useSelector i useDispatch z react-redux
import { RootState, AppDispatch } from "@/store/store"; // importowanie typów RootState i AppDispatch
import AddSongForm from "./components/AddSongForm"; // importowanie komponentu AddSongForm

const AdminMusicPage = () => {
  const dispatch = useDispatch<AppDispatch>(); // inicjalizacja dispatcha
  const { songs, status, error } = useSelector(
    (state: RootState) => state.songs // pobieranie stanu songs z redux store
  );

  const [fileContent, setFileContent] = useState(null); // stan do przechowywania zawartości pliku

  useEffect(() => {
    console.log("Pobieranie piosenek...");
    dispatch(fetchSongs()); // pobieranie piosenek przy załadowaniu komponentu
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
  }, [songs]); // logowanie aktualnego stanu piosenek przy każdej zmianie stanu songs

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
        body: JSON.stringify(newSong), // wysyłanie nowej piosenki do API
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
        dispatch(fetchSongs()); // ponowne pobranie piosenek po dodaniu nowej
      } else {
        console.error("Błąd podczas dodawania piosenki:", result.error);
      }
    } catch (error) {
      console.error("Błąd podczas dodawania piosenki:", error);
    }
  };

  const handleDeleteSong = async (id: string) => {
    try {
      await dispatch(deleteSongAndRefetch(id)); // usuwanie piosenki i ponowne pobranie piosenek
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
          setFileContent(json); // ustawianie zawartości pliku w stanie
          json.forEach((song: any) => {
            // Walidacja danych piosenki
            if (validateSong(song)) {
              handleAddSong(song); // dodawanie piosenki po walidacji
            } else {
              console.error("Nieprawidłowe dane piosenki:", song);
            }
          });
        } catch (error) {
          console.error("Błąd podczas parsowania pliku JSON:", error);
        }
      };
      reader.readAsText(file); // odczytywanie pliku jako tekst
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
    ); // sprawdzanie czy dane piosenki są poprawne
  };

  if (status === "loading") {
    return <div>Ładowanie...</div>; // wyświetlanie komunikatu o ładowaniu
  }

  if (status === "failed") {
    return <div>Błąd: {error}</div>; // wyświetlanie komunikatu o błędzie
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Panel administracyjny - Muzyka</h1>
          <input type="file" accept=".json" onChange={handleFileChange} /> {/* input do wczytywania pliku JSON */}
        </div>
        <AddSongForm onAddSong={handleAddSong} /> {/* formularz do dodawania piosenek */}
        <SongList songs={songs} onDelete={handleDeleteSong} /> {/* lista piosenek */}
      </div>
    </AdminLayout>
  );
};

export default AdminMusicPage;
