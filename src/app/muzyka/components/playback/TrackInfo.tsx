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
  return (
    <div
      className="flex items-center space-x-4 w-full sm:w-1/3 mb-0.5 sm:mb-0"
      aria-live="polite"
    >
      <div className="relative w-12 h-12">
        {currentSong?.thumbnail ? (
          <Image
            src={currentSong.thumbnail}
            alt={`Okładka albumu ${currentSong.title}`}
            fill
            className="object-cover rounded-md shadow-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-2xl">♪</span>
          </div>
        )}
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <div className="sm:hidden">
            <div className="track-scroll">
              <span
                className="text-base font-bold whitespace-nowrap inline-block"
                aria-label="Tytuł utworu"
              >
                {currentSong?.title || "Brak tytułu"}
              </span>
              {currentSong?.title && (
                <span
                  className="text-base font-bold whitespace-nowrap inline-block pl-8"
                  aria-hidden="true"
                >
                  {currentSong.title}
                </span>
              )}
            </div>
          </div>

          <div className="hidden sm:block">
            <span
              className="text-base font-bold truncate block"
              aria-label="Tytuł utworu"
            >
              {currentSong?.title || "Brak tytułu"}
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-500 truncate" aria-label="Wykonawca">
          {currentSong?.artist || "Nieznany wykonawca"}
        </span>
      </div>
    </div>
  );
};
