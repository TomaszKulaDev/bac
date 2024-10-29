import Image from "next/image";
import { Song } from "../../types";

interface TrackInfoProps {
  currentSong: {
    title: string;
    artist: string;
    thumbnail: string;
    id: string;
  } | null;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({ currentSong }) => {
  if (!currentSong) return null;

  return (
    <div 
      className="flex items-center space-x-4 w-full sm:w-1/3 mb-0.5 sm:mb-0"
      aria-live="polite"
    >
      <div className="relative w-12 h-12">
        <Image
          src={currentSong.thumbnail}
          alt={`Okładka albumu ${currentSong.title}`}
          fill
          className="object-cover rounded-md shadow-md"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold truncate" aria-label="Tytuł utworu">
          {currentSong.title}
        </span>
        <span className="text-sm text-gray-500 truncate" aria-label="Wykonawca">
          {currentSong.artist}
        </span>
      </div>
    </div>
  );
};
