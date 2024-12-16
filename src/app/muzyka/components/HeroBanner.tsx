"use client";

import Image from "next/image";
import { FaPlay, FaHeadphones } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMemo } from "react";

const HeroBanner = () => {
  // Pobieramy wszystkie utwory ze store
  const songs = useSelector((state: RootState) => state.songs.songs);

  // Obliczamy łączny czas trwania wszystkich utworów
  // Zakładamy średni czas 3:05 (3.083 minuty) na utwór
  const totalDuration = useMemo(() => {
    const AVERAGE_SONG_DURATION = 3.083; // 3 minuty i 5 sekund
    const totalMinutes = songs.length * AVERAGE_SONG_DURATION;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours} godz ${minutes} min`;
  }, [songs]);

  // Formatujemy datę ostatniej aktualizacji
  const lastUpdate = useMemo(() => {
    const lastSong = [...songs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

    if (!lastSong) return "dziś";

    const updateDate = new Date(lastSong.createdAt);
    const today = new Date();
    const diffDays = Math.floor(
      (today.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "dziś";
    if (diffDays === 1) return "wczoraj";
    if (diffDays < 7) return `${diffDays} dni temu`;
    return updateDate.toLocaleDateString("pl-PL");
  }, [songs]);

  return (
    <section className="relative w-full bg-[#121212] py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Główny baner */}
        <div className="relative w-full h-[370px] md:h-[540px] rounded-xl overflow-hidden">
          <Image
            src="/images/hero/bachata-beats-banner.webp"
            alt="Bachata Beats"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />

          <div
            className="absolute top-4 left-4 flex items-center gap-2 
                        bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <FaHeadphones className="text-[#1DB954] text-xl" />
            <span className="text-white font-medium text-sm">Baciata.pl</span>
          </div>
        </div>

        {/* Treść pod banerem */}
        <div className="mt-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bachata Beats</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Odkryj najlepsze rytmy bachaty - od klasycznych hitów po współczesne
            brzmienia
          </p>

          {/* Wariant z wizualizacją i informacją o liczbie utworów */}
          <div className="mt-6 space-y-4">
            <div
              className="bg-black/30 backdrop-blur-sm rounded-full p-2 
                            flex items-center gap-3 max-w-md hover:bg-black/40 
                            transition-all duration-300 group cursor-pointer"
            >
              <button
                className="bg-[#1DB954] p-3 rounded-full relative
                           transform transition-all duration-300 group-hover:scale-105"
              >
                <FaPlay className="text-black text-sm relative z-10" />
                <div className="absolute inset-0 rounded-full animate-sonar" />
                <div className="absolute inset-0 rounded-full animate-sonar" 
                     style={{ animationDelay: '0.3s' }} />
              </button>
              <div className="flex-1 flex items-center gap-1">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-1 bg-[#1DB954]/30 rounded-full 
                                  animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-white font-medium px-4">Odtwórz mix</span>
            </div>

            {/* Informacja o liczbie utworów */}
            <div className="flex items-center gap-2 text-gray-400 text-sm pl-4">
              <span>{songs.length} utworów</span>
              <span>•</span>
              <span>{totalDuration}</span>
              <span>•</span>
              <span>Aktualizacja: {lastUpdate}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
