// src/components/MusicPlayer.tsx
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import YouTube, { YouTubeProps } from "react-youtube";
import {
  FaPlay,
  FaPause,
  FaMusic,
  FaChevronDown,
  FaChevronUp,
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaRedo,
  FaRedoAlt,
  FaRetweet,
  FaBackward,
  FaForward,
  FaPlus,
} from "react-icons/fa";
import { Song, Playlist, RepeatMode } from "../types";
import { RootState } from "../../../store/store";
import SongList from "./SongList";
import {
  setCurrentSongIndex,
  syncSongsWithPlaylists,
} from "@/store/slices/features/songsSlice";
import { sortSongs } from "../utils/sortUtils";
import CreatePlaylistModal from "./CreatePlaylistModal";
import SortControl from "./SortControl";

interface MusicPlayerProps {
  songs: Song[];
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  isMobile: boolean;
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  currentPlaylistId: string | null;
  onPlayPlaylist: (playlistId: string) => void;
  playlists: Playlist[];
  onUpdatePlaylists: (
    updater: (prevPlaylists: Playlist[]) => Playlist[]
  ) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Komponent MusicPlayer
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  songs,
  onAddToPlaylist,
  expandedPlaylist,
  setExpandedPlaylist,
  filterText,
  setFilterText,
  isMobile,
  onCreatePlaylist,
  currentPlaylistId,
  onPlayPlaylist,
  playlists,
  onUpdatePlaylists,
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const currentSong = useSelector(
    (state: RootState) => state.songs.songs[state.songs.currentSongIndex]
  );

  // Stan odtwarzania
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<any>(null);
  const [visibleSongs, setVisibleSongs] = useState(7);
  const initialVisibleSongs = 7;
  const songsPerLoad = 10;
  const [player, setPlayer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [playerDimensions, setPlayerDimensions] = useState({
    width: "100%",
    height: "300px",
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isMinimalistic, setIsMinimalistic] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState<
    { id: string; name: string }[]
  >([]);

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const [sortBy, setSortBy] = useState<"date" | "title" | "artist" | "impro" | "beginnerFriendly">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const onSortChange = (newSortBy: "date" | "title" | "artist" | "impro" | "beginnerFriendly", newSortOrder: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Funkcja wywoływana, gdy odtwarzacz jest gotowy
  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    setIsLoading(false);
  };

  // Funkcja do odtwarzania poprzedniego utworu
  const previousSong = () => {
    if (currentPlaylistId) {
      const currentPlaylist = playlists.find(
        (p: Playlist) => p.id === currentPlaylistId
      );
      if (currentPlaylist) {
        const currentIndex = currentPlaylist.songs.indexOf(currentSong.id);
        let prevIndex;

        if (repeatMode.song === "on") {
          prevIndex = currentIndex;
        } else if (currentIndex > 0) {
          prevIndex = currentIndex - 1;
        } else if (repeatMode.playlist === "on") {
          prevIndex = currentPlaylist.songs.length - 1;
        } else {
          return; // Nie odtwarzaj poprzedniego utworu, jeśli to pierwszy i nie ma powtarzania
        }

        const prevSongId = currentPlaylist.songs[prevIndex];
        dispatch(
          setCurrentSongIndex(songs.findIndex((s) => s.id === prevSongId))
        );
      }
    } else {
      const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
      let prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      dispatch(setCurrentSongIndex(prevIndex));
    }
    setIsPlaying(true);
    setIsLoading(true);
  };

  // Funkcja do przełączania odtwarzania
  const togglePlayback = useCallback(() => {
    if (player && isPlayerReady) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  }, [player, isPlaying, isPlayerReady]);

  // Funkcja do odtwarzania następnego utworu
  const nextSong = () => {
    if (currentPlaylistId) {
      const currentPlaylist = playlists.find(
        (p: Playlist) => p.id === currentPlaylistId
      );
      if (currentPlaylist) {
        const currentIndex = currentPlaylist.songs.indexOf(currentSong.id);
        let nextIndex = (currentIndex + 1) % currentPlaylist.songs.length;
        const nextSongId = currentPlaylist.songs[nextIndex];
        dispatch(
          setCurrentSongIndex(songs.findIndex((s) => s.id === nextSongId))
        );
      }
    } else {
      const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
      let nextIndex = (currentIndex + 1) % songs.length;
      dispatch(setCurrentSongIndex(nextIndex));
    }
    setIsPlaying(true);
    setIsLoading(true);
  };

  // Funkcja do ładowania większej liczby utworów
  const loadMoreSongs = useCallback(() => {
    setVisibleSongs((prevVisible) =>
      Math.min(prevVisible + songsPerLoad, songs.length)
    );
  }, [songsPerLoad, songs.length]);

  // Funkcja do zwijania listy utworów
  const collapseSongList = () => {
    setVisibleSongs(initialVisibleSongs);
  };

  // Funkcja wywoływana, gdy odtwarzacz jest gotowy
  const onReady = (event: { target: any }) => {
    if (event.target && typeof event.target.loadVideoById === "function") {
      setPlayer(event.target);
      setIsPlayerReady(true);
      setError(null);
    } else {
      console.error("Nie można zainicjalizować odtwarzacza YouTube");
      setError("Nie można załadować odtwarzacza YouTube");
    }
  };

  // Funkcja do aktualizacji wymiarów odtwarzacza
  const updatePlayerDimensions = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setPlayerDimensions({ width: "100%", height: "200px" });
    } else if (width < 1024) {
      setPlayerDimensions({ width: "100%", height: "300px" });
    } else {
      setPlayerDimensions({ width: "100%", height: "360px" });
    }
  }, []);

  // Efekt do aktualizacji wymiarów odtwarzacza przy zmianie rozmiaru okna
  useEffect(() => {
    updatePlayerDimensions();
    window.addEventListener("resize", updatePlayerDimensions, {
      passive: true,
    });
    return () => window.removeEventListener("resize", updatePlayerDimensions);
  }, [updatePlayerDimensions]);

  // Efekt do sprawdzania, czy ekran jest mały
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Zapamiętana lista utworów
  const MemoizedSongList = React.memo(SongList);

  // Funkcja do obsługi wyboru utworu
  const handleSongSelect = useCallback(
    (songId: string) => {
      const index = songs.findIndex((s) => s.id === songId);
      if (index !== -1) {
        dispatch(setCurrentSongIndex(index));
        setIsPlaying(true);
        setIsLoading(true);
      }
    },
    [dispatch, songs]
  );

  // Funkcja do przełączania trybu minimalistycznego
  const toggleMinimalisticMode = () => {
    setIsMinimalistic(!isMinimalistic);
  };

  // Funkcja do dodawania utworu do playlisty
  const handleAddToPlaylist = useCallback(
    (songId: string) => {
      if (expandedPlaylist) {
        onAddToPlaylist(expandedPlaylist, songId);
      }
    },
    [expandedPlaylist, onAddToPlaylist]
  );

  // Funkcja do dodawania utworu do playlisty
  const addSongToPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      onUpdatePlaylists((prevPlaylists: Playlist[]) =>
        prevPlaylists.map((playlist) => {
          if (playlist.id === playlistId) {
            return { ...playlist, songs: [...playlist.songs, songId] };
          }
          return playlist;
        })
      );
    },
    [onUpdatePlaylists]
  );

  // Funkcja do usuwania utworu z playlisty
  const removeSongFromPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      onUpdatePlaylists((prevPlaylists: Playlist[]) =>
        prevPlaylists.map((playlist) => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              songs: playlist.songs.filter((id) => id !== songId),
            };
          }
          return playlist;
        })
      );
    },
    [onUpdatePlaylists]
  );

  // Funkcja do edytowania nazwy playlisty
  const editPlaylistName = useCallback(
    (playlistId: string, newName: string) => {
      onUpdatePlaylists((prevPlaylists: Playlist[]) =>
        prevPlaylists.map((playlist) => {
          if (playlist.id === playlistId) {
            return { ...playlist, name: newName };
          }
          return playlist;
        })
      );
    },
    [onUpdatePlaylists]
  );

  const deletePlaylist = useCallback(
    (playlistId: string) => {
      onUpdatePlaylists((prevPlaylists: Playlist[]) =>
        prevPlaylists.filter((playlist: Playlist) => playlist.id !== playlistId)
      );
      if (currentPlaylistId === playlistId) {
        onPlayPlaylist("");
      }
    },
    [onUpdatePlaylists, onPlayPlaylist, currentPlaylistId]
  );

  const sortedAndFilteredSongs = useMemo(() => {
    let result = currentPlaylistId
      ? songs.filter(song => 
          playlists.find(p => p.id === currentPlaylistId)?.songs.includes(song.id)
        )
      : songs;

    if (filterText) {
      result = result.filter(
        (song) =>
          song.title.toLowerCase().includes(filterText.toLowerCase()) ||
          song.artist.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    return sortSongs(result, sortBy, sortOrder);
  }, [songs, currentPlaylistId, playlists, filterText, sortBy, sortOrder]);

  useEffect(() => {
    const allPlaylistNames = playlists.map((p: Playlist) => p.name);
    dispatch(syncSongsWithPlaylists(allPlaylistNames) as unknown as AnyAction);
  }, [dispatch, playlists]);

  // Funkcja do mieszania playlisty
  const shufflePlaylist = () => {
    const shuffledSongs = [...sortedAndFilteredSongs].sort(
      () => Math.random() - 0.5
    );
    dispatch(
      setCurrentSongIndex(
        songs.findIndex((song) => song.id === shuffledSongs[0].id)
      )
    );
  };

  // Funkcja do przełączania trybu powtarzania
  const [repeatMode, setRepeatMode] = useState<RepeatMode>({
    playlist: "off",
    song: "off",
  });

  const toggleRepeatMode = (mode: "playlist" | "song") => {
    setRepeatMode((prevMode) => ({
      ...prevMode,
      [mode]: prevMode[mode] === "off" ? "on" : "off",
    }));
  };

  const currentPlaylist = useMemo(
    () => playlists.find((p) => p.id === currentPlaylistId),
    [playlists, currentPlaylistId]
  );

  const filteredSongs = useMemo(() => {
    if (currentPlaylistId) {
      const currentPlaylist = playlists.find((p) => p.id === currentPlaylistId);
      return currentPlaylist
        ? songs.filter((song) => currentPlaylist.songs.includes(song.id))
        : [];
    }
    return songs;
  }, [currentPlaylistId, playlists, songs]);

  // Komponent MusicPlayer - główny komponent odtwarzacza muzyki
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
        <h1 className="text-3xl font-bold text-white">Bachata Top Playlist 2024</h1>
        <p className="text-white">8 utworów • Zaktualizowano: 18.10.2024</p>
      </div>
      <div className="w-full mb-4 bg-gray-100">
        <SortControl
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          filterText={filterText}
          setFilterText={setFilterText}
        />
      </div>
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="md:order-2 md:w-3/5 flex flex-col">
          <div className="sticky top-0 bg-white z-10 p-6 shadow-md">
            <div
              className="youtube-player mb-6 rounded-lg overflow-hidden"
              style={{
                width: playerDimensions.width,
                height: playerDimensions.height,
              }}
            >
              {error && (
                <div className="error-message bg-red-100 text-red-700 p-4 rounded">
                  {error}
                </div>
              )}
              {songs.length > 0 && (
                <YouTube
                  videoId={currentSong?.youtubeId}
                  opts={opts}
                  onReady={onReady}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnd={() => {
                    if (repeatMode.song === "on") {
                      if (player) {
                        player.seekTo(0);
                        player.playVideo();
                      }
                    } else {
                      nextSong();
                    }
                  }}
                  className="w-full h-full"
                />
              )}
            </div>
            <div className="flex flex-col space-y-4 mt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentSong?.title}
                </h2>
                <p className="text-lg text-gray-600">{currentSong?.artist}</p>
              </div>
              <div className="flex flex-col items-center space-y-6 mt-6">
                <div className="flex justify-center items-center space-x-4 w-full">
                  <button
                    onClick={() => toggleRepeatMode("playlist")}
                    className={`text-gray-600 p-3 rounded-full transition-all duration-300 ease-in-out ${
                      repeatMode.playlist === "on"
                        ? "bg-gray-100 shadow-inner transform translate-y-px"
                        : "bg-white hover:bg-gray-50 active:bg-gray-100 active:shadow-inner active:transform active:translate-y-px"
                    }`}
                    aria-label={`Powtarzaj playlistę: ${
                      repeatMode.playlist === "on" ? "włączone" : "wyłączone"
                    }`}
                    title="Powtarzaj playlistę"
                  >
                    <FaRedo
                      size={28}
                      className={
                        repeatMode.playlist === "on" ? "text-purple-500" : ""
                      }
                    />
                  </button>
                  <button
                    onClick={previousSong}
                    className="text-gray-600 hover:text-gray-800 p-3 transition-all duration-150 ease-in-out active:scale-95"
                    aria-label="Poprzedni utwór"
                    title="Poprzedni utwór"
                  >
                    <FaBackward size={28} />
                  </button>
                  <button
                    onClick={togglePlayback}
                    className="bg-white rounded-full p-6 shadow-lg transition-all duration-150 ease-in-out active:scale-95"
                    aria-label={isPlaying ? "Pauza" : "Odtwórz"}
                    title={isPlaying ? "Pauza" : "Odtwórz"}
                  >
                    {isPlaying ? <FaPause size={40} /> : <FaPlay size={40} />}
                  </button>
                  <button
                    onClick={nextSong}
                    className="text-gray-600 hover:text-gray-800 p-3 transition-all duration-150 ease-in-out active:scale-95"
                    aria-label="Następny utwór"
                    title="Następny utwór"
                  >
                    <FaForward size={28} />
                  </button>
                  <button
                    onClick={() => toggleRepeatMode("song")}
                    className={`text-gray-600 p-3 rounded-full transition-all duration-300 ease-in-out ${
                      repeatMode.song === "on"
                        ? "bg-gray-100 shadow-inner transform translate-y-px"
                        : "bg-white hover:bg-gray-50 active:bg-gray-100 active:shadow-inner active:transform active:translate-y-px"
                    }`}
                    aria-label={`Powtarzaj utwór: ${
                      repeatMode.song === "on" ? "włączone" : "wyłączone"
                    }`}
                    title="Powtarzaj utwór"
                  >
                    <FaRetweet
                      size={28}
                      className={
                        repeatMode.song === "on" ? "text-purple-500" : ""
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isMobile && (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mb-4 flex items-center justify-center"
              aria-label="Utwórz nową playlistę"
              title="Utwórz nową playlistę"
            >
              <FaPlus className="mr-2" /> Utwórz nową playlistę
            </button>
            {isModalOpen && (
              <CreatePlaylistModal
                onClose={() => setIsModalOpen(false)}
                onCreatePlaylist={onCreatePlaylist}
              />
            )}
          </>
        )}
        {currentPlaylistId && (
          <button
            onClick={() => onPlayPlaylist("")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300 mb-4"
          >
            Powrót do wszystkich utworów.
            <br /> Dodaj więcej ulubionych.
          </button>
        )}

        <SongList
          songs={sortedAndFilteredSongs}
          visibleSongs={sortedAndFilteredSongs.length}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onSongSelect={(songId) => {
            const index = songs.findIndex((s) => s.id === songId);
            if (index !== -1) {
              dispatch(setCurrentSongIndex(index));
            }
          }}
          onLoadMore={() => {}}
          onCollapse={() => {}}
          isPopularList={false}
          expandedPlaylist={expandedPlaylist}
          setExpandedPlaylist={setExpandedPlaylist}
          onAddToPlaylist={handleAddToPlaylist}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          filterText={filterText}
          setFilterText={setFilterText}
          isPlaylistExpanded={!!expandedPlaylist}
          showSearch={false}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
