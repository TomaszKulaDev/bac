import { FaHeart, FaPlus, FaBookmark } from "react-icons/fa";

interface ActionButtonsProps {
  currentSongId: string | undefined;
  onLike: (songId: string) => void;
  isLiked: boolean;
  onCreatePlaylist: () => void;
  onAddToPlaylist: (songId: string) => void;
  playlistCount: number;
  hasPlaylistsAndExpanded: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentSongId,
  onLike,
  isLiked,
  onCreatePlaylist,
  onAddToPlaylist,
  playlistCount,
  hasPlaylistsAndExpanded,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => currentSongId && onLike(currentSongId)}
        className={`text-gray-600 hover:text-red-500 ${
          isLiked ? "text-red-500" : ""
        } p-2`}
        aria-label={isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        title={isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
      >
        <FaHeart size={20} aria-hidden="true" />
      </button>

      {playlistCount < 2 && (
        <button
          onClick={onCreatePlaylist}
          className="text-gray-600 hover:text-purple-500 p-2"
          title="Utwórz nową playlistę"
          aria-label="Utwórz nową playlistę"
        >
          <FaPlus size={20} aria-hidden="true" />
        </button>
      )}

      {hasPlaylistsAndExpanded && (
        <button
          onClick={() => currentSongId && onAddToPlaylist(currentSongId)}
          className="text-gray-600 hover:text-purple-500 p-2"
          title="Dodaj do playlisty"
          aria-label="Dodaj bieżący utwór do playlisty"
        >
          <FaBookmark size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

