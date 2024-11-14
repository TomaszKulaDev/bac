import { memo } from "react";

interface SongArtistProps {
  artist: string;
}

export const SongArtist = memo(({ artist }: SongArtistProps) => (
  <p className="font-['NeueMontreal',Arial,sans-serif] text-sm font-normal tracking-[0.5px] leading-normal text-[#3a3a3c] truncate" style={{fontVariant: 'normal'}}>
    {artist.length > 30 ? `${artist.slice(0, 30)}...` : artist}
  </p>
));

SongArtist.displayName = 'SongArtist'; 