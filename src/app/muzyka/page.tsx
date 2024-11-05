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
import { useDebugEffect } from "./hooks/useDebugEffect";
import LoadingState from "./components/LoadingState";
import { usePlaylistManagement } from "./hooks/usePlaylistManagement";
import { useSongNavigation } from "./hooks/useSongNavigation";
import { useSortedAndFilteredSongs } from "./hooks/useSortedAndFilteredSongs";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const showSuccessToast = useCallback((message: string) => toast.success(message), []);
  const showErrorToast = useCallback((message: string) => toast.error(message), []);
  const showInfoToast = useCallback((message: string) => toast.info(message), []);

  useEffect(() => {
    updateContainerPadding();
  }, [updateContainerPadding]);

  const handleCreateEmptyPlaylist = useCallback((name: string, selectedSongs: string[] = []) => {
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby utworzyć playlistę");
      return;
    }
    
    const newPlaylist: Playlist = {
      id: generateUniqueId(),
      name,
      songs: selectedSongs,
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
    setExpandedPlaylist(newPlaylist.id);
    showSuccessToast(`Utworzono nową playlistę "${name}"`);
  }, [isAuthenticated, showSuccessToast, showErrorToast, setExpandedPlaylist]);

  const sortedSongs = useSortedAndFilteredSongs(songs, sortBy, sortOrder, filterText, currentPlaylistId);

  const { getCurrentIndex, nextSong, previousSong, playPlaylist } = useSongNavigation({
    currentSong: songs[currentSongIndex],
    songs,
    sortedSongs,
    playlists,
    currentPlaylistId,
    repeatMode: {
      song: "off",
      playlist: "off"
    },
    setIsPlaying,
    setIsLoading,
    setCurrentPlaylistId
  });

  const playlistManagement = usePlaylistManagement({
    playlists,
    onUpdatePlaylists: setPlaylists,
    currentPlaylistId,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    isAuthenticated,
    songs,
    onCreatePlaylist: handleCreateEmptyPlaylist,
    onPlayPlaylist: playPlaylist,
    setCurrentPlaylistId
  });

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

  useDebugEffect("playlists", playlists);

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

  const handleAutoPlay = useCallback(() => {
    if (isPlaying) {
      nextSong();
    }
  }, [isPlaying, nextSong]);

  if (status === "loading") {
    return (
      <LoadingState error={error} />
    );
  }
  if (status === "failed") {
    return <LoadingState error={error} />;
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
        <div className="w-full p-4">
          <MusicPlayer
            songs={songs}
            onCreatePlaylist={handleCreateEmptyPlaylist}
            onAddToPlaylist={playlistManagement.addSongToPlaylist}
            expandedPlaylist={expandedPlaylist}
            setExpandedPlaylist={setExpandedPlaylist}
            filterText={filterText}
            setFilterText={setFilterText}
            isMobile={isMobile}
            currentPlaylistId={currentPlaylistId}
            onPlayPlaylist={(playlistId) => {
              setCurrentPlaylistId(playlistId);
              const playlist = playlists.find((p) => p.id === playlistId);
              if (playlist && playlist.songs.length > 0) {
                dispatch(setCurrentSongIndex(songs.findIndex((s) => s.id === playlist.songs[0])));
              }
            } }
            playlists={playlists}
            onUpdatePlaylists={setPlaylists}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            showSuccessToast={showSuccessToast}
            showErrorToast={showErrorToast}
            showInfoToast={showInfoToast}
            isAuthenticated={isAuthenticated}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setPlaylists={setPlaylists}
            setCurrentPlaylistId={setCurrentPlaylistId}
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
