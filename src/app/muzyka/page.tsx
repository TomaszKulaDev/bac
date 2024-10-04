// src/app/muzyka/page.tsx
"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import {
  fetchSongs,
  setCurrentSongIndex,
} from "@/store/slices/features/songsSlice";
import { Song, Playlist } from "./types";
import { RootState } from "@/store/store";
import { useState } from "react";
import BaciataRisingBanner from "./components/BaciataRisingBanner";
import SongList from "./components/SongList";
import RecentlyPlayedList from "./components/RecentlyPlayedList";
import SimilarSongs from "./components/SimilarSongs";
import CreatePlaylist from "./components/CreatePlaylist";
import PlaybackStatistics from "./components/PlaybackStatistics";
import PlaylistManager from "./components/PlaylistManager";

const MusicPage: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, status, error, currentSongIndex } = useSelector(
    (state: RootState) => state.songs
  );

  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState<Song[]>([]);

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const handleCreatePlaylist = useCallback(
    (name: string, selectedSongs: string[] = []) => {
      console.log("Tworzenie nowej playlisty:", name);
      console.log("Wybrane utwory:", selectedSongs);
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name,
        songs: selectedSongs,
      };
      setPlaylists((prevPlaylists) => {
        const updatedPlaylists = [...prevPlaylists, newPlaylist];
        console.log("Zaktualizowane playlisty:", updatedPlaylists);
        return updatedPlaylists;
      });
      // TODO: Zaimplementuj logikę zapisywania playlisty w bazie danych
    },
    []
  );

  const handleCreateEmptyPlaylist = useCallback(() => {
    const name = prompt("Podaj nazwę nowej playlisty:");
    if (name) {
      handleCreatePlaylist(name, []);
    }
  }, [handleCreatePlaylist]);

  const handleAddToExistingPlaylist = useCallback(
    (playlistId: string, selectedSongs: string[]) => {
      console.log("handleAddToExistingPlaylist - playlistId:", playlistId);
      console.log(
        "handleAddToExistingPlaylist - selectedSongs:",
        selectedSongs
      );
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songs: [...new Set([...playlist.songs, ...selectedSongs])],
              }
            : playlist
        )
      );
      // TODO: Zaimplementuj logikę aktualizacji playlisty w bazie danych
    },
    []
  );

  const handleRemoveSongFromPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songs: playlist.songs.filter((id) => id !== songId),
              }
            : playlist
        )
      );
      // TODO: Zaimplementuj logikę aktualizacji playlisty w bazie danych
    },
    []
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSongs() as any).then((action: any) => {
        if (action.payload) {
          const mappedSongs = action.payload.map((song: any) => ({
            ...song,
            id: song._id,
          }));
          dispatch({ type: "songs/setSongs", payload: mappedSongs });
        }
      });
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("Stan playlist po aktualizacji:", playlists);
  }, [playlists]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Ładowanie...
      </div>
    );
  }
  if (status === "failed") {
    return <div className="text-red-500 text-center">Błąd: {error}</div>;
  }

  console.log("Playlists przed renderowaniem:", playlists);
  console.log(
    "Songs przed renderowaniem:",
    songs.map((song) => ({ id: song.id, _id: song._id }))
  );

  return (
    <div className="music-page bg-gray-100 min-h-screen flex flex-col">
      <BaciataRisingBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lewa kolumna */}
          <div className="lg:w-2/3 space-y-6">
            <MusicPlayer
              songs={songs}
              onCreatePlaylist={handleCreatePlaylist}
            />
            <SimilarSongs currentSong={songs[currentSongIndex] || null} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Statystyki odtwarzania
              </h2>
              <PlaybackStatistics />
            </div>
          </div>

          {/* Prawa kolumna */}
          <div className="lg:w-1/3 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Zarządzaj playlistami
              </h2>
              {/* <CreatePlaylist
                songs={songs}
                onCreatePlaylist={handleCreatePlaylist}
                existingPlaylists={playlists}
                onAddToExistingPlaylist={handleAddToExistingPlaylist}
              /> Zastanówmy sie czy potrzebujemy tego modułu w takiej nie intuicyjnej formie tworzenia playlist*/}

              <PlaylistManager
                playlists={playlists}
                songs={songs}
                onDeletePlaylist={(playlistId: string) => {
                  setPlaylists((prevPlaylists) =>
                    prevPlaylists.filter((p) => p.id !== playlistId)
                  );
                  // TODO: Zaimplementuj logikę usuwania playlisty z bazy danych
                }}
                onRenamePlaylist={(playlistId: string, newName: string) => {
                  setPlaylists((prevPlaylists) =>
                    prevPlaylists.map((p) =>
                      p.id === playlistId ? { ...p, name: newName } : p
                    )
                  );
                  // TODO: Zaimplementuj logikę aktualizacji nazwy playlisty w bazie danych
                }}
                onRemoveSongFromPlaylist={handleRemoveSongFromPlaylist}
              />
              {/* <PlaylistList playlists={playlists} /> Zastanówmy sie czy potrzebujemy tej listy.*/}
            </div>
            {/* <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Lista utworów
              </h2>
              <SongList
                songs={songs}
                onCreatePlaylist={handleCreateEmptyPlaylist}
                visibleSongs={songs.length}
                currentSongIndex={currentSongIndex}
                isPlaying={false}
                onSongSelect={(index) => dispatch(setCurrentSongIndex(index))}
                onLoadMore={() => {}}
                onCollapse={() => {}}
                isPopularList={false}
              /> Zastanówmy sie czy potrzebujemy tej listy.
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
