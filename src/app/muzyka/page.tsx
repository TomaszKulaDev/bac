// src/app/muzyka/page.tsx
"use client";

import { useEffect, useCallback, useMemo, useState, useRef } from "react";
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
import SongList from "./components/songs/SongList";
import PlaylistManager from "./components/PlaylistManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Z_INDEX } from "@/app/constants/zIndex";
import { useResponsive } from "./hooks/useResponsive";
import { useDebugEffect } from "./hooks/useDebugEffect";
import LoadingState from "./components/LoadingState";
import { usePlaylistManagement } from "./hooks/usePlaylistManagement";
import { useSongNavigation } from "./hooks/useSongNavigation";
import { useSortedAndFilteredSongs } from "./hooks/useSortedAndFilteredSongs";
import Image from "next/image";
import { getYouTubeThumbnail } from "./utils/youtube";
import { usePlaylistData } from "./hooks/usePlaylistData";
import SongGrid from "./components/songs/SongGrid";
import { useSecuredPlaylistOperations } from "./hooks/useSecuredPlaylistOperations";
import { useLike } from "@/app/muzyka/hooks/useLike";
import { useSession } from "next-auth/react";

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

interface PlaylistHeaderProps {
  filteredSongsCount: number;
  dominantColor: string;
  onPlay: () => void;
  isPlaying: boolean;
  songs: Song[];
}

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

  const showSuccessToast = useCallback(
    (message: string) => toast.success(message),
    []
  );
  const showErrorToast = useCallback(
    (message: string) => toast.error(message),
    []
  );
  const showInfoToast = useCallback(
    (message: string) => toast.info(message),
    []
  );

  const { playlists: playlistData, isLoading: playlistsLoading } =
    usePlaylistData({
      isAuthenticated,
    });

  useEffect(() => {
    updateContainerPadding();
  }, [updateContainerPadding]);

  const mapApiPlaylist = (apiPlaylist: any): Playlist => {
    const id = apiPlaylist._id || apiPlaylist.id;
    return {
      _id: id,
      id: id,
      name: apiPlaylist.name,
      userId: apiPlaylist.userId,
      songs: apiPlaylist.songs,
      createdAt: new Date(apiPlaylist.createdAt),
    };
  };

  const { secureOperation } = useSecuredPlaylistOperations({
    isAuthenticated,
    showErrorToast,
    showSuccessToast,
  });

  const refreshPlaylists = useCallback(async () => {
    await secureOperation(
      async () => {
        const response = await fetch("/api/musisite/playlists", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) throw new Error("Błąd pobierania playlist");
        const data = await response.json();
        setPlaylists(data.map(mapApiPlaylist));
      },
      {
        requireAuth: true,
        errorMessage: "Nie można odświeżyć playlist - brak dostępu",
      }
    );
  }, [secureOperation]);

  useEffect(() => {
    refreshPlaylists();
  }, [refreshPlaylists]);

  const handleCreateEmptyPlaylist = async (name: string) => {
    try {
      const response = await fetch("/api/musisite/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, songs: [] }),
      });

      if (!response.ok) throw new Error("Błąd tworzenia playlisty");

      const data = await response.json();
      await refreshPlaylists();
      setExpandedPlaylist(data.id);
    } catch (error) {
      console.error("handleCreateEmptyPlaylist: Error", error);
      showErrorToast("Nie udało się utworzyć playlisty");
    }
  };

  const sortedSongs = useSortedAndFilteredSongs(
    songs,
    sortBy,
    sortOrder,
    filterText,
    currentPlaylistId,
    playlists
  );

  const { getCurrentIndex, nextSong, previousSong, playPlaylist } =
    useSongNavigation({
      currentSong: songs[currentSongIndex],
      songs,
      sortedSongs,
      playlists,
      currentPlaylistId,
      repeatMode: {
        song: "off",
        playlist: "off",
      },
      setIsPlaying,
      setIsLoading,
      setCurrentPlaylistId,
      sortBy,
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
    setCurrentPlaylistId,
    onRemoveSong: undefined,
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

  const handleAutoPlay = useCallback(() => {
    if (isPlaying) {
      nextSong();
    }
  }, [isPlaying, nextSong]);

  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      const response = await fetch(`/api/musisite/playlists/${playlistId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Błąd usuwania playlisty");

      await refreshPlaylists();
      showSuccessToast("Playlista została usunięta");

      console.log("Playlista usunięta:", playlistId);
    } catch (error) {
      console.error("Błąd podczas usuwania playlisty:", error);
      showErrorToast("Nie udało się usunąć playlisty");
      throw error;
    }
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (songs) {
      setFilteredSongs(songs);
    }
  }, [songs]);

  const handlePlayHeader = useCallback(() => {
    if (!songs.length) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (!currentSongIndex) {
        dispatch(setCurrentSongIndex(0));
      }
      setIsPlaying(true);
    }
  }, [isPlaying, songs, currentSongIndex, dispatch]);

  const { handleLike } = useLike();

  const handleSongSelect = (songId: string) => {
    // ...
  };

  const handleAddToPlaylist = async (playlistId: string, songId: string) => {
    try {
      const response = await fetch(`/api/musisite/playlists/${playlistId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId }),
      });

      if (!response.ok) throw new Error("Błąd dodawania utworu do playlisty");

      await refreshPlaylists();
      showSuccessToast("Utwór został dodany do playlisty");
    } catch (error) {
      console.error("Błąd podczas dodawania utworu do playlisty:", error);
      showErrorToast("Nie udało się dodać utworu do playlisty");
    }
  };

  const handleToggleFavorite = (songId: string) => {
    // ...
  };

  const { data: session } = useSession();

  if (status === "loading") {
    return <LoadingState error={error} />;
  }
  if (status === "failed") {
    return <LoadingState error={error} />;
  }

  return (
    <main
      className="music-page min-h-screen flex flex-col"
      role="main"
      aria-label="Kolekcja muzyki Bachata"
      itemScope
      itemType="https://schema.org/MusicPlaylist"
    >
      <nav
        aria-label="Filtry muzyki"
        role="navigation"
        className="filters-navigation"
      ></nav>

      <article
        className="flex-grow flex flex-col lg:flex-row bg-white relative z-10 shadow-xl"
        role="article"
        aria-label="Lista utworów"
      >
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
                dispatch(
                  setCurrentSongIndex(
                    songs.findIndex((s) => s.id === playlist.songs[0])
                  )
                );
              }
            }}
            playlists={playlists}
            onUpdatePlaylists={setPlaylists}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            showSuccessToast={showSuccessToast}
            showErrorToast={showErrorToast}
            showInfoToast={showInfoToast}
            isAuthenticated={!!session}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setPlaylists={setPlaylists}
            setCurrentPlaylistId={setCurrentPlaylistId}
          />
        </div>
      </article>
      {isMobile && (
        <aside
          className="w-full p-8 mt-8 mb-24 bg-gradient-to-br from-blue-50 to-blue-50 rounded-lg shadow-lg"
          role="complementary"
          aria-label="Informacje dodatkowe"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Popularne tagi
          </h1>
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
        </aside>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        style={{ zIndex: Z_INDEX.TOAST }}
      />

      <article
        className="prose prose-lg"
        itemScope
        itemType="https://schema.org/Article"
      >
        <meta itemProp="headline" content="Kolekcja Muzyki Bachata" />
        <meta itemProp="author" content="Baciata.pl" />
        <meta itemProp="datePublished" content="2024-03-21" />
        {/* ... reszta contentu ... */}
      </article>
    </main>
  );
};

export default MusicPage;
