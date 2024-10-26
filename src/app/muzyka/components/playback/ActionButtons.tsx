import { FaHeart, FaPlus, FaBookmark } from "react-icons/fa";

interface ActionButtonsProps {
  currentSongId: string | undefined;
  onLike: (songId: string) => void;
  isLiked: boolean;
  onCreatePlaylist: () => void;
  onAddToPlaylist: (songId: string) => void;
  playlistCount: number;
  hasPlaylistsAndExpanded: boolean;
  isAuthenticated?: boolean;
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
}) => {
  const handleLikeClick = () => {
    if (!currentSongId) return;
    if (!isAuthenticated) return;
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
        className={`p-2 rounded-full transition-all duration-300 ease-in-out 
          ${isLiked 
            ? "text-red-500 hover:text-red-600 active:text-red-700" 
            : "text-gray-600 hover:text-red-500"} 
          ${!isAuthenticated && "opacity-50 cursor-not-allowed"}
          active:scale-95`}
        aria-label={isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        title={!isAuthenticated 
          ? "Zaloguj się, aby polubić utwór" 
          : (isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych")}
        disabled={!isAuthenticated}
      >
        <FaHeart size={20} aria-hidden="true" />
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
