import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SongCard } from "./SongCard";
import { FilterPanel } from "./filters/FilterPanel";
import { useFilters } from "./filters/hooks/useFilters";
import type { SongGridProps } from "./types";
import LoadMoreButton from "../LoadMoreButton";

const SongGrid: React.FC<SongGridProps> = ({ songs, ...props }) => {
  const {
    filters,
    updateFilter,
    clearFilters,
    filteredSongs,
    hasActiveFilters,
  } = useFilters(songs);
  const [visibleSongs, setVisibleSongs] = useState<number>(20);

  const currentSongs = useMemo(
    () => filteredSongs.slice(0, visibleSongs),
    [filteredSongs, visibleSongs]
  );

  const hasMoreSongs = filteredSongs.length > visibleSongs;
  const remainingSongs = filteredSongs.length - visibleSongs;

  const handleLoadMore = useCallback(() => {
    setVisibleSongs((prev) => prev + 20);
  }, []);

  return (
    <div className="w-full bg-white p-0.5 pb-12">
      <div className="flex justify-between items-center mb-1 px-1">
        <h2 className="text-base font-bold text-gray-800">
          Znajdź muzykę dopasowaną do siebie
        </h2>
        {hasActiveFilters && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-500"
          >
            Znaleziono: {filteredSongs.length} utworów
          </motion.span>
        )}
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />

      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-1 px-0.5"
      >
        {currentSongs.map((song) => (
          <motion.div
            key={song.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="w-full"
          >
            <SongCard
              isCurrentSong={false}
              isFavorite={false}
              song={song}
              {...props}
            />
          </motion.div>
        ))}
      </motion.div>

      {hasMoreSongs && (
        <LoadMoreButton
          isVisible={hasMoreSongs}
          onClick={handleLoadMore}
          remainingSongs={remainingSongs}
        />
      )}
    </div>
  );
};

export default SongGrid;
