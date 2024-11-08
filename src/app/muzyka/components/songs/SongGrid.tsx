import React from 'react';
import Image from 'next/image';
import { Song } from '../../types';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => {
          const isCurrentSong = song.id === currentSongId;
          const isFavorite = favorites.has(song.id);
          
          return (
            <motion.div
              key={song.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer bg-gray-50 rounded-lg p-2"
              onClick={() => onSongSelect(song.id)}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={getYouTubeThumbnail(song.youtubeId)}
                  alt={`${song.title} - ${song.artist}`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/default-album-cover.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSongSelect(song.id);
                      }}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      aria-label={isCurrentSong && isPlaying ? "Zatrzymaj" : "Odtwórz"}
                    >
                      {isCurrentSong && isPlaying ? (
                        <FaPause className="w-6 h-6 text-white" />
                      ) : (
                        <FaPlay className="w-6 h-6 text-white" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToPlaylist(song.id);
                      }}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      aria-label="Dodaj do playlisty"
                    >
                      <FaBookmark className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(song.id);
                      }}
                      className={`p-3 rounded-full transition-colors ${
                        isFavorite 
                          ? 'bg-red-500/50 hover:bg-red-500/60' 
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                      aria-label="Dodaj do ulubionych"
                    >
                      <FaHeart className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <h3 className="font-medium text-gray-900 truncate">{song.title}</h3>
                <p className="text-sm text-gray-600 truncate">{song.artist}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SongGrid;