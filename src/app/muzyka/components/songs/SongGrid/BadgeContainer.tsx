import { Song } from "../../../types";
import { LevelBadge } from "./LevelBadge";
import { StyleBadge } from "./StyleBadge";
import { TempoBadge } from "./TempoBadge";
import { getSongLevel, getSongStyle, getSongTempo } from "./utils";

interface BadgeContainerProps {
  song: Song;
}

export const BadgeContainer: React.FC<BadgeContainerProps> = ({ song }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-1 bg-gradient-to-b from-black/60 to-transparent rounded-t-xl">
      <div className="flex items-center justify-start gap-1 w-full">
        <LevelBadge level={getSongLevel(song)} />
        <StyleBadge style={getSongStyle(song)} />
        <TempoBadge tempo={getSongTempo(song)} />
      </div>
    </div>
  );
}; 