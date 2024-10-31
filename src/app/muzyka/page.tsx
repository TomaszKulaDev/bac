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
import SongList from "./components/songs/SongList";
import PlaylistManager from "./components/PlaylistManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Z_INDEX } from "@/app/constants/zIndex";
import { useResponsive } from "./hooks/useResponsive";
import PlaylistHeader from "./components/PlaylistHeader";

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const MusicPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, status, error, currentSongIndex } = useSelector(
    (state: RootState) => state.songs
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "title" | "artist">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterText, setFilterText] = useState("");
  const { isMobile, updateContainerPadding } = useResponsive();
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showSuccessToast = (message: string) => toast.success(message);
  const showErrorToast = (message: string) => toast.error(message);
  const showInfoToast = (message: string) => toast.info(message);

  useEffect(() => {
    updateContainerPadding();
  }, [updateContainerPadding]);

  const handleCreatePlaylist = useCallback(
    (name: string, selectedSongs: string[] = []) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby tworzyć playlisty.");
        return;
      }

      if (playlists.length >= 2) {
        alert(
          "Możesz stworzyć maksymalnie 2 playlisty. Usuń jedną z istniejących playlist, aby utworzyć nową."
        );
        return;
      }

      const playlistExists = playlists.some(
        (playlist) => playlist.name.toLowerCase() === name.toLowerCase()
      );
      if (playlistExists) {
        alert("Playlista o takiej nazwie już istnieje. Wybierz inną nazwę.");
        return;
      }

      const newPlaylistId = generateUniqueId();
      const newPlaylist: Playlist = {
        id: newPlaylistId,
        name,
        songs: selectedSongs,
      };
      setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
      setExpandedPlaylist(newPlaylistId);
    },
    [playlists, isAuthenticated]
  );

  const handleCreateEmptyPlaylist = useCallback(() => {
    const name = prompt("Podaj nazwę nowej playlisty:");
    if (name) {
      handleCreatePlaylist(name, []);
    }
  }, [handleCreatePlaylist]);

  const handleAddToExistingPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      const playlist = playlists.find((p) => p.id === playlistId);
      if (!playlist) {
        console.log("Nie można dodać utworu do nieistniejącej playlisty");
        return;
      }

      if (playlist.songs.includes(songId)) {
        console.log("Utwór już istnieje w tej playliście");
        return;
      }

      console.log("handleAddToExistingPlaylist - playlistId:", playlistId);
      console.log("handleAddToExistingPlaylist - songId:", songId);

      const playlistName = playlist.name;

      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((p) =>
          p.id === playlistId
            ? {
                ...p,
                songs: [songId, ...p.songs],
              }
            : p
        )
      );

      dispatch(
        updateSongsPlaylists({ songIds: [songId], playlistId, playlistName })
      )
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

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSongs() as any).then((action: any) => {
        if (action.payload) {
          const mappedSongs = action.payload.map((song: any) => ({
            ...song,
            id: song._id,
            impro: song.impro || false,
            beginnerFriendly: song.beginnerFriendly || false, // Dodaj tę linię
          }));
          dispatch({ type: "songs/setSongs", payload: mappedSongs });
        }
      });
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("Stan playlist po aktualizacji:", playlists);
  }, [playlists]);

  const memoizedSongs = useMemo(() => songs, [songs]);
  const memoizedPlaylists = useMemo(() => playlists, [playlists]);

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
    <div className="music-page min-h-screen flex flex-col">
      <PlaylistHeader
        filteredSongsCount={songs.length}
        onPlay={() => {
          if (songs.length > 0) {
            dispatch(setCurrentSongIndex(songs.length - 1));
          }
        }}
        onLike={() => {
          if (isAuthenticated) {
            // Logika dla polubienia playlisty
          } else {
            showErrorToast("Musisz być zalogowany, aby polubić playlistę.");
          }
        }}
        isLiked={false}
      />
      <div className="flex-grow flex flex-col lg:flex-row bg-white relative z-10 shadow-xl rounded-t-[2rem] -mt-20">
        <div className="w-full lg:w-2/3 p-4">
          <MusicPlayer
            songs={memoizedSongs}
            onCreatePlaylist={handleCreatePlaylist}
            onAddToPlaylist={handleAddToExistingPlaylist}
            expandedPlaylist={expandedPlaylist}
            setExpandedPlaylist={setExpandedPlaylist}
            filterText={filterText}
            setFilterText={setFilterText}
            isMobile={isMobile}
            currentPlaylistId={currentPlaylistId}
            playlists={memoizedPlaylists}
            onUpdatePlaylists={setPlaylists}
            onPlayPlaylist={(playlistId: string) => {
              setCurrentPlaylistId(playlistId);
              const playlist = playlists.find((p) => p.id === playlistId);
              if (playlist && playlist.songs.length > 0) {
                dispatch(
                  setCurrentSongIndex(
                    songs.findIndex((s) => s.id === playlist.songs[0])
                  )
                );
              }
            }}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            showSuccessToast={showSuccessToast}
            showErrorToast={showErrorToast}
            showInfoToast={showInfoToast}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className="w-full lg:w-1/3 p-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Twoje Playlisty
          </h2>
          <PlaylistManager
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            playlists={memoizedPlaylists}
            songs={memoizedSongs}
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
            isMobile={isMobile}
            onPlayPlaylist={(playlistId: string) => {
              setCurrentPlaylistId(playlistId);
              const playlist = playlists.find((p) => p.id === playlistId);
              if (playlist && playlist.songs.length > 0) {
                dispatch(
                  setCurrentSongIndex(
                    songs.findIndex((s) => s.id === playlist.songs[0])
                  )
                );
              }
            }}
            currentPlaylistId={currentPlaylistId}
            onAddToPlaylist={handleAddToExistingPlaylist}
            showSuccessToast={showSuccessToast}
            showErrorToast={showErrorToast}
            showInfoToast={showInfoToast}
          />
        </div>
      </div>
      {isMobile && (
        <section className="w-full p-8 mt-8 mb-24 bg-gradient-to-br from-blue-50 to-blue-50 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Popularne tagi
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              "bachata",
              "bachatasensual",
              "TopBachataMix",
              "bachatadance",
              "bachatasongs",
              "BachataMix",
            ].map((tag, index) => (
              <span
                key={index}
                className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
          <article className="prose prose-lg text-gray-700 mb-8 leading-relaxed">
            <p>
              Witaj w naszym muzycznym raju <strong>bachaty</strong>! Mamy tu
              wszystko - od starych, zakurzonych hitów prosto z dominikańskich
              piwnic, po nowoczesne kawałki <strong>bachaty</strong>, które
              sprawią, że nawet twoja babcia zacznie kręcić biodrami.
            </p>

            <p>
              Nasze playlisty <strong>bachaty</strong> to istne rollercoastery
              emocji - od romantycznych ballad, przy których będziesz płakać jak
              bóbr, po energiczne rytmy, które sprawią, że twoje stopy same
              zaczną tańczyć (nawet jeśli masz dwie lewe!).
            </p>

            <p>
              Zapraszamy do muzycznej podróży przez historię{" "}
              <strong>bachaty</strong> - od czasów, gdy instrumenty robiono z
              kokosów, po dzisiejsze elektroniczne cuda.
            </p>

            <p>
              Gwarantujemy, że po przesłuchaniu naszej kolekcji{" "}
              <strong>bachaty</strong> albo zostaniesz mistrzem tańca, albo
              przynajmniej mistrzem udawania, że umiesz tańczyć!
            </p>
          </article>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            Przeglądaj wszystkie tagi
          </button>
        </section>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        style={{ zIndex: Z_INDEX.TOAST }}
      />
    </div>
  );
};

export default MusicPage;
