// src/app/muzyka/page.tsx
"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import MusicPlayer from "./components/MusicPlayer";
import {
  fetchSongs,
  setCurrentSongIndex,
  updateSongsPlaylists,
} from "@/store/slices/features/songsSlice";
import { Song, Playlist } from "./types";
import { RootState } from "@/store/store";
import BaciataRisingBanner from "./components/BaciataRisingBanner";
import SongList from "./components/SongList";
import PlaylistManager from "./components/PlaylistManager";
import Toast from "./components/Toast";

const MusicPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, status, error, currentSongIndex } = useSelector(
    (state: RootState) => state.songs
  );

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "title" | "artist">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterText, setFilterText] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCreatePlaylist = useCallback(
    (name: string, selectedSongs: string[] = []) => {
      console.log("Tworzenie nowej playlisty:", name);
      console.log("Wybrane utwory:", selectedSongs);
      const newPlaylistId = Date.now().toString();
      const newPlaylist: Playlist = {
        id: newPlaylistId,
        name,
        songs: selectedSongs,
      };
      setPlaylists((prevPlaylists) => {
        const updatedPlaylists = [...prevPlaylists, newPlaylist];
        console.log("Zaktualizowane playlisty:", updatedPlaylists);
        return updatedPlaylists;
      });
      setExpandedPlaylist(newPlaylistId);
      // TODO: Zaimplementuj logikę zapisywania playlisty w bazie danych
    },
    [setExpandedPlaylist]
  );

  const handleCreateEmptyPlaylist = useCallback(() => {
    const name = prompt("Podaj nazwę nowej playlisty:");
    if (name) {
      handleCreatePlaylist(name, []);
    }
  }, [handleCreatePlaylist]);

  const handleAddToExistingPlaylist = useCallback(
    (playlistId: string, songIdOrIds: string | string[]) => {
      const playlist = playlists.find((p) => p.id === playlistId);
      if (!playlist) {
        console.error("Próba dodania utworu do nieistniejącej playlisty");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        return;
      }

      console.log("handleAddToExistingPlaylist - playlistId:", playlistId);
      console.log("handleAddToExistingPlaylist - songIdOrIds:", songIdOrIds);

      const playlistName =
        playlists.find((p) => p.id === playlistId)?.name || "";

      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songs: [
                  ...new Set([
                    ...playlist.songs,
                    ...(Array.isArray(songIdOrIds)
                      ? songIdOrIds
                      : [songIdOrIds]),
                  ]),
                ],
              }
            : playlist
        )
      );

      const songIds = Array.isArray(songIdOrIds) ? songIdOrIds : [songIdOrIds];
      dispatch(updateSongsPlaylists({ songIds, playlistId, playlistName }))
        .unwrap()
        .then(() => {
          console.log("Playlists updated successfully");
        })
        .catch((error: unknown) => {
          console.error("Failed to update playlists:", error);
        });
    },
    [dispatch, playlists]
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
      const playlistName =
        playlists.find((p) => p.id === playlistId)?.name || "";
      dispatch(
        updateSongsPlaylists({
          songIds: [songId],
          playlistId,
          playlistName,
          remove: true,
        })
      )
        .unwrap()
        .then(() => {
          console.log("Song removed from playlist successfully");
        })
        .catch((error: unknown) => {
          console.error("Failed to remove song from playlist:", error);
        });
    },
    [dispatch, playlists]
  );

  const filteredSongs = useMemo(() => {
    if (!filterText) return songs;
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(filterText.toLowerCase()) ||
        song.artist.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [songs, filterText]);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        {!isMobile && (
          <input
            type="text"
            placeholder="Filtruj utwory..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        )}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 space-y-6">
            <MusicPlayer
              songs={songs}
              onCreatePlaylist={handleCreateEmptyPlaylist}
              onAddToPlaylist={(playlistId, songId) =>
                handleAddToExistingPlaylist(playlistId, songId)
              }
              expandedPlaylist={expandedPlaylist}
              setExpandedPlaylist={setExpandedPlaylist}
              filterText={filterText}
              setFilterText={setFilterText}
              isMobile={isMobile}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Statystyki odtwarzania
              </h2>
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Zarządzaj playlistami
              </h2>
              {!isMobile && (
                <button
                  onClick={handleCreateEmptyPlaylist}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300 mb-4"
                >
                  + Utwórz nową playlistę
                </button>
              )}
              <PlaylistManager
                playlists={playlists}
                songs={songs}
                expandedPlaylist={expandedPlaylist}
                setExpandedPlaylist={setExpandedPlaylist}
                onCreatePlaylist={handleCreatePlaylist}
                onDeletePlaylist={(playlistId: string) => {
                  const playlistToDelete = playlists.find(
                    (p) => p.id === playlistId
                  );
                  if (playlistToDelete) {
                    setPlaylists((prevPlaylists) =>
                      prevPlaylists.filter((p) => p.id !== playlistId)
                    );

                    // Aktualizacja stanu piosenek
                    dispatch(
                      updateSongsPlaylists({
                        songIds: playlistToDelete.songs,
                        playlistId,
                        playlistName: playlistToDelete.name,
                        remove: true,
                      })
                    );
                  }
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
            </div>
          </div>
        </div>
      </div>
      {showNotification && (
        <Toast message="Najpierw stwórz lub wybierz playlistę, aby dodać do niej utwór." />
      )}
    </div>
  );
};

export default MusicPage;