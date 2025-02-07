import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPoplistaSongs } from "@/store/slices/features/poplistaSlice";
import { PoplistaItem } from "./PoplistaItem";
import { PoplistaItemSkeleton } from "./PoplistaItemSkeleton";
import { FaChevronDown } from "react-icons/fa";
import { filterAndSortSongs } from "@/app/muzyka/utils/poplistaSort";
import { PoplistaSong } from "@/app/muzyka/types";
import { store } from "@/store/store";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 50;

export const PoplistaList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, status, filter } = useSelector(
    (state: RootState) => state.poplista
  );
  const [displayLimit, setDisplayLimit] = useState(20);

  useEffect(() => {
    console.group("📋 PoplistaList - useEffect");
    console.log("Stan listy:", {
      totalSongs: songs.length,
      filter,
      displayLimit,
      status,
    });
    console.groupEnd();
  }, [songs, filter, displayLimit, status]);

  useEffect(() => {
    dispatch(fetchPoplistaSongs());
  }, [dispatch]);

  useEffect(() => {
    const playerSongs = store.getState().songs.songs;
    const poplistaSongs = songs;

    console.log("🔄 Porównanie list:", {
      poplistaCount: poplistaSongs.length,
      playerCount: playerSongs.length,
      sampleSong: poplistaSongs[0]
        ? {
            inPoplista: poplistaSongs[0]._id,
            inPlayer: playerSongs.find(
              (s: any) => s._id === poplistaSongs[0]._id
            )?._id,
          }
        : null,
      areListsSynced: poplistaSongs.every(
        (song, index) => playerSongs[index]?._id === song._id
      ),
    });
  }, [songs]);

  if (status === "loading") {
    return (
      <div className="space-y-4">
        <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
          {/* Główny pasek postępu */}
          <motion.div
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"
            initial={{ x: "-100%" }}
            animate={{
              x: "100%",
              transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
              },
            }}
          />

          {/* Efekt błysku */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{
              x: "200%",
              transition: {
                repeat: Infinity,
                duration: 1.5,
                delay: 0.5,
                ease: "linear",
              },
            }}
          />
        </div>

        {/* Skeleton loaders z animacją fade-in */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.div
              key={n}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <PoplistaItemSkeleton />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  const filteredSongs = filterAndSortSongs(songs, filter);
  console.log("🔍 Szczegóły filtrowania:", {
    wszystkieUtwory: songs.length,
    poFiltrowaniu: filteredSongs.length,
    pierwszeTrzy: filteredSongs.slice(0, 3).map((s) => ({
      id: s._id,
      title: s.title,
      position: s.position,
      isVisible: s.isVisible,
    })),
  });
  const displayedSongs = filteredSongs.slice(0, displayLimit);
  const hasMore = filteredSongs.length > displayLimit;

  const loadMore = () => {
    setDisplayLimit((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, filteredSongs.length)
    );
  };

  return (
    <div>
      <div className="space-y-4">
        {displayedSongs.map((song, index) => (
          <PoplistaItem key={song._id} song={song} index={index} />
        ))}

        {displayedSongs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Brak utworów spełniających kryteria filtrowania
          </div>
        )}

        {hasMore && (
          <button
            onClick={loadMore}
            className="w-full py-4 px-6 bg-gray-50 hover:bg-gray-100 
                       rounded-xl border border-gray-200 text-gray-700
                       flex items-center justify-center gap-2 transition-all
                       group hover:border-gray-300"
          >
            <FaChevronDown className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>
              Pokaż więcej ({filteredSongs.length - displayLimit} pozostało)
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
