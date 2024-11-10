import { memo } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Song } from "../../types";
import { useImageFallback } from '../../hooks/useImageFallback';

interface SongThumbnailProps {
  song: Song;
  isCurrentSong: boolean;
  isPlaying: boolean;
}

export const SongThumbnail = memo(({ song, isCurrentSong, isPlaying }: SongThumbnailProps) => {
  const { imageSrc, handleError } = useImageFallback(song.youtubeId);

  return (
    <div className="relative w-10 h-10 flex-shrink-0 mr-4">
      <Image
        src={imageSrc}
        alt={song.title}
        width={40}
        height={40}
        className="rounded-lg object-cover"
        onError={handleError}
      />
      {isCurrentSong && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
          <FaPlay className="text-white text-sm" />
        </div>
      )}
    </div>
  );
});

SongThumbnail.displayName = 'SongThumbnail';
