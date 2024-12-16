import { FaPlus, FaBookmark } from "react-icons/fa";

interface ActionButtonsProps {
  currentSongId: string | undefined;
  onCreatePlaylist: () => void;
  onAddToPlaylist: (songId: string) => void;
  playlistCount: number;
  hasPlaylistsAndExpanded: boolean;
  isAuthenticated: boolean;
}

export default function ActionButtons({
  currentSongId,
  onCreatePlaylist,
  onAddToPlaylist,
  playlistCount,
  hasPlaylistsAndExpanded,
  isAuthenticated,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-between sm:justify-end sm:gap-4">
      <button
        onClick={onCreatePlaylist}
        className="text-gray-500 px-5 sm:px-2"
        disabled={!isAuthenticated}
      >
        <FaPlus size={20} />
      </button>
      <button
        onClick={(e) => currentSongId && onAddToPlaylist(currentSongId)}
        className="text-gray-500 px-5 sm:px-2"
        disabled={!isAuthenticated || !hasPlaylistsAndExpanded || !currentSongId}
      >
        <FaBookmark size={20} />
      </button>
    </div>
  );
}
