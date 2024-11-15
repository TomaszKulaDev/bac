import { motion } from 'framer-motion';
import { FaCrown, FaHeart, FaPlay, FaPause } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLike } from '../hooks/useLike';
import { RootState } from '@/store/store';
import type { Song } from '@/types/song';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { getYouTubeThumbnail } from '../utils/youtube';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface TopSongsProps {
  onSongSelect?: (songId: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
}

export const TopSongs: React.FC<TopSongsProps> = ({
  onSongSelect,
  currentSongId,
  isPlaying
}) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const { handleLike } = useLike();
  
  const topSongs = useSelector((state: RootState) => 
    [...state.songs.songs]
      .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
      .slice(0, 5)
  );

    function showErrorToast(arg0: string) {
        throw new Error('Function not implemented.');
    }

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex gap-8">
        {/* Lewa kolumna z listą utworów */}
        <motion.div 
          role="region"
          aria-label="Lista top 5 utworów"
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="w-1/2 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
        >
          <header className="flex items-center gap-3 mb-6">
            <FaCrown className="text-2xl text-amber-400" />
            <h2 className="text-xl font-bold text-white">Top 5 Najpopularniejszych </h2>
          </header>

          <div className="grid gap-3">
            {topSongs.map((song, index) => (
              <motion.div
                key={song._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all group
                  ${currentSongId === song._id ? 'bg-white/15' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={getYouTubeThumbnail(song.youtubeId)}
                    alt={song.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <span className="absolute bottom-1 left-2 text-lg font-bold text-white/90">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-white truncate">{song.title}</h3>
                  <p className="text-sm text-indigo-200/70 truncate">{song.artist}</p>
                </div>

                <div className="flex items-center gap-2">
                  {onSongSelect && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onSongSelect(song._id)}
                      className="p-2 text-indigo-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    >
                      {currentSongId === song._id && isPlaying ? (
                        <FaPause className="w-4 h-4" />
                      ) : (
                        <FaPlay className="w-4 h-4" />
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prawa kolumna z informacją o odtwarzanym utworze */}
        <div className="w-1/2">
          <div className="sticky top-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            {currentSongId ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Aktualnie odtwarzane:</h2>
                {topSongs.find(s => s._id === currentSongId) && (
                  <>
                    <div className="aspect-video rounded-xl overflow-hidden bg-black/50">
                      <Image
                        src={getYouTubeThumbnail(topSongs.find(s => s._id === currentSongId)?.youtubeId || '')}
                        alt="Miniatura"
                        width={640}
                        height={360}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-white">
                      <h3 className="font-semibold text-lg">
                        {topSongs.find(s => s._id === currentSongId)?.title}
                      </h3>
                      <p className="text-slate-300">
                        {topSongs.find(s => s._id === currentSongId)?.artist}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <p>Wybierz utwór z listy aby rozpocząć odtwarzanie</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
