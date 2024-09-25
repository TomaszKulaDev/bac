// src/components/MusicPlayer.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
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
} from "react-icons/fa";
import Image from "next/image";
import { Song } from "../types";
import VotingButtons from "./VotingButtons";
import FavoriteButton from "./FavoriteButton";
import LoginModal from "./LoginModal";
import { RootState } from "../../../store/store";
import SongList from "./SongList";

const getYouTubeThumbnail = (youtubeId: string) => {
  return `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
};

const MusicPlayer: React.FC = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [localSongs, setLocalSongs] = useState<Song[]>([]);

  useEffect(() => {
    setLocalSongs(songs);
  }, [songs]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(localSongs.length - 1);
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
    if (currentSongIndex < localSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleVote = (songId: string, voteType: "up" | "down" | null) => {
    if (isLoggedIn) {
      setLocalSongs((prevSongs) =>
        prevSongs.map((song) => {
          if (song.id === songId) {
            const currentVote = song.userVote;
            let newVotes = song.votes;
            let newScore = song.score;

            if (voteType === null) {
              newVotes -= currentVote === "up" ? 1 : -1;
              newScore -= currentVote === "up" ? 1 : -1;
            } else if (currentVote === voteType) {
              return song;
            } else {
              newVotes += voteType === "up" ? 1 : -1;
              newScore += voteType === "up" ? 1 : -1;
              if (currentVote) {
                newVotes -= currentVote === "up" ? 1 : -1;
                newScore -= currentVote === "up" ? 1 : -1;
              }
            }

            return {
              ...song,
              votes: newVotes,
              score: newScore,
              userVote: voteType,
            };
          }
          return song;
        })
      );
    } else {
      setShowLoginModal(true);
    }
  };

  const toggleFavorite = (songId: string) => {
    if (isLoggedIn) {
      setLocalSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.id === songId ? { ...song, isFavorite: !song.isFavorite } : song
        )
      );
    } else {
      setShowLoginModal(true);
    }
  };

  const loadMoreSongs = () => {
    setVisibleSongs((prevVisible) =>
      Math.min(prevVisible + songsPerLoad, localSongs.length)
    );
  };

  const collapseSongList = () => {
    setVisibleSongs(initialVisibleSongs);
  };

  const sortSongs = useCallback(() => {
    setLocalSongs((prevSongs) => {
      const sortedSongs = [...prevSongs].sort((a, b) => b.score - a.score);
      return JSON.stringify(sortedSongs) !== JSON.stringify(prevSongs)
        ? sortedSongs
        : prevSongs;
    });
  }, []);

  const songScores = useMemo(
    () => localSongs.map((song) => song.score).join(","),
    [localSongs]
  );

  useEffect(() => {
    try {
      sortSongs();
    } catch (error) {
      console.error("Błąd podczas sortowania piosenek:", error);
      setError(
        "Wystąpił problem z sortowaniem piosenek. Spróbuj odświeżyć stronę."
      );
    }
  }, [songScores, sortSongs]);

  const onReady = (event: { target: any }) => {
    setPlayer(event.target);
    setIsPlayerReady(true);
    setError(null);
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
    console.log("Formularz został wysłany");
    try {
      const response = await fetch("/api/submit-song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setShowContactForm(false);
        setFormData({ title: "", artist: "", youtubeLink: "" });
      } else {
        throw new Error("Wystąpił błąd podczas wysyłania formularza");
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

  return (
    <div className="music-player bg-white shadow-lg min-h-screen flex flex-col w-full max-w-6xl mx-auto">
      <div className="playlist-header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaMusic className="text-4xl mr-4" />
            <div>
              <h1 className="text-2xl font-bold">Bachata Top Playlist 2024</h1>
              <p className="text-xs opacity-75">
                {localSongs.length} utworów • Zaktualizowano:{" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="hidden md:block">
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
              {localSongs.length > 0 && (
                <>
                  <YouTube
                    videoId={localSongs[currentSongIndex]?.youtubeId}
                    opts={opts}
                    onReady={onReady}
                    onError={onError}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnd={nextSong}
                    className="w-full h-full"
                  />
                  <div className="flex flex-col space-y-4 mt-4 px-4">
                    {localSongs[currentSongIndex] && (
                      <VotingButtons
                        songId={localSongs[currentSongIndex].id}
                        votes={localSongs[currentSongIndex].votes}
                        isFavorite={localSongs[currentSongIndex].isFavorite}
                        isLoggedIn={isLoggedIn}
                        userVote={localSongs[currentSongIndex].userVote}
                        onVote={handleVote}
                        onToggleFavorite={toggleFavorite}
                        onShowLoginModal={handleShowLoginModal}
                      />
                    )}
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
                </>
              )}
            </div>
            <div className="p-6">
              <div className="md:hidden">
                <h1 className="border-2 border-purple-500 p-4 rounded-lg text-center text-sm">
                  Miejsce pod reklamę na telefony
                </h1>
              </div>
              {/* Tutaj możesz dodać dodatkową zawartość, która będzie przewijana pod odtwarzaczem */}
            </div>
          </div>
        </div>
        <SongList
          songs={localSongs}
          visibleSongs={visibleSongs}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          onSongSelect={(index) => {
            setCurrentSongIndex(index);
            setIsPlaying(true);
            setIsLoading(true);
          }}
          onLoadMore={loadMoreSongs}
          onCollapse={collapseSongList}
        />
      </div>
      {showSuccessMessage && (
        <SuccessMessage
          onClose={() => {
            setShowSuccessMessage(false);
            console.log("SuccessMessage został zamknięty");
          }}
        />
      )}
      {showErrorMessage && <ErrorMessage />}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {adBlockerDetected && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
          role="alert"
        >
          <p>
            Wykryto bloker reklam. Może to wpływać na działanie odtwarzacza.
            Rozważ wyłączenie blokera dla tej strony.
          </p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
