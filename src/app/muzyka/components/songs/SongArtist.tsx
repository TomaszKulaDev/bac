import { memo } from "react";

interface SongArtistProps {
  artist: string;
}

export const SongArtist = memo(({ artist }: SongArtistProps) => (
  <p className="text-xs text-gray-600 truncate">
    {artist.length > 30 ? `${artist.slice(0, 30)}...` : artist}
  </p>
));

SongArtist.displayName = 'SongArtist'; 