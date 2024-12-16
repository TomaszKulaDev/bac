import { useEffect, useState } from 'react';
import type { Song } from '@/app/muzyka/types'; 
import { LevelBadge } from "./SongGrid/LevelBadge";
import { StyleBadge } from "./SongGrid/StyleBadge";
import { TempoBadge } from "./SongGrid/TempoBadge";
import { getSongLevel, getSongStyle, getSongTempo } from "./SongGrid/utils";

interface BadgeContainerProps {
  song: Song;
}

export const BadgeContainer: React.FC<BadgeContainerProps> = ({ song }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px to standardowy breakpoint dla sm
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-1 bg-gradient-to-b from-black/60 to-transparent rounded-t-xl">
      <div className="flex items-center justify-start gap-1 w-full">
        <LevelBadge level={getSongLevel(song)} isMobile={isMobile} />
        <StyleBadge style={getSongStyle(song)} isMobile={isMobile} />
        <TempoBadge tempo={getSongTempo(song)} isMobile={isMobile} />
      </div>
    </div>
  );
};
