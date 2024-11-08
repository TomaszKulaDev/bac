import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getYouTubeThumbnail } from '../../../utils/youtube';
import { LevelBadge } from './LevelBadge';
import { SongControls } from './SongControls';
import { getSongLevel } from './utils';
import type { SongCardProps } from './types';

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isCurrentSong,
  isPlaying,
  isFavorite,
  onSongSelect,
  onAddToPlaylist,
  onToggleFavorite,
}) => {
  const level = getSongLevel(song);

  return (
    <motion.div
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
        <SongControls
          songId={song.id}
          isCurrentSong={isCurrentSong}
          isPlaying={isPlaying}
          isFavorite={isFavorite}
          onSongSelect={onSongSelect}
          onAddToPlaylist={onAddToPlaylist}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
      <div className="mt-2 px-1">
        <h3 className="text-xs font-medium text-gray-900 truncate">{song.title}</h3>
        <p className="text-xs text-gray-600 truncate">{song.artist}</p>
      </div>
    </motion.div>
  );
};