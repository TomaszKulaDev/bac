// src/components/MusicPlayer.tsx
"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  ErrorInfo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import YouTube, { YouTubeProps } from "react-youtube";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaRetweet,
  FaBackward,
  FaForward,
  FaList,
  FaSort,
  FaMusic,
  FaPlus,
  FaTimes,
  FaEyeSlash,
  FaEye,
  FaArrowLeft,
} from "react-icons/fa";
import { Song, Playlist, RepeatMode, SortOrderType } from "../types";
import { RootState } from "../../../store/store";
import SongList from "./songs/SongList";
import {
  setCurrentSongIndex,
  syncSongsWithPlaylists,
} from "@/store/slices/features/songsSlice";
import CreatePlaylistModal from "./CreatePlaylistModal";
import SortControl from "./SortControl";
import PlaybackBar from "./playback/PlaybackBar";
import { getYouTubeThumbnail } from "../utils/youtube";
import { Z_INDEX } from "@/app/constants/zIndex";
import { useSortedAndFilteredSongs } from "../hooks/useSortedAndFilteredSongs";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";
import { usePlaybackControls } from "../hooks/usePlaybackControls";
import { PlayerErrorBoundary } from "./ErrorBoundary/PlayerErrorBoundary";
import { ErrorLogBuffer } from "../utils/ErrorLogBuffer";
import { YouTubeError } from "../utils/youtube";
import { useYouTubeErrorHandler } from "../hooks/useYouTubeErrorHandler";
import {
  CreatePlaylistDrawer,
  PlaylistSelectorDrawer,
} from "../components/drawers";
import { Tooltip } from "@/components/ui/Tooltip";
import { SortByType } from "../hooks/useDrawers";
import { motion, AnimatePresence } from "framer-motion";
import { useDrawers } from "../hooks/useDrawers";
import {
  usePlaylistManagement,
  UsePlaylistManagementProps,
} from "../hooks/usePlaylistManagement";
import PlaylistManager from "./PlaylistManager";
import "../styles/youtube-player.css";
import { setCurrentPlaylistId } from "@/store/slices/features/playlistSlice";
// import { DebugLogger } from "./DebugLogger";
import { deletePlaylistAndRefetch } from "@/store/slices/features/playlistSlice";
import { AppDispatch } from "@/store/store";
import { useSecuredPlaylistOperations } from "../hooks/useSecuredPlaylistOperations";
import { usePlaylistManager } from "../hooks/usePlaylistManager";
import { playerStyles as styles } from "@/styles/common/playerControls";

interface MusicPlayerProps {
  songs: Song[];
  playlists: Playlist[];
  currentPlaylistId: string | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  setCurrentPlaylistId: (id: string | null) => void;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  isMobile: boolean;
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  onPlayPlaylist: (playlistId: string) => void;
  onUpdatePlaylists: (
    updater: (prevPlaylists: Playlist[]) => Playlist[]
  ) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  isAuthenticated: boolean;
}

interface BrowserInfo {
  userAgent: string;
  platform: string;
  language: string;
}

const getBrowserInfo = (): BrowserInfo => ({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
});

// Komponent MusicPlayer
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  songs,
  playlists,
  currentPlaylistId,
  isPlaying,
  setIsPlaying,
  setPlaylists,
  setCurrentPlaylistId,
  onAddToPlaylist,
  expandedPlaylist,
  setExpandedPlaylist,
  filterText,
  setFilterText,
  isMobile,
  onCreatePlaylist,
  onPlayPlaylist,
  onUpdatePlaylists,
  isModalOpen,
  setIsModalOpen,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  isAuthenticated,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentSong = useSelector(
    (state: RootState) => state.songs.songs[state.songs.currentSongIndex]
  );

  const {
    player,
    playerRef,
    isLoading,
    setIsLoading,
    isPlayerReady,
    error,
    playerDimensions,
    opts,
    onReady,
    onPlay,
    onPause,
    setError,
    updatePlayerDimensions,
    isSmallScreen,
    setIsSmallScreen,
  } = useYouTubePlayer();

  const SONGS_PER_LOAD = 25; // Liczba utworów ładowanych na raz
  const INITIAL_VISIBLE_SONGS = 10; // Początkowa liczba widocznych utworów

  const [visibleSongs, setVisibleSongs] = useState(INITIAL_VISIBLE_SONGS);

  const [isMinimalistic, setIsMinimalistic] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

  const [repeatMode, setRepeatMode] = useState<RepeatMode>({
    song: "off",
    playlist: "off",
  });

  const [sortBy, setSortBy] = useState<SortByType>("date");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");
  const sortedAndFilteredSongs = useSortedAndFilteredSongs(
    songs,
    sortBy,
    sortOrder,
    filterText,
    currentPlaylistId,
    playlists
  );

  const { previousSong, togglePlayback, nextSong } = usePlaybackControls({
    setCurrentPlaylistId,
    player,
    isPlayerReady,
    currentSong,
    songs,
    sortedSongs: sortedAndFilteredSongs,
    playlists,
    currentPlaylistId,
    setIsPlaying,
    setIsLoading,
    repeatMode,
    isPlaying,
    sortBy,
  });

  // Funkcja do ładowania większej liczby utworów
  const loadMoreSongs = useCallback(() => {
    setVisibleSongs((prevVisible) => {
      const remainingSongs = songs.length - prevVisible;
      const increment = Math.min(SONGS_PER_LOAD, remainingSongs);
      return prevVisible + increment;
    });
  }, [songs.length]);

  // Funkcja do zwijania listy utworów
  const collapseSongList = () => {
    setVisibleSongs(INITIAL_VISIBLE_SONGS);
  };

  // Zapamiętana lista utworów
  const MemoizedSongList = React.memo(SongList);

  // Funkcja do obsługi wyboru utworu
  const handleSongSelect = useCallback(
    (songId: string) => {
      const index = songs.findIndex((s) => s.id === songId);
      if (index !== -1) {
        dispatch(setCurrentSongIndex(index));
        setIsPlaying(true);
        if (!currentPlaylistId) {
          setCurrentPlaylistId(null);
        }
      }
    },
    [songs, dispatch, setIsPlaying, currentPlaylistId, setCurrentPlaylistId]
  );

  // Funkcja do przełączania trybu minimalistycznego
  const toggleMinimalisticMode = () => {
    setIsMinimalistic(!isMinimalistic);
  };

  // Funkcja do dodawania utworu do playlisty
  const handleAddToPlaylist = useCallback(
    (songId: string) => {
      if (!expandedPlaylist) {
        showErrorToast("Nie wybrano playlisty");
        return;
      }

      const playlist = playlists.find((p) => p.id === expandedPlaylist);
      const song = songs.find((s) => s.id === songId);

      if (!playlist || !song) {
        showErrorToast("Nie można dodać utworu do playlisty");
        return;
      }

      if (playlist.songs.includes(songId)) {
        showInfoToast(
          `Utwór "${song.title}" jest już w playliście "${playlist.name}"`
        );
        return;
      }

      onAddToPlaylist(expandedPlaylist, songId);
    },
    [
      expandedPlaylist,
      onAddToPlaylist,
      songs,
      playlists,
      showErrorToast,
      showInfoToast,
    ]
  );

  const playlistManagement = usePlaylistManagement({
    playlists,
    onUpdatePlaylists,
    onPlayPlaylist,
    currentPlaylistId,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    isAuthenticated,
    songs,
    onCreatePlaylist,
    setCurrentPlaylistId,
  });

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
        songs.findIndex(
          (song) => song.id === shuffledSongs[shuffledSongs.length - 1].id
        )
      )
    );
  };

  const currentPlaylist = useMemo(
    () => playlists.find((p) => p.id === currentPlaylistId),
    [playlists, currentPlaylistId]
  );

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleSeek = (time: number) => {
    if (player) {
      player.seekTo(time);
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (player) {
      player.setVolume(newVolume * 100);
      setVolume(newVolume);
    }
  };

  useEffect(() => {
    if (player) {
      const interval = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
        setDuration(player.getDuration());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [player]);

  useEffect(() => {
    if (player && isPlayerReady) {
      setIsLoading(false);
    }
  }, [player, isPlayerReady, setIsLoading]);

  const getThumbnailSafely = useCallback(
    (youtubeId: string | undefined): string => {
      try {
        if (!youtubeId) {
          return "/images/default-thumbnail.jpg"; // Dodaj domyślną miniaturę
        }
        return getYouTubeThumbnail(youtubeId);
      } catch (error) {
        console.error("Błąd podczas pobierania miniatury:", error);
        return "/images/default-thumbnail.jpg";
      }
    },
    []
  );

  // Dodajemy funkcję toggleRepeatMode
  const toggleRepeatMode = useCallback((type: "song" | "playlist") => {
    setRepeatMode((prev) => ({
      ...prev,
      [type]: prev[type] === "on" ? "off" : "on",
    }));
  }, []);

  const { handleYouTubeError } = useYouTubeErrorHandler(showErrorToast);

  const handleError = useCallback(
    (error: Error, errorInfo?: ErrorInfo) => {
      const errorBuffer = ErrorLogBuffer.getInstance();

      if (error instanceof YouTubeError) {
        handleYouTubeError(error);
      } else {
        errorBuffer.add({
          type: "general",
          severity: "error",
          message: error.message,
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || "development",
          details: {
            componentStack: errorInfo?.componentStack || undefined,
          },
        });
        showErrorToast("Wystąpił błąd podczas odtwarzania");
      }
    },
    [handleYouTubeError, showErrorToast]
  );

  useEffect(() => {
    const errorBuffer = ErrorLogBuffer.getInstance();
    return () => errorBuffer.destroy();
  }, []);

  // Funkcje do zarządzania playlistami
  const { secureOperation } = useSecuredPlaylistOperations({
    isAuthenticated,
    showErrorToast,
    showSuccessToast,
  });

  const handleDeletePlaylist = async (playlistId: string) => {
    await secureOperation(
      () => dispatch(deletePlaylistAndRefetch(playlistId)).unwrap(),
      {
        errorMessage: "Nie masz uprawnień do usunięcia playlisty",
        successMessage: "Playlista została usunięta",
      }
    );
  };

  const handleRenamePlaylist = (id: string, newName: string) => {
    playlistManagement.editPlaylistName(id, newName);
  };

  const handleRemoveSongFromPlaylist = (playlistId: string, songId: string) => {
    playlistManagement.removeSongFromPlaylist(playlistId, songId);
  };

  const onSortChange = useCallback(
    (newSortBy: SortByType, newSortOrder: SortOrderType) => {
      setSortBy(newSortBy);
      setSortOrder(newSortOrder);
    },
    []
  );

  const {
    isPlaylistSelectorOpen,
    isCreatePlaylistDrawerOpen,
    isMobileDrawerOpen,
    showDrawerButton,
    hasReachedPlaylist,
    handlePlaylistSelect,
    handleCreatePlaylist,
    handleSortChange,
    toggleDrawer,
    closeAllDrawers,
    toggleButtonsVisibility,
    areButtonsHidden,
  } = useDrawers({
    isAuthenticated,
    showErrorToast,
    onCreatePlaylist,
    onPlayPlaylist,
    onSortChange,
    sortBy,
    sortOrder,
    isMobile,
    setIsModalOpen,
  });

  const debugInfo = useMemo(
    () => ({
      isMobile,
      showDrawerButton,
      hasReachedPlaylist,
      playlists: playlists.length,
    }),
    [isMobile, showDrawerButton, hasReachedPlaylist, playlists.length]
  );

  useEffect(() => {
    if (currentSong) {
      const newIndex = sortedAndFilteredSongs.findIndex(
        (s) => s.id === currentSong.id
      );
      if (newIndex === -1) {
        setIsPlaying(false);
      }
    }
  }, [
    sortBy,
    sortOrder,
    filterText,
    currentSong,
    setIsPlaying,
    sortedAndFilteredSongs,
  ]);

  // Dodaj nową funkcję handleReturnToMainList
  const handleReturnToMainList = useCallback(() => {
    setCurrentPlaylistId(null);
    setIsPlaying(false);
    setSortBy("date");
    setSortOrder("asc");
    setFilterText("");
    dispatch(setCurrentSongIndex(-1));

    // Pokazujemy toast tylko dla zalogowanych użytkowników
    if (isAuthenticated) {
      showSuccessToast("Powrócono do głównej listy utworów");
    }
  }, [
    dispatch,
    setSortBy,
    setSortOrder,
    setFilterText,
    setIsPlaying,
    showSuccessToast,
    setCurrentPlaylistId,
    isAuthenticated,
  ]);

  const {
    playlists: playlistsFromManager,
    setPlaylists: setPlaylistsFromManager,
    isPlaylistManagerVisible,
    setIsPlaylistManagerVisible,
    handlePlaylistCreated,
    refreshPlaylists,
  } = usePlaylistManager({ isAuthenticated });

  const handlePlaylistRefresh = useCallback(() => {
    if (!isAuthenticated) {
      return;
    }
    refreshPlaylists();
  }, [isAuthenticated, refreshPlaylists]);

  return (
    <PlayerErrorBoundary
      onError={(error, errorInfo) => {
        handleError(error, errorInfo);
      }}
    >
      <div
        id="music-player"
        className="w-full h-full min-h-screen flex flex-col bg-white"
      >
        {!isMobile && (
          <div className="w-full bg-white border-b">
            <div className="max-w-7xl mx-auto w-full">
              <SortControl
                filterText={filterText}
                setFilterText={setFilterText}
              />
            </div>
          </div>
        )}
        <div className="flex-1 w-full max-w-full mx-auto px-4">
          <div className="flex flex-col lg:flex-row h-full gap-4">
            {/* Lewa kolumna - Lista utworów */}
            <div className="w-full lg:w-1/3 xl:w-1/3">
              {currentPlaylistId && (
                <div className="w-full mb-6 sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-3 border-b border-gray-100 shadow-sm">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleReturnToMainList}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow transition-all duration-200 border border-gray-200"
                      >
                        <FaArrowLeft className="text-gray-600" />
                        <span>Powrót do wszystkich utworów</span>
                      </button>
                      {currentPlaylist && (
                        <div className="text-right">
                          <h2 className="text-lg font-semibold text-gray-800">
                            {currentPlaylist.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {currentPlaylist.songs.length} utworów
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <SongList
                songs={sortedAndFilteredSongs}
                visibleSongs={visibleSongs}
                isPlaying={isPlaying}
                currentSong={currentSong}
                onSongSelect={handleSongSelect}
                onLoadMore={loadMoreSongs}
                onCollapse={collapseSongList}
                isPopularList={false}
                expandedPlaylist={expandedPlaylist}
                setExpandedPlaylist={setExpandedPlaylist}
                currentPlaylistId={currentPlaylistId}
                onAddToPlaylist={(songId: string) =>
                  handleAddToPlaylist(songId)
                }
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                filterText={filterText}
                setFilterText={setFilterText}
                isPlaylistExpanded={!!expandedPlaylist}
                showSearch={true}
                hasPlaylists={playlists.length > 0}
                isAuthenticated={isAuthenticated}
                isMobile={isMobile}
                playlists={playlists}
                isLoading={isLoading}
              />
            </div>

            {/* Środkowa kolumna */}
            <div className="w-full lg:w-1/3 flex flex-col">
              {/* Istniejący odtwarzacz */}
              <div className="w-full h-[400px] mt-8">
                <div
                  className={`youtube-player-wrapper ${
                    isPlaying ? "is-playing" : ""
                  }`}
                >
                  <YouTube
                    videoId={currentSong?.youtubeId}
                    opts={{
                      ...opts,
                      height: "100%",
                      width: "100%",
                    }}
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
                </div>
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
                      className={`${styles.controls.iconButton} ${
                        repeatMode.playlist === "on"
                          ? styles.controls.activeIconButton
                          : ""
                      }`}
                    >
                      <FaRedo
                        size={28}
                        className={
                          repeatMode.playlist === "on" ? "text-amber-500" : ""
                        }
                      />
                    </button>
                    <button
                      onClick={previousSong}
                      className="text-gray-600 hover:text-gray-800 p-3 transition-all duration-150 ease-in-out active:scale-95"
                      aria-label="Poprzedni utwór"
                      title="Poprzedni utwr"
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
                      className={`${styles.controls.iconButton} ${
                        repeatMode.song === "on"
                          ? "text-amber-500 bg-gray-100"
                          : ""
                      }`}
                      aria-label={`Powtarzaj utwór: ${
                        repeatMode.song === "on" ? "włączone" : "wyłączone"
                      }`}
                      title="Powtarzaj utwór"
                    >
                      <FaRetweet
                        size={28}
                        className={
                          repeatMode.song === "on" ? "text-amber-500" : ""
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Prawa kolumna - Playlist Manager */}
            <div className="w-full lg:w-1/3 xl:w-1/3">
              <PlaylistManager
                isAuthenticated={isAuthenticated}
                setCurrentPlaylistId={setCurrentPlaylistId}
                playlists={playlists}
                songs={songs}
                expandedPlaylist={expandedPlaylist}
                setExpandedPlaylist={setExpandedPlaylist}
                onDeletePlaylist={handleDeletePlaylist}
                onRenamePlaylist={playlistManagement.editPlaylistName}
                onRemoveSongFromPlaylist={
                  playlistManagement.removeSongFromPlaylist
                }
                onCreatePlaylist={onCreatePlaylist}
                isMobile={isMobile}
                onPlayPlaylist={onPlayPlaylist}
                currentPlaylistId={currentPlaylistId}
                onAddToPlaylist={onAddToPlaylist}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                showSuccessToast={showSuccessToast}
                showErrorToast={showErrorToast}
                showInfoToast={showInfoToast}
                onUpdatePlaylists={(updater) => {
                  const newPlaylists = updater(playlists);
                  setPlaylists(newPlaylists);
                }}
                setPlaylists={setPlaylists}
              />
            </div>
          </div>
        </div>
        <div className="w-full fixed bottom-0 left-0 right-0 bg-white">
          <div className="max-w-7xl mx-auto">
            <PlaybackBar
              isPlaying={isPlaying}
              onTogglePlay={togglePlayback}
              onPrevious={previousSong}
              onNext={nextSong}
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              currentSong={
                currentSong
                  ? {
                      ...currentSong,
                      thumbnail:
                        currentSong.thumbnail ||
                        getThumbnailSafely(currentSong.youtubeId),
                    }
                  : null
              }
              repeatMode={repeatMode}
              onToggleRepeatMode={toggleRepeatMode}
              onAddToPlaylist={(songId) => handleAddToPlaylist(songId)}
              onLike={(songId: string) => {
                if (isAuthenticated) {
                  // Logika dla polubienia utworu
                } else {
                  showErrorToast("Musisz być zalogowany, aby polubić utwory.");
                }
              }}
              isLiked={false} // Dodaj logikę sprawdzania, czy utwór jest polubiony
              hasPlaylistsAndExpanded={
                playlists.length > 0 && !!expandedPlaylist
              }
              playlistCount={playlists.length}
              onCreatePlaylist={() => setIsModalOpen(true)}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              className={`${isPlaying ? "bg-amber-500" : "bg-gray-200"}`}
            />
          </div>
        </div>
      </div>
      {isMobile && (
        <>
          <PlaylistSelectorDrawer
            isOpen={isPlaylistSelectorOpen}
            onClose={() => toggleDrawer("isPlaylistSelectorOpen")}
            playlists={playlists}
            currentPlaylistId={currentPlaylistId}
            onPlayPlaylist={handlePlaylistSelect}
            isAuthenticated={isAuthenticated}
            showErrorToast={showErrorToast}
          />

          <CreatePlaylistDrawer
            isOpen={isCreatePlaylistDrawerOpen}
            onClose={() => toggleDrawer("isCreatePlaylistDrawerOpen")}
            onCreatePlaylist={handleCreatePlaylist}
            isAuthenticated={isAuthenticated}
            showErrorToast={showErrorToast}
            playlists={playlists}
          />
        </>
      )}
      {isMobile && (
        <>
          <AnimatePresence>
            {!areButtonsHidden && (
              <>
                {/* Przycisk Play/Playlist */}
                <motion.button
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ type: "spring", damping: 20, delay: 0.1 }}
                  className="fixed right-4 bottom-[280px] bg-white rounded-full p-4 shadow-xl z-60"
                  onClick={() => toggleDrawer("isPlaylistSelectorOpen")}
                >
                  <FaPlay className="text-gray-700" />
                </motion.button>

                {/* Przycisk Nowa playlista */}
                <motion.button
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ type: "spring", damping: 20, delay: 0.2 }}
                  className="fixed right-4 bottom-[220px] bg-white rounded-full p-4 shadow-xl z-60"
                  onClick={() => toggleDrawer("isCreatePlaylistDrawerOpen")}
                >
                  <FaPlus className="text-gray-700" />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Przycisk ukrywania */}
          <Tooltip
            content={
              areButtonsHidden
                ? "Kliknij, aby pokazać przyciski kontrolne"
                : "Kliknij, aby ukryć przyciski kontrolne"
            }
          >
            <motion.button
              onClick={toggleButtonsVisibility}
              className="fixed right-4 bottom-[160px] bg-white rounded-full p-4 shadow-xl z-[100] flex items-center space-x-2"
            >
              {areButtonsHidden ? <FaEye /> : <FaEyeSlash />}
            </motion.button>
          </Tooltip>
        </>
      )}
      {/* <DebugLogger
        playlists={playlists}
        songs={songs}
        componentName="MusicPlayer"
        additionalInfo={debugInfo}
      /> */}
    </PlayerErrorBoundary>
  );
};
export default MusicPlayer;
