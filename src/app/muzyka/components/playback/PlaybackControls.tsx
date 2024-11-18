import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaRetweet,
  FaRedo,
} from "react-icons/fa";
import { RepeatMode } from "../../types";
import { useKeyboardControls } from '../../hooks/useKeyboardControls';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  repeatMode: RepeatMode;
  onToggleRepeatMode: (mode: "song" | "playlist") => void;
  isLoading?: boolean;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  repeatMode,
  onToggleRepeatMode,
  isLoading = false,
}) => {
  useKeyboardControls({
    onTogglePlay,
    onPrevious,
    onNext
  });

  return (
    <div
      className="flex items-center space-x-4"
      role="group"
      aria-label="Kontrolki odtwarzania"
    >
      <button
        onClick={() => onToggleRepeatMode("playlist")}
        className={`text-gray-600 p-2 rounded-full transition-all duration-300 ease-in-out ${
          repeatMode.playlist === "on"
            ? "bg-gray-100 shadow-inner transform translate-y-px"
            : "hover:bg-gray-50 active:bg-gray-100 active:shadow-inner active:transform active:translate-y-px"
        }`}
        aria-label={`Powtarzaj playlistę: ${
          repeatMode.playlist === "on" ? "włączone" : "wyłączone"
        }`}
        title="Powtarzaj playlistę"
        aria-pressed={repeatMode.playlist === "on"}
      >
        <FaRedo
          size={24}
          className={`${
            repeatMode.playlist === "on" ? "text-blue-500" : ""
          } transform rotate-90`}
        />
      </button>

      <button
        onClick={onPrevious}
        className="text-gray-600 hover:text-gray-800 p-2 transition-all duration-150 ease-in-out active:scale-95"
        aria-label="Poprzedni utwór"
        title="Poprzedni utwór"
        disabled={isLoading}
      >
        <FaBackward size={24} />
      </button>

      <button
        onClick={onTogglePlay}
        className="bg-white rounded-full p-2 shadow-lg transition-all duration-150 ease-in-out active:scale-95 hover:bg-gray-50"
        aria-label={isPlaying ? "Pauza" : "Odtwórz"}
        title={isPlaying ? "Pauza" : "Odtwórz"}
        disabled={isLoading}
      >
        {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
      </button>

      <button
        onClick={onNext}
        className="text-gray-600 hover:text-gray-800 p-2 transition-all duration-150 ease-in-out active:scale-95"
        aria-label="Następny utwór"
        title="Następny utwór"
        disabled={isLoading}
      >
        <FaForward size={24} />
      </button>

      <button
        onClick={() => onToggleRepeatMode("song")}
        className={`text-gray-600 p-2 rounded-full transition-all duration-300 ease-in-out ${
          repeatMode.song === "on"
            ? "bg-gray-100 shadow-inner transform translate-y-px"
            : "hover:bg-gray-50 active:bg-gray-100 active:shadow-inner active:transform active:translate-y-px"
        }`}
        aria-label={`Powtarzaj utwór: ${
          repeatMode.song === "on" ? "włączone" : "wyłączone"
        }`}
        title="Powtarzaj utwór"
        aria-pressed={repeatMode.song === "on"}
      >
        <FaRetweet
          size={24}
          className={repeatMode.song === "on" ? "text-blue-500" : ""}
        />
      </button>
    </div>
  );
};
