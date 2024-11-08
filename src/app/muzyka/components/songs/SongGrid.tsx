import React from 'react';
import Image from 'next/image';
import { Song, SongLevel } from '../../types';
import { FaPlay, FaPause, FaBookmark, FaHeart } from 'react-icons/fa';
import { getYouTubeThumbnail } from '../../utils/youtube';
import { motion } from 'framer-motion';

interface SongGridProps {
  songs: Song[];
  currentSongId?: string;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
  favorites: Set<string>;
}

const levelConfig = {
  beginner: { label: 'Początkujący', color: 'bg-green-500' },
  intermediate: { label: 'Średni', color: 'bg-yellow-500' },
  advanced: { label: 'Zaawansowany', color: 'bg-red-500' },
  impro: { label: 'Impro', color: 'bg-purple-500' }
} as const;

const LevelBadge: React.FC<{ level: keyof typeof levelConfig }> = ({ level }) => {
  const config = levelConfig[level];
  return (
    <div className={`absolute top-1 right-1 ${config.color} text-white text-xs px-2 py-0.5 rounded-full z-10 opacity-90`}>
      {config.label}
    </div>
  );
};

const getSongLevel = (song: Song): SongLevel | undefined => {
  if (song.impro) return 'impro';
  if (song.beginnerFriendly) return 'beginner';
  return undefined;
};

const SongGrid: React.FC<SongGridProps> = ({
  songs,
  currentSongId,
  isPlaying,
  onSongSelect,
  onAddToPlaylist,
  onToggleFavorite,
  favorites,
}) => {
  return (
    <div className="w-full bg-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Szybki wybór
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {songs.map((song) => {
          const isCurrentSong = song.id === currentSongId;
          const isFavorite = favorites.has(song.id);
          const level = getSongLevel(song);
          
          return (
            <motion.div
              key={song.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer bg-gray-50 rounded-lg p-1"
              onClick={() => onSongSelect(song.id)}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                {level && <LevelBadge level={level} />}
                <Image
                  src={getYouTubeThumbnail(song.youtubeId)}
                  alt={`${song.title} - ${song.artist}`}
                  width={75}
                  height={75}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/default-album-cover.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSongSelect(song.id);
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
                        onAddToPlaylist(song.id);
                      }}
                      className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      aria-label="Dodaj do playlisty"
                    >
                      <FaBookmark className="w-3 h-3 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(song.id);
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
              </div>
              <div className="mt-2 px-1">
                <h3 className="text-xs font-medium text-gray-900 truncate">{song.title}</h3>
                <p className="text-xs text-gray-600 truncate">{song.artist}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SongGrid;