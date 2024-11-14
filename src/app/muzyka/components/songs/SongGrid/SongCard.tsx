import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useImageFallback } from '../../../hooks/useImageFallback';
import { BadgeContainer } from './BadgeContainer';
import { SongControls } from './SongControls';
import type { SongCardProps } from './types';
import { FaHeart } from 'react-icons/fa';

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
      <div className="border-b border-gray-100">
        <div className="flex items-center gap-2 px-1 py-2">
          {/* TODO: Tymczasowy avatar - w przyszłości zaimplementować wyświetlanie zdjęć profilowych użytkowników, którzy polubili utwór */}
          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-100">
            <Image
              src="/images/default-avatar.png"
              alt="Avatar użytkownika"
              fill
              sizes="24px"
              className="object-cover"
              priority={false}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">
          Liczba polubień: {song.likesCount || 0}
          </span>
        </div>
      </div>
      <div className="px-1 pt-2 pb-4">
        <h3 className="font-semibold truncate text-sm text-black">
          {song.title}
        </h3>
        <p className="font-['NeueMontreal',Arial,sans-serif] text-sm font-normal tracking-[0.5px] leading-normal text-[#3a3a3c] truncate" style={{fontVariant: 'normal'}}>
          {song.artist}
        </p>
        <BadgeContainer song={song} />
      </div>
    </div>
  );
};

