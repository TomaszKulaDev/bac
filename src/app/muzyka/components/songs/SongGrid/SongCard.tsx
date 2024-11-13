import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useImageFallback } from '../../../hooks/useImageFallback';
import { BadgeContainer } from './BadgeContainer';
import { SongControls } from './SongControls';
import type { SongCardProps } from './types';

export const SongCard: React.FC<SongCardProps> = ({ song, ...props }) => {
  const { imageSrc, handleError } = useImageFallback(song.youtubeId);

  return (
    <div className="relative group w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-[3/3] rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${song.title} - ${song.artist}`}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority
          onError={handleError}
        />
        <SongControls {...props} songId={song.id} />
      </div>
      <div className="px-1 pt-2 pb-4">
        <h3 className="text-base font-medium text-gray-900 truncate mb-1">
          {song.title}
        </h3>
        <p className="text-sm font-medium text-gray-600 truncate mb-2">
          {song.artist}
        </p>
        <BadgeContainer song={song} />
      </div>
    </div>
  );
};