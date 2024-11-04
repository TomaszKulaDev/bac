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
  MobileDrawer,
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
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  isAuthenticated: boolean;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
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
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  isAuthenticated,
  isPlaying,
  setIsPlaying,
  setPlaylists,
}) => {
  const dispatch = useDispatch();
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

  const [visibleSongs, setVisibleSongs] = useState(7);
  const initialVisibleSongs = 7;
  const songsPerLoad = 10;
  const [isMinimalistic, setIsMinimalistic] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

  const [repeatMode, setRepeatMode] = useState<RepeatMode>({
    song: "off",
    playlist: "off",
  });

  const [sortBy, setSortBy] = useState<SortByType>("date");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("asc");
  const sortedAndFilteredSongs = useSortedAndFilteredSongs(
    songs,
    sortBy,
    sortOrder,
    filterText
  );

  const { previousSong, togglePlayback, nextSong } = usePlaybackControls({
    setCurrentPlaylistId,
    player,
    isPlayerReady,
    currentSong,
    songs,
    playlists,
    currentPlaylistId,
    setIsPlaying,
    setIsLoading,
    repeatMode,
    isPlaying,
  });

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
    [songs, dispatch, setIsPlaying, currentPlaylistId]
  );

  // Funkcja do przełączania trybu minimalistycznego
  const toggleMinimalisticMode = () => {
    setIsMinimalistic(!isMinimalistic);
  };

  // Funkcja do dodawania utworu do playlisty
  const handleAddToPlaylist = useCallback(
    (songId: string) => {
      if (expandedPlaylist) {
        const playlist = playlists.find((p) => p.id === expandedPlaylist);
        const song = songs.find((s) => s.id === songId);
        if (playlist && song) {
          if (playlist.songs.includes(songId)) {
            showInfoToast(
              `Utwór "${song.title}" jest już w playlisty "${playlist.name}"`
            );
          } else {
            onAddToPlaylist(expandedPlaylist, songId);
            showSuccessToast(
              `Dodano "${song.title}" do playlisty "${playlist.name}"`
            );
          }
        }
      } else {
        showErrorToast("Nie wybrano playlisty");
      }
    },
    [
      expandedPlaylist,
      onAddToPlaylist,
      songs,
      playlists,
      showSuccessToast,
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
    setCurrentPlaylistId
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

  const filteredSongs = useMemo(() => {
    if (currentPlaylistId) {
      const currentPlaylist = playlists.find((p) => p.id === currentPlaylistId);
      if (currentPlaylist) {
        // Zwracamy utwory w kolejności z playlisty
        return currentPlaylist.songs
          .map((songId) => songs.find((song) => song.id === songId))
          .filter((song): song is Song => song !== undefined);
      }
    }
    return songs;
  }, [currentPlaylistId, playlists, songs]);

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
      console.log("Player jest gotowy");
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
  const handleDeletePlaylist = (id: string) => {
    playlistManagement.deletePlaylist(id);
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

  // Używaj tylko gdy DEBUG=true
  if (process.env.NODE_ENV === "development") {
    console.debug("Debug info:", debugInfo);
  }

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
          <div className="w-full bg-gray-100">
            <div className="max-w-7xl mx-auto w-full">
              <SortControl
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
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
                          repeatMode.playlist === "on" ? "text-blue-500" : ""
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
                          repeatMode.song === "on" ? "text-blue-500" : ""
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Prawa kolumna - Playlist Manager */}
            <div className="w-full lg:w-1/3 xl:w-1/3 border-l border-gray-200">
              <PlaylistManager
                isAuthenticated={isAuthenticated} // Dodaj tę linię
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
        <div className="w-full fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
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
            />
          </div>
        </div>
      </div>
      {isMobile && (
        <>
          <MobileDrawer
            isOpen={isMobileDrawerOpen}
            onClose={() => toggleDrawer("isMobileDrawerOpen")}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            playlists={playlists}
            songs={songs}
            expandedPlaylist={expandedPlaylist}
            setExpandedPlaylist={setExpandedPlaylist}
            onAddToPlaylist={onAddToPlaylist}
            onCreatePlaylist={onCreatePlaylist}
            currentPlaylistId={currentPlaylistId}
            onPlayPlaylist={handlePlaylistSelect}
            onUpdatePlaylists={onUpdatePlaylists}
            isAuthenticated={isAuthenticated}
            showErrorToast={showErrorToast}
            showSuccessToast={showSuccessToast}
          />

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
                {/* Przycisk Sortowania */}
                <motion.button
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="fixed right-4 bottom-[340px] bg-white rounded-full p-4 shadow-xl z-60"
                  onClick={() => toggleDrawer("isMobileDrawerOpen")}
                >
                  <FaSort className="text-gray-700" />
                </motion.button>

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
    </PlayerErrorBoundary>
  );
};
export default MusicPlayer;
