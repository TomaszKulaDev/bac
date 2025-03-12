import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaRetweet,
  FaRedo,
} from "react-icons/fa";
import { RepeatMode } from "../../types";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { playerStyles as styles } from "@/styles/common/playerControls";

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
    onNext,
  });

  return (
    <div
      className="flex items-center space-x-4"
      role="group"
      aria-label="Kontrolki odtwarzania"
    >
      <button
        onClick={() => onToggleRepeatMode("playlist")}
        className={`${styles.controls.iconButton} ${
          repeatMode.playlist === "on" ? styles.controls.activeIconButton : ""
        }`}
        aria-label={`Powtarzaj playlistę: ${
          repeatMode.playlist === "on" ? "włączone" : "wyłączone"
        }`}
        title="Powtarzaj playlistę"
        aria-pressed={repeatMode.playlist === "on"}
      >
        <FaRedo size={24} className="transform rotate-90" />
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
        className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${
          isPlaying
            ? "from-amber-400 to-amber-500"
            : "from-amber-500 to-amber-600"
        } text-white shadow-lg hover:shadow-amber-200/50 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:shadow-[0_0_0_4px_rgba(255,255,255,0.5)] ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        aria-label={isPlaying ? "Pauza" : "Odtwórz"}
        title={isPlaying ? "Pauza" : "Odtwórz"}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isPlaying ? (
          <FaPause size={24} className="text-white ml-0.5" />
        ) : (
          <FaPlay size={24} className="text-white ml-1.5" />
        )}
        <span className="absolute inset-0 rounded-full bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
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
          className={repeatMode.song === "on" ? "text-amber-500" : ""}
        />
      </button>
    </div>
  );
};
