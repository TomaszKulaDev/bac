import React, { useState } from "react";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaVolumeUp,
  FaVolumeMute,
  FaRedo,
  FaRetweet,
  FaHeart,
  FaPlus,
  FaBookmark,
} from "react-icons/fa";
import Image from "next/image";

interface PlaybackBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  currentSong: {
    title: string;
    artist: string;
    thumbnail: string;
    id: string;
  } | null;
  repeatMode: { song: "on" | "off"; playlist: "on" | "off" };
  onToggleRepeatMode: (mode: "song" | "playlist") => void;
  onAddToPlaylist: (songId: string) => void;
  onLike: (songId: string) => void;
  isLiked: boolean;
}

const PlaybackBar: React.FC<PlaybackBarProps> = ({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  currentSong,
  repeatMode,
  onToggleRepeatMode,
  onAddToPlaylist,
  onLike,
  isLiked,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      onVolumeChange(volume || 0.5);
    } else {
      onVolumeChange(0);
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 w-1/4">
          {currentSong && (
            <>
              <Image
                src={currentSong.thumbnail}
                alt="Miniaturka"
                width={40}
                height={40}
                className="object-cover rounded"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold truncate">
                  {currentSong.title}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {currentSong.artist}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="w-2/4 flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={() => onToggleRepeatMode("playlist")}
              className={`text-gray-600 hover:text-gray-800 ${
                repeatMode.playlist === "on" ? "text-purple-500" : ""
              } p-2 transition-all duration-150 ease-in-out active:scale-95 active:bg-gray-200 rounded-full`}
            >
              <FaRedo size={17} />
            </button>
            <button
              onClick={onPrevious}
              className="text-gray-600 hover:text-gray-800 p-3 transition-all duration-150 ease-in-out active:scale-95 active:bg-gray-200 rounded-full"
            >
              <FaBackward size={28} />
            </button>
            <button
              onClick={onTogglePlay}
              className="text-gray-600 hover:text-gray-800 p-3 transition-all duration-150 ease-in-out active:scale-95 active:bg-gray-200 rounded-full"
            >
              {isPlaying ? <FaPause size={32} /> : <FaPlay size={32} />}
            </button>
            <button
              onClick={onNext}
              className="text-gray-600 hover:text-gray-800 p-3 transition-all duration-150 ease-in-out active:scale-95 active:bg-gray-200 rounded-full"
            >
              <FaForward size={28} />
            </button>
            <button
              onClick={() => onToggleRepeatMode("song")}
              className={`text-gray-600 hover:text-gray-800 ${
                repeatMode.song === "on" ? "text-purple-500" : ""
              } p-2 transition-all duration-150 ease-in-out active:scale-95 active:bg-gray-200 rounded-full`}
            >
              <FaRetweet size={20} />
            </button>
          </div>
          <div className="w-full flex items-center">
            <span className="text-xs text-gray-500 mr-2">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full h-1"
            />
            <span className="text-xs text-gray-500 ml-2">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="w-1/4 flex justify-end items-center space-x-4">
          <button
            onClick={() => onLike(currentSong?.id || "")}
            className={`text-gray-600 hover:text-red-500 ${
              isLiked ? "text-red-500" : ""
            }`}
          >
            <FaHeart size={16} />
          </button>
          <button
            onClick={() => onAddToPlaylist(currentSong?.id || "")}
            className="text-gray-600 hover:text-purple-500"
          >
            <FaBookmark size={16} />
          </button>
          <button
            onClick={handleVolumeToggle}
            className="text-gray-600 hover:text-gray-800"
          >
            {isMuted || volume === 0 ? (
              <FaVolumeMute size={16} />
            ) : (
              <FaVolumeUp size={16} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-16 h-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaybackBar;
