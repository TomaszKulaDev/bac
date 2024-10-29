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
} from "react-icons/fa";
import { Song, Playlist, RepeatMode } from "../types";
import { RootState } from "../../../store/store";
import SongList from "./SongList";
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
import MobileDrawer from "./MobileDrawer";
import { motion } from "framer-motion";
import PlaylistSelectorDrawer from "./PlaylistSelectorDrawer";
import CreatePlaylistDrawer from "./CreatePlaylistDrawer";
import { useDrawers, SortByType, SortOrderType } from '../hooks/useDrawers';

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
}) => {
  const dispatch = useDispatch();
  const currentSong = useSelector(
    (state: RootState) => state.songs.songs[state.songs.currentSongIndex]
  );

  const {
    player,
    playerRef,
    isPlaying,
    setIsPlaying,
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
  const [userPlaylists, setUserPlaylists] = useState<
    { id: string; name: string }[]
  >([]);

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
        setIsLoading(true);
      }
    },
    [dispatch, songs, setIsPlaying, setIsLoading]
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
              `Utwór "${song.title}" jest już w playliście "${playlist.name}"`
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
      return currentPlaylist
        ? songs.filter((song) => currentPlaylist.songs.includes(song.id))
        : [];
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
    deletePlaylist(id);
  };

  const handleRenamePlaylist = (id: string, newName: string) => {
    editPlaylistName(id, newName);
  };

  const handleRemoveSongFromPlaylist = (playlistId: string, songId: string) => {
    removeSongFromPlaylist(playlistId, songId);
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
    closeAllDrawers
  } = useDrawers({
    isAuthenticated,
    showErrorToast,
    onCreatePlaylist,
    onPlayPlaylist,
    onSortChange,
    sortBy,
    sortOrder,
    isMobile,
    setIsModalOpen
  });

  return (
    <PlayerErrorBoundary
      onError={(error, errorInfo) => {
        handleError(error, errorInfo);
      }}
    >
      <div
        id="music-player"
        className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden pb-20"
      >
        {!isMobile && (
          <div className="w-full mb-4 bg-gray-100">
            <SortControl
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={onSortChange}
              filterText={filterText}
              setFilterText={setFilterText}
            />
          </div>
        )}
        <div className="flex flex-col md:flex-row flex-grow">
          <div className="md:order-2 md:w-3/5 flex flex-col">
            <div className="sticky top-0 bg-white z-40 p-6 shadow-md">
              <div
                className="youtube-player mb-6 rounded-lg overflow-hidden relative"
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
              {/* <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mb-4 flex items-center justify-center"
                aria-label="Utwórz nową playlistę"
                title="Utwórz nową playlistę"
              >
                <FaPlus className="mr-2" /> Utwórz nową playlistę
              </button> */}
              {isModalOpen && (
                <CreatePlaylistModal
                  onClose={() => setIsModalOpen(false)}
                  onCreatePlaylist={onCreatePlaylist}
                  showSuccessToast={showSuccessToast}
                  showErrorToast={showErrorToast}
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
            songs={
              currentPlaylistId
                ? songs.filter((song) =>
                    playlists
                      .find((p) => p.id === currentPlaylistId)
                      ?.songs.includes(song.id)
                  )
                : sortedAndFilteredSongs
            }
            visibleSongs={visibleSongs}
            isPlaying={isPlaying}
            currentSong={currentSong}
            onSongSelect={handleSongSelect}
            onLoadMore={loadMoreSongs}
            onCollapse={collapseSongList}
            isPopularList={false}
            expandedPlaylist={expandedPlaylist}
            setExpandedPlaylist={setExpandedPlaylist}
            onAddToPlaylist={(songId: string) => handleAddToPlaylist(songId)}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
            filterText={filterText}
            setFilterText={setFilterText}
            isPlaylistExpanded={!!expandedPlaylist}
            showSearch={!currentPlaylistId}
            hasPlaylists={playlists.length > 0}
            isAuthenticated={isAuthenticated}
            isMobile={isMobile}
          />
        </div>
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
          hasPlaylistsAndExpanded={playlists.length > 0 && !!expandedPlaylist}
          playlistCount={playlists.length}
          onCreatePlaylist={() => setIsModalOpen(true)}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
      </div>
      {isMobile && (
        <>
          <MobileDrawer
            isOpen={isMobileDrawerOpen}
            onClose={() => toggleDrawer('isMobileDrawerOpen')}
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
          {isMobile && showDrawerButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDrawer('isMobileDrawerOpen')}
              className="fixed right-4 bottom-96 bg-white rounded-full p-4 shadow-xl z-30 flex items-center space-x-2 border border-gray-100"
            >
              <div className="flex items-center">
                <FaSort size={16} className="text-gray-700" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Sortuj
                </span>
              </div>
            </motion.button>
          )}
          <PlaylistSelectorDrawer
            isOpen={isPlaylistSelectorOpen}
            onClose={() => toggleDrawer('isPlaylistSelectorOpen')}
            playlists={playlists}
            currentPlaylistId={currentPlaylistId}
            onPlayPlaylist={handlePlaylistSelect}
            isAuthenticated={isAuthenticated}
            showErrorToast={showErrorToast}
          />
          {showDrawerButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDrawer('isPlaylistSelectorOpen')}
              className="fixed right-4 bottom-80 bg-white rounded-full p-4 shadow-xl z-30 flex items-center space-x-2 border border-gray-100"
            >
              <div className="flex items-center">
                <FaMusic size={16} className="text-gray-700" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Playlisty
                </span>
              </div>
            </motion.button>
          )}
          {showDrawerButton && playlists.length < 2 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDrawer('isCreatePlaylistDrawerOpen')}
              className="fixed right-4 bottom-64 bg-white rounded-full p-4 shadow-xl z-30 flex items-center space-x-2 border border-gray-100"
            >
              <div className="flex items-center">
                <FaPlus size={16} className="text-gray-700" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Nowa playlista
                </span>
              </div>
            </motion.button>
          )}

          <CreatePlaylistDrawer
            isOpen={isCreatePlaylistDrawerOpen}
            onClose={() => toggleDrawer('isCreatePlaylistDrawerOpen')}
            onCreatePlaylist={handleCreatePlaylist}
            isAuthenticated={isAuthenticated}
            showErrorToast={showErrorToast}
            playlists={playlists}
          />
        </>
      )}
    </PlayerErrorBoundary>
  );
};

export default MusicPlayer;

