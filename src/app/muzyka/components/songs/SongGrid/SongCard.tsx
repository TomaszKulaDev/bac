import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getYouTubeThumbnail } from '../../../utils/youtube';
import { LevelBadge } from './LevelBadge';
import { SongControls } from './SongControls';
import { getSongLevel, getSongStyle, getSongTempo } from './utils';
import type { SongCardProps } from './types';
import { StyleBadge } from './StyleBadge';
import { TempoBadge } from './TempoBadge';
import { BadgeContainer } from './BadgeContainer';

export const SongCard: React.FC<SongCardProps> = ({ song, ...props }) => {
  return (
    <div className="relative group w-full">
      <div className="relative aspect-video rounded-md overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <Image
          src={getYouTubeThumbnail(song.youtubeId)}
          alt={`${song.title} - ${song.artist}`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/default-album-cover.jpg";
          }}
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