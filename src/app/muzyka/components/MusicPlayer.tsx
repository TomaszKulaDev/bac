// src/components/MusicPlayer.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [visibleSongs, setVisibleSongs] = useState(7);
  const initialVisibleSongs = 7;
  const songsPerLoad = 10;
  const [localSongs, setLocalSongs] = useState<Song[]>(songs);
  const [player, setPlayer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [playerDimensions, setPlayerDimensions] = useState({ width: "640px", height: "360px" });

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
    setVotes((prevVotes) => {
      const newVotes = {
        ...prevVotes,
        [songId]: (prevVotes[songId] || 0) + (voteType === "up" ? 1 : -1),
      };

      setLocalSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.id === songId ? { ...song, score: newVotes[songId] } : song
        )
      );

      return newVotes;
    });
  };

  const toggleFavorite = (songId: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [songId]: !prevFavorites[songId],
    }));
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
    setLocalSongs((prevSongs) =>
      [...prevSongs].sort((a, b) => b.score - a.score)
    );
  }, []);

  useEffect(() => {
    sortSongs();
  }, [votes, sortSongs]);

  const onReady = (event: { target: any }) => {
    setPlayer(event.target);
    setError(null);
  };

  const onError = (event: { data: number }) => {
    console.error("Błąd YouTube:", event.data);
    setError(
      "Wystąpił błąd podczas ładowania filmu. Sprawdź swoje ustawienia prywatności lub blokery reklam."
    );
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
    window.addEventListener('resize', updatePlayerDimensions);
    return () => window.removeEventListener('resize', updatePlayerDimensions);
  }, [updatePlayerDimensions]);

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
                    {index % 2 === 0 ? (
                      <FaArrowUp className="text-green-500 text-2xl" />
                    ) : (
                      <FaArrowDown className="text-red-500 text-2xl" />
                    )}
                  </div>
                  <div className="w-12 h-12 mr-4 relative">
                    <Image
                      src={getYouTubeThumbnail(song.youtubeId)}
                      alt={song.title}
                      layout="fill"
                      objectFit="cover"
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
              <button
                className="w-full p-4 bg-gray-100 text-blue-500 hover:bg-gray-200 transition duration-300 flex items-center justify-center"
                onClick={loadMoreSongs}
              >
                <FaChevronDown className="mr-2" />
                Zobacz więcej (
                {Math.min(songsPerLoad, localSongs.length - visibleSongs)})
              </button>
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
            <div className="youtube-player mb-4" style={{ width: playerDimensions.width, height: playerDimensions.height }}>
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
                {votes[localSongs[currentSongIndex].id] > 0
                  ? votes[localSongs[currentSongIndex].id]
                  : 0}
              </button>
              <button
                onClick={() => toggleFavorite(localSongs[currentSongIndex].id)}
                className={`${
                  favorites[localSongs[currentSongIndex].id]
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
                {votes[localSongs[currentSongIndex].id] < 0
                  ? Math.abs(votes[localSongs[currentSongIndex].id])
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
    </div>
  );
};

export default MusicPlayer;
