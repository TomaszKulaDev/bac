import { FaPlay, FaPause, FaBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLike } from '../../../hooks/useLike';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface SongControlsProps {
  songId: string;
  isCurrentSong: boolean;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
}

export const SongControls: React.FC<SongControlsProps> = ({
  songId,
  isCurrentSong,
  isPlaying,
  onSongSelect,
  onAddToPlaylist,
  onToggleFavorite,
}) => {
  const { handleLike } = useLike();
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const song = useSelector((state: RootState) => 
    state.songs.songs.find((s: { _id: string }) => s._id === songId)
  );

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      return;
    }

    try {
      await handleLike(songId);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  if (!song) return null;

  return (
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onSongSelect(songId);
        }}
        className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        aria-label={isCurrentSong && isPlaying ? "Zatrzymaj" : "Odtwórz"}
      >
        {isCurrentSong && isPlaying ? (
          <FaPause className="w-5 h-5 text-white" />
        ) : (
          <FaPlay className="w-5 h-5 text-white relative left-0.5" />
        )}
      </motion.button>

      {isAuthenticated && song && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteClick}
          className={`p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors ${
            song.isLiked ? "text-red-500" : "text-white"
          }`}
          title={song.isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        >
          {song.isLiked ? (
            <FaHeart className="w-5 h-5" />
          ) : (
            <FaRegHeart className="w-5 h-5" />
          )}
          <span className="ml-1 text-sm">
            {song.likesCount || 0}
          </span>
        </motion.button>
      )}

      {isAuthenticated && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onAddToPlaylist(songId);
          }}
          className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Dodaj do playlisty"
        >
          <FaBookmark className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </div>
  );
};