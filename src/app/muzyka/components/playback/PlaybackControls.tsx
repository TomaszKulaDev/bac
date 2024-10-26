import { FaPlay, FaPause, FaBackward, FaForward, FaRedo, FaRetweet } from "react-icons/fa";
import { RepeatMode } from "../../types";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  repeatMode: RepeatMode;
  onToggleRepeatMode: (mode: "song" | "playlist") => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  repeatMode,
  onToggleRepeatMode,
}) => {
  return (
    <div className="flex items-center space-x-4 mb-2">
      <button
        onClick={() => onToggleRepeatMode("playlist")}
        className={`text-gray-600 hover:text-purple-500 ${
          repeatMode.playlist === "on" ? "text-purple-500" : ""
        } p-2 transition-all duration-150 ease-in-out`}
        aria-label="Powtarzaj playlistę"
        title="Powtarzaj playlistę"
        aria-pressed={repeatMode.playlist === "on"}
      >
        <FaRedo size={20} />
      </button>
      <button
        onClick={onPrevious}
        className="text-gray-600 hover:text-gray-800 p-2 transition-all duration-150 ease-in-out"
        aria-label="Poprzedni utwór"
        title="Poprzedni utwór"
      >
        <FaBackward size={24} />
      </button>
      <button
        onClick={onTogglePlay}
        className="text-gray-600 hover:text-gray-800 p-2 transition-all duration-150 ease-in-out active:scale-95 active:bg-gray-200 rounded-full"
        aria-label={isPlaying ? "Pauza" : "Odtwórz"}
        title={isPlaying ? "Pauza" : "Odtwórz"}
      >
        {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
      </button>
      <button
        onClick={onNext}
        className="text-gray-600 hover:text-gray-800 p-2 transition-all duration-150 ease-in-out"
        aria-label="Następny utwór"
        title="Następny utwór"
      >
        <FaForward size={24} />
      </button>
      <button
        onClick={() => onToggleRepeatMode("song")}
        className={`text-gray-600 hover:text-purple-500 ${
          repeatMode.song === "on" ? "text-purple-500" : ""
        } p-2 transition-all duration-150 ease-in-out`}
        aria-label="Powtarzaj utwór"
        title="Powtarzaj utwór"
        aria-pressed={repeatMode.song === "on"}
      >
        <FaRetweet size={20} />
      </button>
    </div>
  );
};

