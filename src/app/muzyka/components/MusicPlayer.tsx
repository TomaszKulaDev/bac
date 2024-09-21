// src/components/MusicPlayer.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { FaPlay, FaMusic, FaArrowUp, FaArrowDown, FaThumbsUp, FaThumbsDown, FaHeart, FaChevronDown, FaChevronUp } from "react-icons/fa";
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
  const [showAllSongs, setShowAllSongs] = useState(false);

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
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
      setCurrentSongIndex(songs.length - 1);
    }
    setIsPlaying(true);
    setIsLoading(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleVote = (songId: string, voteType: 'up' | 'down') => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [songId]: (prevVotes[songId] || 0) + (voteType === 'up' ? 1 : -1)
    }));
  };

  const toggleFavorite = (songId: string) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [songId]: !prevFavorites[songId]
    }));
  };

  const toggleShowAllSongs = () => {
    setShowAllSongs(!showAllSongs);
  };

  return (
    <div className="music-player bg-white shadow-lg min-h-screen flex flex-col w-full">
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="song-list md:w-1/3 border-r border-gray-200 overflow-y-auto">
          {songs.slice(0, 9).map((song, index) => (
            <div
              key={song.id}
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
          ))}
          {songs.length > 9 && (
            <>
              {showAllSongs ? (
                <>
                  {songs.slice(9).map((song, index) => (
                    <div
                      key={song.id}
                      className={`song-item p-4 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out ${
                        currentSongIndex === index + 9 ? "bg-gray-200" : ""
                      } flex items-center`}
                      onClick={() => {
                        setCurrentSongIndex(index + 9);
                        setIsPlaying(true);
                        setIsLoading(true);
                      }}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-2 flex items-center justify-center bg-gray-200 rounded-full">
                          <span className="text-gray-600 font-semibold">
                            {index + 10}
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
                        {currentSongIndex === index + 9 && isPlaying ? (
                          <FaMusic className="text-blue-500 text-xl transition-colors duration-300" />
                        ) : (
                          <FaPlay className="text-gray-500 text-xl hover:text-blue-500 transition-colors duration-300" />
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    className="w-full p-4 bg-gray-100 text-blue-500 hover:bg-gray-200 transition duration-300 flex items-center justify-center"
                    onClick={toggleShowAllSongs}
                  >
                    <FaChevronUp className="mr-2" /> Zwiń listę
                  </button>
                </>
              ) : (
                <button
                  className="w-full p-4 bg-gray-100 text-blue-500 hover:bg-gray-200 transition duration-300 flex items-center justify-center"
                  onClick={toggleShowAllSongs}
                >
                  <FaChevronDown className="mr-2" /> Zobacz więcej ({songs.length - 9})
                </button>
              )}
            </>
          )}
        </div>
        <div className="md:w-2/3 flex flex-col">
          <div className="sticky top-0 bg-white z-10 p-6">
            <div className="youtube-player mb-4">
              <YouTube
                videoId={songs[currentSongIndex].youtubeId}
                opts={{
                  width: "100%",
                  height: "480",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                onReady={onPlayerReady}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnd={nextSong}
              />
            </div>
            <div className="flex justify-center items-center space-x-4 mt-4 mb-4">
              <button
                onClick={() => handleVote(songs[currentSongIndex].id, 'up')}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                <FaThumbsUp className="inline mr-2" />
                {votes[songs[currentSongIndex].id] > 0 ? votes[songs[currentSongIndex].id] : 0}
              </button>
              <button
                onClick={() => toggleFavorite(songs[currentSongIndex].id)}
                className={`${
                  favorites[songs[currentSongIndex].id] ? 'bg-red-500' : 'bg-gray-300'
                } text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300`}
              >
                <FaHeart className="inline" />
              </button>
              <button
                onClick={() => handleVote(songs[currentSongIndex].id, 'down')}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                <FaThumbsDown className="inline mr-2" />
                {votes[songs[currentSongIndex].id] < 0 ? Math.abs(votes[songs[currentSongIndex].id]) : 0}
              </button>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <button
                onClick={previousSong}
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg"
              >
                <FaArrowUp className="mr-2 inline" />
                Poprzedni
              </button>
              <button
                onClick={togglePlay}
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg"
              >
                {isPlaying ? "Pauza" : "Odtwórz"}
              </button>
              <button
                onClick={nextSong}
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg"
              >
                Następny
                <FaArrowDown className="ml-2 inline" />
              </button>
            </div>
          </div>
          <div className="p-6">
            {/* Tutaj możesz dodać dodatkową zawartość, która będzie przewijana pod odtwarzaczem */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
