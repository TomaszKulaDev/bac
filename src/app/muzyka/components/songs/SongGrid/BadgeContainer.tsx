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
    <div className="absolute top-1.5 left-1.5 z-20">
      <div className="flex flex-wrap gap-1 items-start max-w-[200px]">
        <LevelBadge level={getSongLevel(song)} />
        <StyleBadge style={getSongStyle(song)} />
        <TempoBadge tempo={getSongTempo(song)} />
      </div>
    </div>
  );
}; 