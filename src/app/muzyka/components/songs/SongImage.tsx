import Image from 'next/image';
import { Song } from '../../types';
import { memo } from 'react';
import { useImageFallback } from '../../hooks/useImageFallback';

interface SongImageProps {
  song: Song;
  priority?: boolean;
}

const SongImage: React.FC<SongImageProps> = ({ song, priority = false }) => {
  const { imageSrc, handleError } = useImageFallback(song.youtubeId);

  return (
    <div className="relative w-full">
      <div className="relative pb-[25%] w-full">
        <Image
          src={imageSrc}
          alt={song.title}
          fill
          sizes="(max-width: 268px) 40vw, (max-width: 100px) 15vw, 10vw"
          className="absolute inset-0 rounded-lg object-cover"
          priority={priority}
          loading="lazy"
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default memo(SongImage);