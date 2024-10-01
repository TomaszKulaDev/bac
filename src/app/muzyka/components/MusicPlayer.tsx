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
  FaArrowUp,
  FaArrowDown,
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaChevronDown,
  FaChevronUp,
  FaMinus,
  FaStepBackward,
  FaStepForward,
  FaList,
  FaExpand,
  FaCompress,
  FaPlus,
} from "react-icons/fa";
import Image from "next/image";
import { Song, Playlist } from "../types";
import { RootState } from "../../../store/store";
import SongList from "./SongList";
import { setCurrentSongIndex } from '@/store/slices/features/songsSlice';
import Link from "next/link";





const getYouTubeThumbnail = (youtubeId: string) => {
  return `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
};




const MusicPlayer: React.FC<{ 
  songs: Song[], 
  onCreatePlaylist: (name: string, selectedSongs: string[]) => void,
  onAddToPlaylist: (songId: string) => void
}> = ({ songs, onCreatePlaylist, onAddToPlaylist }) => {
  const dispatch = useDispatch();
  const currentSongIndex = useSelector((state: RootState) => state.songs.currentSongIndex);

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );


  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


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
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    youtubeLink: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [localSongs, setLocalSongs] = useState<Song[]>(songs);
  const [isMinimalistic, setIsMinimalistic] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState<{ id: string; name: string }[]>([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };



  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    setIsLoading(false);
  };


  const previousSong = () => {
    if (currentSongIndex > 0) {
      dispatch(setCurrentSongIndex(currentSongIndex - 1));
    } else {
      dispatch(setCurrentSongIndex(songs.length - 1));
    }
    setIsPlaying(true);
    setIsLoading(true);
  };


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

  const nextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      dispatch(setCurrentSongIndex(currentSongIndex + 1));
    } else {
      dispatch(setCurrentSongIndex(0));
    }
    setIsPlaying(true);
    setIsLoading(true);
  };


  const loadMoreSongs = useCallback(() => {
    setVisibleSongs((prevVisible) =>
      Math.min(prevVisible + songsPerLoad, songs.length)
    );
  }, [songsPerLoad, songs.length]);

  const collapseSongList = () => {
    setVisibleSongs(initialVisibleSongs);
  };


  const onReady = (event: { target: any }) => {
    if (event.target && typeof event.target.loadVideoById === 'function') {
      setPlayer(event.target);
      setIsPlayerReady(true);
      setError(null);
    } else {
      console.error("Nie można zainicjalizować odtwarzacza YouTube");
      setError("Nie można załadować odtwarzacza YouTube");
    }
  };


  const onError = (event: { data: number }) => {
    console.error("Błąd YouTube:", event.data);
    let errorMessage = "Wystąpił błąd podczas ładowania filmu.";
    if (adBlockerDetected) {
      errorMessage +=
        " Sprawdź swoje ustawienia prywatności lub blokery reklam.";
    }
    setError(errorMessage);
  };


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



  useEffect(() => {
    updatePlayerDimensions();
    window.addEventListener("resize", updatePlayerDimensions, {
      passive: true,
    });
    return () => window.removeEventListener("resize", updatePlayerDimensions);
  }, [updatePlayerDimensions]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formularz został wysłany", formData);
    try {
      const response = await fetch("/api/submit-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });




      if (response.ok) {
        console.log("Formularz wysłany pomyślnie");
        setShowSuccessMessage(true);
        setShowContactForm(false);
        setFormData({ title: "", artist: "", youtubeLink: "" });
      } else {
        const errorData = await response.json();
        console.error("Wystąpił błąd podczas wysyłania formularza:", errorData);
      }
    } catch (error) {
      console.error("Błąd:", error);
      setShowErrorMessage(true);
    }
  };


  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000); // Zamknij komunikat po 5 sekundach
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);


  function SuccessMessage({ onClose }: { onClose: () => void }) {
    console.log("SuccessMessage został wyrenderowany");
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [onClose]);


    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50"
        onClick={onClose}
        style={{ zIndex: 9999 }}
      >
        <div
          className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Świetnie! 🎉
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Twój utwór został dodany do naszej playlisty do rozpatrzenia.
              Dzięki za podzielenie się muzyką!
            </p>
            <p className="text-md text-gray-500 mb-6">
              Kto wie, może wkrótce usłyszymy go na parkiecie? 💃🕺
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Przycisk zamykający został kliknięty");
                onClose();
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm transition duration-300 z-50"
            >
              Super, wracam do przeglądania!
            </button>
          </div>
        </div>
      </div>
    );
  }


  const ErrorMessage = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Wystąpił błąd
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Przepraszamy, nie udało się wysłać formularza. Spróbuj ponownie
            później.
          </p>
          <button
            onClick={() => setShowErrorMessage(false)}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );


  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };


  useEffect(() => {
    const checkAdBlocker = async () => {
      try {
        const response = await fetch("https://www.youtube.com/favicon.ico", {
          mode: "no-cors",
        });
        setAdBlockerDetected(false);
      } catch {
        setAdBlockerDetected(true);
      }
    };
    checkAdBlocker();
  }, []);



  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const MemoizedSongList = React.memo(SongList);


  const handleSongSelect = useCallback((index: number) => {
    dispatch(setCurrentSongIndex(index));
    setIsPlaying(true);
    setIsLoading(true);
  }, [dispatch]);


  const toggleMinimalisticMode = () => {
    setIsMinimalistic(!isMinimalistic);
  };



  const savePlaylist = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    // Logika tworzenia nowej playlisty z aktualnym utworem
    const playlistName = prompt("Podaj nazwę nowej playlisty:");
    if (playlistName) {
      onCreatePlaylist(playlistName, []);
      console.log(`Utworzono nową playlistę: ${playlistName}`);
    }
  }, [isAuthenticated, onCreatePlaylist]);


  const UserPlaylists = () => (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Twoje playlisty</h3>
      {userPlaylists.length === 0 ? (
        <p>Nie masz jeszcze żadnych playlist.</p>
      ) : (
        <ul>
          {userPlaylists.map(playlist => (
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


  const LoginPrompt = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Zaloguj się, aby zapisać playlistę</h2>
        <p className="mb-4">Musisz być zalogowany, aby zapisać swoją playlistę.</p>
        <div className="flex justify-end">
          <button
            onClick={() => setShowLoginPrompt(false)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition duration-300"
          >
            Anuluj
          </button>
          <Link href="/login">
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">
              Zaloguj się
            </button>
          </Link>
        </div>
      </div>
    </div>
  );


  const handleAddToPlaylist = useCallback((songId: string) => {
    setSelectedSongId(songId);
    setShowPlaylistModal(true);
  }, []);


  const handleClosePlaylistModal = useCallback(() => {
    setShowPlaylistModal(false);
    setSelectedSongId(null);
  }, []);



  const handleAddSongToPlaylist = useCallback((playlistId: string) => {
    if (selectedSongId) {
      console.log(`Dodawanie utworu ${selectedSongId} do playlisty ${playlistId}`);
      // Tu dodaj logikę dodawania utworu do playlisty
      handleAddToPlaylist(selectedSongId);
      handleClosePlaylistModal();
    }
  }, [selectedSongId, handleClosePlaylistModal, handleAddToPlaylist]);


  const PlaylistModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    playlists: Playlist[];
    onAddToPlaylist: (playlistId: string, songId: string) => void;
    onCreateNewPlaylist: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onEditPlaylistName: (playlistId: string, newName: string) => void;
    onDeletePlaylist: (playlistId: string) => void;
  }> = ({ isOpen, onClose, playlists, onAddToPlaylist, onCreateNewPlaylist, onEditPlaylistName, onDeletePlaylist }) => {
    const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);
    const [newPlaylistName, setNewPlaylistName] = useState("");

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">Zarządzaj playlistami</h2>
          <ul>
            {playlists.map(playlist => (
              <li key={playlist.id} className="mb-2 flex items-center justify-between">
                {editingPlaylistId === playlist.id ? (
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    onBlur={() => {
                      onEditPlaylistName(playlist.id, newPlaylistName);
                      setEditingPlaylistId(null);
                    }}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <span>{playlist.name}</span>
                )}
                <div>
                  <button
                    onClick={() => {
                      setEditingPlaylistId(playlist.id);
                      setNewPlaylistName(playlist.name);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => onDeletePlaylist(playlist.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Usuń
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={onCreateNewPlaylist}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
          >
            Utwórz nową playlistę
          </button>
          <button
            onClick={onClose}
            className="mt-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
          >
            Zamknij
          </button>
        </div>
      </div>
    );
  };


  const addSongToPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prevPlaylists => prevPlaylists.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: [...playlist.songs, songId] };
      }
      return playlist;
    }));
  }, []);


  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prevPlaylists => prevPlaylists.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: playlist.songs.filter(id => id !== songId) };
      }
      return playlist;
    }));
  }, []);

  const editPlaylistName = useCallback((playlistId: string, newName: string) => {
    setPlaylists(prevPlaylists => prevPlaylists.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, name: newName };
      }
      return playlist;
    }));
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists(prevPlaylists => prevPlaylists.filter(playlist => playlist.id !== playlistId));
    if (currentPlaylist?.id === playlistId) {
      setCurrentPlaylist(null);
    }
  }, [currentPlaylist]);

  const handleCreatePlaylist = () => {
    const name = prompt("Podaj nazwę nowej playlisty:");
    if (name) {
      onCreatePlaylist(name, []);
    }
  };



  return (
    <div className="music-player bg-white shadow-lg min-h-screen flex flex-col w-full max-w-6xl mx-auto">
      <div className="playlist-header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaMusic className="text-4xl mr-4" />
            <div>
              <h1 className="text-2xl font-bold">Bachata Top Playlist 2024</h1>
              <p className="text-xs opacity-75">
                {songs.length} utworów • Zaktualizowano: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={savePlaylist}
              className="bg-white text-purple-500 px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              Zapisz playlistę
            </button>
            <button className="bg-white text-purple-500 px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300">
              Udostępnij playlistę
            </button>
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
                    onError={onError}
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
                  <FaChevronUp className="mr-1 text-xs sm:text-sm" />{" "}
                  Poprzedni
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
                  Następny{" "}
                  <FaChevronDown className="ml-1 text-xs sm:text-sm" />
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
          onAddToPlaylist={handleAddToPlaylist}
        />
      </div>
      {showLoginPrompt && <LoginPrompt />}
      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={handleClosePlaylistModal}
        playlists={playlists}
        onAddToPlaylist={handleAddSongToPlaylist}
        onCreateNewPlaylist={handleCreatePlaylist}
        onEditPlaylistName={editPlaylistName}
        onDeletePlaylist={deletePlaylist}
      />
    </div>
  );
};



export default MusicPlayer;