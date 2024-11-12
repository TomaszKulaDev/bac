import { FaHeart, FaPlus, FaBookmark } from "react-icons/fa";
import { useLike } from '../../hooks/useLike';

interface ActionButtonsProps {
  currentSongId: string | undefined;
  onLike: (songId: string) => void;
  isLiked: boolean;
  onCreatePlaylist: () => void;
  onAddToPlaylist: (songId: string) => void;
  playlistCount: number;
  hasPlaylistsAndExpanded: boolean;
  isAuthenticated?: boolean;
  likesCount?: number;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentSongId,
  onLike,
  isLiked,
  onCreatePlaylist,
  onAddToPlaylist,
  playlistCount,
  hasPlaylistsAndExpanded,
  isAuthenticated = false,
  likesCount = 0,
}) => {
  const { handleLike } = useLike();

  const handleLikeClick = () => {
    if (!currentSongId || !isAuthenticated) return;
    handleLike(currentSongId);
    onLike(currentSongId);
  };

  const handleAddToPlaylist = () => {
    if (!currentSongId) return;
    if (!isAuthenticated) return;
    onAddToPlaylist(currentSongId);
  };

  return (
    <div className="flex items-center space-x-4" role="group" aria-label="Akcje dla utworu">
      <button
        onClick={handleLikeClick}
        className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
        disabled={!isAuthenticated || !currentSongId}
      >
        <FaHeart size={20} />
        <span className="text-sm">{likesCount}</span>
      </button>

      {playlistCount < 2 && (
        <button
          onClick={onCreatePlaylist}
          className="p-2 rounded-full text-gray-600 hover:text-purple-500 
            transition-all duration-300 ease-in-out active:scale-95
            hover:bg-gray-50 active:bg-gray-100"
          title="Utwórz nową playlistę"
          aria-label="Utwórz nową playlistę"
        >
          <FaPlus size={20} aria-hidden="true" />
        </button>
      )}

      {hasPlaylistsAndExpanded && (
        <button
          onClick={handleAddToPlaylist}
          className={`p-2 rounded-full transition-all duration-300 ease-in-out
            ${!isAuthenticated && "opacity-50 cursor-not-allowed"}
            text-gray-600 hover:text-purple-500 hover:bg-gray-50 
            active:bg-gray-100 active:scale-95`}
          title={!isAuthenticated 
            ? "Zaloguj się, aby dodać do playlisty" 
            : "Dodaj do playlisty"}
          aria-label="Dodaj bieżący utwór do playlisty"
          disabled={!isAuthenticated}
        >
          <FaBookmark size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
