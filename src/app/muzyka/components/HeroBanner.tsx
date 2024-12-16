import Image from "next/image";
import { FaPlay, FaHeadphones } from "react-icons/fa";

const HeroBanner = () => {
  return (
    <section className="relative w-full bg-[#121212] py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Główny baner - zwiększona wysokość o kolejne 30px */}
        <div className="relative w-full h-[300px] md:h-[540px] rounded-xl overflow-hidden">
          {/* Tło - grafika Spotify */}
          <Image
            src="/images/hero/bachata-beats-banner.webp"
            alt="Bachata Beats"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />

          {/* Nowy element w lewym górnym rogu */}
          <div
            className="absolute top-4 left-4 flex items-center gap-2 
                        bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <FaHeadphones className="text-[#1DB954] text-xl" />
            <span className="text-white font-medium text-sm">Baciata.pl</span>
          </div>

          {/* Gradient overlay dla lepszej czytelności tekstu */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Elementy dekoracyjne - fale dźwiękowe */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 
                       bg-gradient-to-t from-[#121212] to-transparent"
          />
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
                className="bg-[#1DB954] p-3 rounded-full transform 
                                 transition-all duration-300 group-hover:scale-105"
              >
                <FaPlay className="text-black text-sm" />
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
              <span>50 utworów</span>
              <span>•</span>
              <span>2 godz 30 min</span>
              <span>•</span>
              <span>Aktualizacja: dziś</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
