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
    <div className="relative group w-full max-w-[250px] mx-auto">
      <div className="relative pb-[56.25%] rounded-md overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <Image
          src={imageSrc}
          alt={`${song.title} - ${song.artist}`}
          fill
          className="absolute inset-0 object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 35vw, (max-width: 1024px) 20vw, 12vw"
          priority
          onError={handleError}
        />
        <BadgeContainer song={song} />
        <SongControls {...props} songId={song.id} />
      </div>
      <div className="mt-1 px-0.5">
        <h3 className="text-xs font-medium text-gray-900 truncate">{song.title}</h3>
        <p className="text-[10px] text-gray-600 truncate">{song.artist}</p>
      </div>
    </div>
  );
};