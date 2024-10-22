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
} from "react-icons/fa";

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
  currentSong: { title: string; artist: string } | null;
  repeatMode: { song: "on" | "off"; playlist: "on" | "off" };
  onToggleRepeatMode: (mode: "song" | "playlist") => void;
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
      <div className="flex flex-col items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 mb-2">
          <button
            onClick={() => onToggleRepeatMode("playlist")}
            className={`text-gray-600 p-1 rounded-full transition-all duration-300 ease-in-out ${
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
              size={16}
              className={
                repeatMode.playlist === "on" ? "text-purple-500" : ""
              }
            />
          </button>
          <button
            onClick={onPrevious}
            className="text-gray-600 hover:text-gray-800 p-1"
          >
            <FaBackward size={16} />
          </button>
          <button
            onClick={onTogglePlay}
            className="bg-white rounded-full p-2 shadow-md transition-all duration-150 ease-in-out active:scale-95"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button
            onClick={onNext}
            className="text-gray-600 hover:text-gray-800 p-1"
          >
            <FaForward size={16} />
          </button>
          <button
            onClick={() => onToggleRepeatMode("song")}
            className={`text-gray-600 p-1 rounded-full transition-all duration-300 ease-in-out ${
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
              size={16}
              className={
                repeatMode.song === "on" ? "text-purple-500" : ""
              }
            />
          </button>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="text-xs text-gray-600 mb-1 text-center">
            {currentSong
              ? `${currentSong.title} - ${currentSong.artist}`
              : "Brak odtwarzanego utworu"}
          </div>
          <div className="w-2/3 flex items-center">
            <span className="text-xs text-gray-500 mr-1">
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
            <span className="text-xs text-gray-500 ml-1">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-2">
          <div className="w-1/3"></div>
          <div className="w-1/3 flex justify-center">
            {/* Kontrolki odtwarzania */}
          </div>
          <div className="w-1/3 flex justify-end items-center space-x-1">
            <button
              onClick={handleVolumeToggle}
              className="text-gray-600 hover:text-gray-800"
            >
              {isMuted || volume === 0 ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
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
    </div>
  );
};

export default PlaybackBar;
