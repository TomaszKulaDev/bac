import React, { useState, useMemo, useRef } from "react";
import { SongCard } from "./SongCard";
import { FilterPanel } from "./filters/FilterPanel";
import { useFilters } from "./filters/hooks/useFilters";
import type { Song } from "../../../types";
import type { SongGridProps } from "./types";
import LoadMoreButton from "../LoadMoreButton";

const SongGrid: React.FC<SongGridProps> = ({
  songs,
  currentSongId,
  isPlaying,
  favorites,
  onSongSelect,
  onAddToPlaylist,
  onToggleFavorite,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const {
    filters,
    updateFilter,
    clearFilters,
    filteredSongs,
    hasActiveFilters,
  } = useFilters(songs);
  const [visibleSongs, setVisibleSongs] = useState<number>(24);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentSongs = useMemo(
    () => filteredSongs.slice(0, visibleSongs),
    [filteredSongs, visibleSongs]
  );

  const hasMoreSongs = filteredSongs.length > visibleSongs;
  const remainingSongs = filteredSongs.length - visibleSongs;

  const handleToggleVisibility = () => {
    if (isExpanded) {
      setVisibleSongs(24);
      setIsExpanded(false);
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setVisibleSongs(filteredSongs.length);
      setIsExpanded(true);
    }
  };

  return (
    <div className="w-full bg-[#121212] min-h-screen px-8 py-6">
      <div ref={gridRef}>
        <FilterPanel
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
          {currentSongs.map((song: Song) => (
            <SongCard
              key={song.id}
              song={song}
              isCurrentSong={song.id === currentSongId}
              isPlaying={isPlaying && song.id === currentSongId}
              isFavorite={favorites.has(song.id)}
              onSongSelect={onSongSelect}
              onAddToPlaylist={onAddToPlaylist}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center pt-8 mb-24">
        <LoadMoreButton
          isVisible={true}
          onClick={handleToggleVisibility}
          remainingSongs={remainingSongs}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};

export default SongGrid;
