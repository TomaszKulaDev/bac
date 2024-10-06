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
import YouTube, { YouTubeProps } from "react-youtube";
import {
  FaPlay,
  FaPause,
  FaMusic,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Song, Playlist } from "../types";
import { RootState } from "../../../store/store";
import SongList from "./SongList";
import { setCurrentSongIndex } from "@/store/slices/features/songsSlice";


interface MusicPlayerProps {
  songs: Song[];
  onCreatePlaylist: (name: string, selectedSongs: string[]) => void;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
}

// Komponent MusicPlayer
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  songs,
  onCreatePlaylist,
  onAddToPlaylist,
  expandedPlaylist,
  setExpandedPlaylist,
}) => {
  const dispatch = useDispatch();
  const currentSongIndex = useSelector(
    (state: RootState) => state.songs.currentSongIndex
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
 
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // Funkcja wywoływana, gdy odtwarzacz jest gotowy
  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    setIsLoading(false);
  };

  // Funkcja do odtwarzania poprzedniego utworu
  const previousSong = () => {
    if (currentSongIndex > 0) {
      dispatch(setCurrentSongIndex(currentSongIndex - 1));
    } else {
      dispatch(setCurrentSongIndex(songs.length - 1));
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
    if (currentSongIndex < songs.length - 1) {
      dispatch(setCurrentSongIndex(currentSongIndex + 1));
    } else {
      dispatch(setCurrentSongIndex(0));
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
    (index: number) => {
      dispatch(setCurrentSongIndex(index));
      setIsPlaying(true);
      setIsLoading(true);
    },
    [dispatch]
  );

  // Funkcja do przełączania trybu minimalistycznego
  const toggleMinimalisticMode = () => {
    setIsMinimalistic(!isMinimalistic);
  };

  // Komponent listy playlist użytkownika
  const UserPlaylists = () => (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Twoje playlisty</h3>
      {userPlaylists.length === 0 ? (
        <p>Nie masz jeszcze żadnych playlist.</p>
      ) : (
        <ul>
          {userPlaylists.map((playlist) => (
            <li key={playlist.id} className="mb-2">
              <button className="text-left hover:text-purple-600 transition duration-300">
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => {
          const name = prompt("Podaj nazwę nowej playlisty:");
          if (name) onCreatePlaylist(name, []);
        }}
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
      >
        Utwórz nową playlistę
      </button>
    </div>
  );
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
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) => {
          if (playlist.id === playlistId) {
            return { ...playlist, songs: [...playlist.songs, songId] };
          }
          return playlist;
        })
      );
    },
    []
  );

  // Funkcja do usuwania utworu z playlisty
  const removeSongFromPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      setPlaylists((prevPlaylists) =>
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
    []
  );

  // Funkcja do edytowania nazwy playlisty
  const editPlaylistName = useCallback(
    (playlistId: string, newName: string) => {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) => {
          if (playlist.id === playlistId) {
            return { ...playlist, name: newName };
          }
          return playlist;
        })
      );
    },
    []
  );

  // Funkcja do tworzenia pustej playlisty
  const handleCreateEmptyPlaylist = () => {
    const name = prompt("Podaj nazwę nowej playlisty:");
    if (name) {
      onCreatePlaylist(name, []);
    }
  };

  const deletePlaylist = useCallback(
    (playlistId: string) => {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== playlistId)
      );
      if (currentPlaylist?.id === playlistId) {
        setCurrentPlaylist(null);
      }
    },
    [currentPlaylist]
  );

  // Komponent MusicPlayer - główny komponent odtwarzacza muzyki
  return (
    <div className="music-player bg-white shadow-lg min-h-screen flex flex-col w-full max-w-6xl mx-auto">
      <div className="playlist-header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaMusic className="text-4xl mr-4" />
            <div>
              <h1 className="text-2xl font-bold">Bachata Top Playlist 2024</h1>
              <p className="text-xs opacity-75">
                {songs.length} utworów • Zaktualizowano:{" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="md:order-2 md:w-3/5 flex flex-col">
          <div className="sticky top-0 bg-white z-10 p-4">
            <div
              className="youtube-player mb-4"
              style={{
                width: playerDimensions.width,
                height: playerDimensions.height,
              }}
            >
              {error && <div className="error-message">{error}</div>}
              {songs.length > 0 && (
                <>
                  <YouTube
                    videoId={songs[currentSongIndex]?.youtubeId}
                    opts={opts}
                    onReady={onReady}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnd={nextSong}
                    className="w-full h-full"
                  />
                </>
              )}
            </div>
            <div className="flex flex-col space-y-4 mt-4 px-4">
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={previousSong}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded text-xs sm:text-sm font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center"
                >
                  <FaChevronUp className="mr-1 text-xs sm:text-sm" /> Poprzedni
                </button>
                <button
                  onClick={togglePlayback}
                  className="mx-2 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-md hover:from-pink-600 hover:to-purple-600 transition duration-300 flex items-center justify-center"
                >
                  {isPlaying ? (
                    <FaPause className="text-lg sm:text-xl" />
                  ) : (
                    <FaPlay className="text-lg sm:text-xl ml-0.5" />
                  )}
                </button>
                <button
                  onClick={nextSong}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-4 rounded text-xs sm:text-sm font-semibold shadow-md hover:from-indigo-600 hover:to-pink-600 transition duration-300 flex items-center justify-center"
                >
                  Następny <FaChevronDown className="ml-1 text-xs sm:text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <MemoizedSongList
          songs={songs}
          visibleSongs={visibleSongs}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          onSongSelect={handleSongSelect}
          onLoadMore={loadMoreSongs}
          onCollapse={collapseSongList}
          isPopularList={false}
          onCreatePlaylist={handleCreateEmptyPlaylist}
          onAddToPlaylist={(songId) => {
            if (Array.isArray(songId)) {
              songId.forEach((id) => onAddToPlaylist(expandedPlaylist!, id));
            } else {
              onAddToPlaylist(expandedPlaylist!, songId);
            }
          }}
          expandedPlaylist={expandedPlaylist}
          setExpandedPlaylist={setExpandedPlaylist}
        />
      </div>
      {}
    </div>
  );
};

export default MusicPlayer;