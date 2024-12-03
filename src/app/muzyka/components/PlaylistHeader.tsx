import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  useMemo,
  useRef,
} from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa";
import { Song } from "../types";
import { getYouTubeThumbnail } from "../utils/youtube";
import { Z_INDEX } from "@/app/constants/zIndex";

interface PlaylistSEOMetadata {
  title: string;
  description: string;
  year: number;
}

interface PlaylistHeaderProps {
  filteredSongsCount: number;
  dominantColor: string;
  onPlay: () => void;
  isPlaying: boolean;
  songs: Song[];
  seoMetadata?: PlaylistSEOMetadata;
}

interface HeaderImage {
  position: number;
  imageName: string;
  title?: string;
  size?: "normal" | "wide" | "tall" | "large";
}

const imageAnimationVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    y: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// Stałe rozmiary dla konkretnych pozycji
const FIXED_GRID_SIZES = {
  1: "col-span-6 row-span-4", // duże 2x2
  2: "col-span-6 row-span-2", // szerokie 2x1
  3: "col-span-3 row-span-4", // wysokie 1x2
  4: "col-span-3 row-span-2", // normalne 1x1
  5: "col-span-3 row-span-2", // normalne 1x1
  6: "col-span-3 row-span-2", // normalne 1x1
} as const;

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  filteredSongsCount,
  dominantColor,
  onPlay,
  isPlaying,
  songs,
  seoMetadata = {
    title: "Bachata Music Collection 2025",
    description: "Najlepsza muzyka do tańczenia Bachaty",
    year: new Date().getFullYear(),
  },
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerImages, setHeaderImages] = useState<HeaderImage[]>([]);

  const handleScroll = useCallback(() => {
    if (!headerRef.current) return;
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchHeaderImages = async () => {
      try {
        const response = await fetch("/api/header-images");
        if (!response.ok) throw new Error("Błąd podczas pobierania zdjęć");
        const data = await response.json();
        setHeaderImages(data);
      } catch (error) {
        console.error("Błąd:", error);
      }
    };

    fetchHeaderImages();
  }, []);

  const topFiveSongs = useMemo(() => {
    return [...songs]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [songs]);

  const headerOpacity = Math.max(0, Math.min(1, 1 - scrollPosition / 500));

  return (
    <motion.div
      ref={headerRef}
      className="relative min-h-[500px] w-full overflow-hidden bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f]"
      style={{ opacity: headerOpacity }}
    >
      <div
        className={`relative z-[${Z_INDEX.HEADER}] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}
      >
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
          {/* Lewa strona - tekst */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="text-white space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-blue-300 text-sm font-medium">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                <span>Słuchaj jeszcze więcej z Baciata.pl</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                {seoMetadata.title}
              </h1>
            </div>

            <p className="text-xl text-gray-200 mt-4 leading-relaxed">
              {seoMetadata.description}
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3 text-gray-200 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="font-medium">
                  Ponad {filteredSongsCount} utworów Bachaty
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="font-medium">Regularne aktualizacje</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="font-medium">
                  Muzyka której możesz być pewien
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="font-medium">
                  Znana i lubiana muzyka prosto z imprez i warsztatów
                </span>
              </div>
            </div>
          </motion.div>

          {/* Prawa strona - stała siatka zdjęć */}
          <div className="relative">
            <div className="grid grid-cols-12 auto-rows-[100px] gap-3 p-2">
              {headerImages.map((image) => {
                const gridClass =
                  FIXED_GRID_SIZES[
                    image.position as keyof typeof FIXED_GRID_SIZES
                  ] || "col-span-3 row-span-2";

                return (
                  <div
                    key={image.position}
                    className={`
                      relative rounded-xl overflow-hidden shadow-xl group
                      ${gridClass}
                    `}
                  >
                    <Image
                      src={`/images/header/${image.imageName}`}
                      alt={`Zdjęcie ${image.position}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      priority={image.position <= 3}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ImagePositionSelector = ({
  onSelect,
  currentImages,
}: {
  onSelect: (position: number) => void;
  currentImages: HeaderImage[];
}) => {
  const positions = [0, 1, 2, 3, 4]; // dostępne pozycje

  return (
    <div className="flex gap-4 justify-center mb-8">
      {positions.map((pos) => {
        const isOccupied = currentImages.some((img) => img.position === pos);

        return (
          <button
            key={pos}
            onClick={() => onSelect(pos)}
            className={`
              relative w-12 h-12 rounded-full border-2
              flex items-center justify-center
              transition-all duration-300
              ${
                isOccupied
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-300 hover:border-blue-300"
              }
            `}
          >
            <span className="text-sm font-medium">{pos + 1}</span>
            {isOccupied && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default memo(PlaylistHeader);
