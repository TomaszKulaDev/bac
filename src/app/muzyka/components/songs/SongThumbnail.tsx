import { memo } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Song } from "../../types";
import { getYouTubeThumbnail } from "../../utils/youtube";

interface SongThumbnailProps {
  song: Song;
  isCurrentSong: boolean;
  isPlaying: boolean;
}

export const SongThumbnail = memo(({ song, isCurrentSong, isPlaying }: SongThumbnailProps) => (
  <div className="relative w-14 h-14 flex-shrink-0">
    <Image
      src={getYouTubeThumbnail(song.youtubeId)}
      alt={song.title}
      width={56}
      height={56}
      className="rounded-lg object-cover"
    />
    {isCurrentSong && isPlaying && (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
        <FaPlay className="text-white text-lg" />
      </div>
    )}
  </div>
));

SongThumbnail.displayName = 'SongThumbnail';
