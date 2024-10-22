import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeMute,
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
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <button
            onClick={onPrevious}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaStepBackward />
          </button>
          <button
            onClick={onTogglePlay}
            className="text-gray-600 hover:text-gray-800"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={onNext}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaStepForward />
          </button>
        </div>
        <div className="flex-grow mx-4">
          <div className="text-sm text-gray-600 mb-1">
            {currentSong
              ? `${currentSong.title} - ${currentSong.artist}`
              : "Brak odtwarzanego utworu"}
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-xs text-gray-500 ml-2">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVolumeToggle}
            className="text-gray-600 hover:text-gray-800"
          >
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaybackBar;
