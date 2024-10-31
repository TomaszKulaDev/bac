import Image from 'next/image';
import { Song } from '../../types';
import { getYouTubeThumbnail } from '../../utils/youtube';
import { memo } from 'react';

interface SongImageProps {
  song: Song;
  priority?: boolean;
}

const SongImage: React.FC<SongImageProps> = ({ song, priority = false }) => {
  return (
    <div className="relative aspect-video w-full">
      <Image
        src={getYouTubeThumbnail(song.youtubeId)}
        alt={song.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-lg object-cover"
        priority={priority}
        loading="lazy"
      />
    </div>
  );
};

export default memo(SongImage);