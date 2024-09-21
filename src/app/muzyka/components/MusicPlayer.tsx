// src/components/MusicPlayer.tsx

"use client";

import { FaPlay, FaPause, FaArrowUp, FaArrowDown, FaMusic } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";

import { YouTubePlayer } from "youtube-player/dist/types";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import Image from "next/image";

// Rest of the imports...

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
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const playSong = (index: number) => {
    if (index >= 0 && index < songs.length && songs[index].youtubeId) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
      setShowMiniPlayer(true);
      setIsLoading(true);
      if (player) {
        player.loadVideoById(songs[index].youtubeId);
        player.playVideo();
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      setIsPlaying(true);
    }
  };

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
    setIsLoading(false);
  };

  const stopMusic = () => {
    if (player) {
      player.stopVideo();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (player && songs[currentSongIndex]) {
      player.loadVideoById(songs[currentSongIndex].youtubeId);
      if (isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [currentSongIndex, songs, player, isPlaying]);

  const playVideo = () => {
    if (player) {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (player) {
      player.pauseVideo();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const previousSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  return (
    <div className="music-player bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Lista utworów</h2>
      <div className="flex flex-col md:flex-row">
        <div className="song-list mb-6 md:mb-0 md:w-1/2 md:pr-4 max-h-[360px] overflow-y-auto">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`song-item p-3 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out ${
                currentSongIndex === index ? "bg-gray-200" : ""
              } flex items-center justify-between`}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
                setIsLoading(true);
              }}
            >
              <div className="flex items-center">
                <div className="w-20 flex-shrink-0 flex items-center mr-2">
                  <span className="text-gray-500 font-bold text-2xl w-8 text-right mr-2">
                    {index + 2}
                  </span>
                  <div className="w-8 h-8 flex items-center justify-center">
                    {index % 2 === 0 ? (
                      <FaArrowUp className="text-green-500 text-xl" />
                    ) : (
                      <FaArrowDown className="text-red-500 text-xl" />
                    )}
                  </div>
                </div>
                <div className="w-16 h-16 relative overflow-hidden mr-3">
                  <Image
                    src={getYouTubeThumbnail(song.youtubeId)}
                    alt={song.artist}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-600">{song.artist}</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                {currentSongIndex === index && isPlaying ? (
                  <FaMusic className="text-blue-500 text-xl transition-colors duration-300" />
                ) : (
                  <FaPlay className="text-gray-500 text-xl hover:text-blue-500 transition-colors duration-300" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="video-container md:w-1/2">
          <div className="aspect-w-16 aspect-h-9">
            <YouTube
              videoId={songs[currentSongIndex]?.youtubeId || ""}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: isPlaying ? 1 : 0,
                },
              }}
              onReady={(event: YouTubeEvent) => event.target.pauseVideo()}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnd={() =>
                setCurrentSongIndex(
                  (prevIndex) => (prevIndex + 1) % songs.length
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="controls mt-4 flex justify-center items-center">
        <button
          onClick={previousSong}
          className="bg-blue-500 text-white p-2 rounded-full mr-4"
        >
          Poprzedni
        </button>
        <button
          onClick={isPlaying ? pauseVideo : playVideo}
          className="bg-blue-500 text-white p-2 rounded-full mr-4"
        >
          {isPlaying ? "Pauza" : "Odtwórz"}
        </button>
        <button
          onClick={nextSong}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          Następny
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
