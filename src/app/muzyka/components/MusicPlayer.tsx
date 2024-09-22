// src/components/MusicPlayer.tsx

"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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
} from "react-icons/fa";
import Image from "next/image";
import { Song } from "../types";

interface MusicPlayerProps {
  songs: Song[];
}

const getYouTubeThumbnail = (youtubeId: string) => {
  return `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<any>(null);
  const [visibleSongs, setVisibleSongs] = useState(7);
  const initialVisibleSongs = 7;
  const songsPerLoad = 10;
  const [localSongs, setLocalSongs] = useState<Song[]>(songs);
  const [player, setPlayer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [playerDimensions, setPlayerDimensions] = useState({
    width: "640px",
    height: "360px",
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
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  }, [player, isPlaying]);

  const nextSong = () => {
    if (currentSongIndex < localSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleVote = (songId: string, voteType: "up" | "down") => {
    setLocalSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              votes: song.votes + (voteType === "up" ? 1 : -1),
              score: song.score + (voteType === "up" ? 1 : -1),
            }
          : song
      )
    );
  };

  const toggleFavorite = (songId: string) => {
    setLocalSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
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
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
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

  return (
    <div className="music-player bg-white shadow-lg min-h-screen flex flex-col w-full">
      <div className="playlist-header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaMusic className="text-4xl mr-4" />
            <div>
              <h1 className="text-3xl font-bold">Bachata Top Playlist 2024</h1>
              <p className="text-sm opacity-75">
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
        <div className="song-list md:w-1/3 border-r border-gray-200 overflow-y-auto">
          {localSongs.slice(0, visibleSongs).map((song, index) => (
            <React.Fragment key={song.id}>
              <div
                className={`song-item p-4 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out ${
                  currentSongIndex === index ? "bg-gray-200" : ""
                } flex items-center`}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setIsPlaying(true);
                  setIsLoading(true);
                }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-2 flex items-center justify-center bg-gray-200 rounded-full">
                    <span className="text-gray-600 font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="mx-2">
                    {song.votes > 0 ? (
                      <FaArrowUp className="text-green-500 text-2xl" />
                    ) : song.votes < 0 ? (
                      <FaArrowDown className="text-red-500 text-2xl" />
                    ) : (
                      <FaMinus className="text-gray-500 text-2xl" />
                    )}
                  </div>
                  <div className="w-12 h-12 mr-4 relative">
                    <Image
                      src={getYouTubeThumbnail(song.youtubeId)}
                      alt={song.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{song.title}</h3>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                  </div>
                </div>
                <div className="ml-auto">
                  {currentSongIndex === index && isPlaying ? (
                    <FaMusic className="text-blue-500 text-xl transition-colors duration-300" />
                  ) : (
                    <FaPlay className="text-gray-500 text-xl hover:text-blue-500 transition-colors duration-300" />
                  )}
                </div>
              </div>
              {(index + 1) % 10 === 0 &&
                index + 1 < visibleSongs &&
                index + 1 !== localSongs.length && (
                  <button
                    className="w-full p-2 bg-gray-100 text-blue-500 hover:bg-gray-200 transition duration-300 flex items-center justify-center text-sm"
                    onClick={collapseSongList}
                  >
                    <FaChevronUp className="mr-2" />
                    Zwiń listę
                  </button>
                )}
            </React.Fragment>
          ))}
          {localSongs.length > initialVisibleSongs &&
            (visibleSongs < localSongs.length ? (
              <>
                <button
                  className="w-full p-4 bg-gray-100 text-blue-500 hover:bg-gray-200 transition duration-300 flex items-center justify-center"
                  onClick={loadMoreSongs}
                >
                  <FaChevronDown className="mr-2" />
                  Zobacz więcej (
                  {Math.min(songsPerLoad, localSongs.length - visibleSongs)})
                </button>
                {showContactForm ? (
                  <div className="w-full p-6 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">
                        Podziel się swoją muzyką!
                      </h2>
                      <button
                        onClick={() => setShowContactForm(false)}
                        className="text-white hover:text-gray-200 transition duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium mb-1"
                        >
                          Tytuł utworu
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Wpisz tytuł utworu"
                          className="w-full p-2 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="artist"
                          className="block text-sm font-medium mb-1"
                        >
                          Wykonawca
                        </label>
                        <input
                          type="text"
                          name="artist"
                          value={formData.artist}
                          onChange={handleInputChange}
                          placeholder="Wpisz nazwę wykonawcy"
                          className="w-full p-2 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="youtubeLink"
                          className="block text-sm font-medium mb-1"
                        >
                          Link do YouTube
                        </label>
                        <input
                          type="text"
                          name="youtubeLink"
                          value={formData.youtubeLink}
                          onChange={handleInputChange}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full p-2 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-white text-red-500 font-bold py-2 px-4 rounded-md hover:bg-red-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 sm:text-sm"
                      >
                        WYŚLIJ
                      </button>
                    </form>
                  </div>
                ) : (
                  <button
                    className="w-full p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-md hover:from-red-600 hover:to-pink-700 transition duration-300 flex items-center justify-center"
                    onClick={() => setShowContactForm(true)}
                  >
                    <FaMusic className="mr-2" />
                    Brakuje Twojego ulubionego utworu? Daj nam znać!
                  </button>
                )}
              </>
            ) : (
              visibleSongs > initialVisibleSongs && (
                <button
                  className="w-full p-4 bg-gray-100 text-blue-500 hover:bg-gray-200 transition duration-300 flex items-center justify-center"
                  onClick={collapseSongList}
                >
                  <FaChevronUp className="mr-2" />
                  Zwiń listę
                </button>
              )
            ))}
        </div>
        <div className="md:w-2/3 flex flex-col">
          <div className="sticky top-0 bg-white z-10 p-6">
            <div
              className="youtube-player mb-4"
              style={{
                width: playerDimensions.width,
                height: playerDimensions.height,
              }}
            >
              {error && <div className="error-message">{error}</div>}
              <YouTube
                videoId={localSongs[currentSongIndex].youtubeId}
                opts={opts}
                onReady={onReady}
                onError={onError}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnd={nextSong}
                className="w-full h-full"
              />
            </div>
            <div className="flex justify-center items-center space-x-4 mt-4 mb-4">
              <button
                onClick={() =>
                  handleVote(localSongs[currentSongIndex].id, "up")
                }
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300"
              >
                <FaThumbsUp className="inline mr-2" />
                {localSongs[currentSongIndex].votes > 0
                  ? localSongs[currentSongIndex].votes
                  : 0}
              </button>
              <button
                onClick={() => toggleFavorite(localSongs[currentSongIndex].id)}
                className={`${
                  localSongs[currentSongIndex].isFavorite
                    ? "bg-gradient-to-r from-pink-500 to-purple-500"
                    : "bg-gray-300"
                } text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300`}
              >
                <FaHeart className="inline" />
              </button>
              <button
                onClick={() =>
                  handleVote(localSongs[currentSongIndex].id, "down")
                }
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300"
              >
                <FaThumbsDown className="inline mr-2" />
                {localSongs[currentSongIndex].votes < 0
                  ? Math.abs(localSongs[currentSongIndex].votes)
                  : 0}
              </button>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <button
                onClick={previousSong}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 text-lg"
              >
                <FaArrowUp className="mr-2 inline" />
                Poprzedni
              </button>
              <button
                onClick={togglePlayback}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 text-lg"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={nextSong}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 text-lg"
              >
                Następny
                <FaArrowDown className="ml-2 inline" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <h1> Sekcja Komentarzy</h1>
            {/* Tutaj możesz dodać dodatkową zawartość, która będzie przewijana pod odtwarzaczem */}
          </div>
        </div>
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
