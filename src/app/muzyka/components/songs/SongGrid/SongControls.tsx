import { FaPlay, FaPause, FaBookmark, FaHeart } from 'react-icons/fa';

interface SongControlsProps {
  songId: string;
  isCurrentSong: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
}

export const SongControls: React.FC<SongControlsProps> = ({
  songId,
  isCurrentSong,
  isPlaying,
  isFavorite,
  onSongSelect,
  onAddToPlaylist,
  onToggleFavorite,
}) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <div className="flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSongSelect(songId);
          }}
          className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label={isCurrentSong && isPlaying ? "Zatrzymaj" : "Odtwórz"}
        >
          {isCurrentSong && isPlaying ? (
            <FaPause className="w-3 h-3 text-white" />
          ) : (
            <FaPlay className="w-3 h-3 text-white" />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToPlaylist(songId);
          }}
          className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Dodaj do playlisty"
        >
          <FaBookmark className="w-3 h-3 text-white" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(songId);
          }}
          className={`p-1 rounded-full transition-colors ${
            isFavorite 
              ? 'bg-red-500/50 hover:bg-red-500/60' 
              : 'bg-white/20 hover:bg-white/30'
          }`}
          aria-label="Dodaj do ulubionych"
        >
          <FaHeart className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
};