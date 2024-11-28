import { motion } from 'framer-motion';
import { FaCrown, FaHeart, FaPlay, FaPause } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLike } from '../hooks/useLike';
import { RootState } from '@/store/store';
import type { Song } from '@/types/song';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { getYouTubeThumbnail } from '../utils/youtube';
import { useState, useEffect } from 'react';
import { getPredominantColor } from '../utils/colors';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface TopSongsProps {
  onSongSelect?: (songId: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
}

export const TopSongs: React.FC<TopSongsProps> = ({
  onSongSelect,
  currentSongId,
  isPlaying
}) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const { handleLike } = useLike();
  
  const topSongs = useSelector((state: RootState) => 
    [...state.songs.songs]
      .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
      .slice(0, 5)
  );

  const [dominantColor, setDominantColor] = useState('rgb(15, 28, 46)'); // domyślny kolor

  const currentSongDetails = useSelector((state: RootState) => 
    state.songs.songs.find(s => s._id === currentSongId)
  );

  useEffect(() => {
    if (currentSongId && currentSongDetails) {
      const thumbnail = getYouTubeThumbnail(currentSongDetails.youtubeId);
      getPredominantColor(thumbnail).then(color => {
        setDominantColor(color);
      });
    }
  }, [currentSongId, currentSongDetails]);

    function showErrorToast(arg0: string) {
        throw new Error('Function not implemented.');
    }

  return (
    <section 
      className="container mx-auto px-4 relative z-10"
      aria-label="Najpopularniejsze utwory"
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Lewa kolumna */}
        <article 
          role="region"
          aria-label="Top 5 najpopularniejszych"
          className="w-full lg:w-1/2"
        >
          <header className="flex items-center gap-3 mb-6">
            <FaCrown className="text-2xl text-amber-400" aria-hidden="true" />
            <h1 className="text-xl font-bold text-white">
              Top 5 Najpopularniejszych
            </h1>
          </header>

          <ol className="grid gap-3">
            {topSongs.map((song, index) => (
              <li key={song._id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center gap-4 transition-all group rounded-xl
                    ${index === 0 
                      ? 'p-4 mb-6 bg-gradient-to-r from-amber-500/20 to-transparent' 
                      : 'p-3 ' + (currentSongId === song._id 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-black/20 hover:bg-white/10 backdrop-blur-sm')
                      }
                  `}
                >
                  {/* Numeracja */}
                  <div className={`
                    flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                    ${index === 0 ? 'bg-amber-500 text-black font-bold' : 'text-white/60'}
                  `}>
                    {index + 1}
                  </div>

                  {/* Miniatura */}
                  <div className={`
                    relative overflow-hidden rounded-lg
                    ${index === 0 ? 'w-20 h-20' : 'w-12 h-12'}
                  `}>
                    <Image
                      src={getYouTubeThumbnail(song.youtubeId)}
                      alt={`Okładka utworu ${song.title} - ${song.artist}`}
                      width={index === 0 ? 80 : 48}
                      height={index === 0 ? 80 : 48}
                      className="object-cover"
                      loading={index < 2 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  </div>

                  {/* Informacje o utworze */}
                  <div className="flex-grow min-w-0">
                    <h3 className={`
                      font-medium truncate
                      ${index === 0 ? 'text-xl text-amber-500' : 'text-base text-white'}
                    `}>
                      {song.title}
                    </h3>
                    <p className={`
                      truncate
                      ${index === 0 ? 'text-base text-amber-500/70' : 'text-sm text-white/70'}
                    `}>
                      {song.artist}
                    </p>
                    
                    {/* Dodatkowe informacje dla #1 */}
                    {index === 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="sr-only">Status utworu:</span>
                        <FaCrown className="w-4 h-4 text-amber-500/60" aria-hidden="true" />
                        <strong className="text-amber-500/60 text-sm">
                          Najpopularniejszy utwór tygodnia
                        </strong>
                        <span aria-hidden="true">•</span>
                        <span className="text-amber-500/60 text-sm">
                          Liczba polubień: {song.likesCount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Przyciski akcji */}
                  <div className="flex items-center gap-2">
                    {onSongSelect && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSongSelect(song._id)}
                        className={`
                          p-2 transition-colors rounded-full
                          ${index === 0 
                            ? 'text-amber-500 hover:bg-amber-500/20' 
                            : 'text-indigo-200 hover:text-white hover:bg-white/10'}
                        `}
                      >
                        {currentSongId === song._id && isPlaying ? (
                          <FaPause className={`${index === 0 ? 'w-5 h-5' : 'w-4 h-4'}`} />
                        ) : (
                          <FaPlay className={`${index === 0 ? 'w-5 h-5' : 'w-4 h-4'}`} />
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </article>

        {/* Prawa kolumna */}
        <aside 
          className="hidden lg:block lg:w-1/2 lg:sticky lg:top-4"
          aria-label="Szczegóły aktualnie odtwarzanego utworu"
        >
          <div className="sticky top-4">
            {currentSongId ? (
              <div 
                className="relative overflow-hidden rounded-2xl backdrop-blur-sm"
                style={{
                  backgroundColor: `${dominantColor}95`,
                  boxShadow: `0 0 100px -20px ${dominantColor}`
                }}
              >
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(to bottom right, ${dominantColor}, transparent)`
                  }}
                />
                
                {/* Ambient light effect */}
                <div 
                  className="absolute -inset-[100px] blur-3xl opacity-20"
                  style={{
                    background: `radial-gradient(circle at center, ${dominantColor}20, transparent 70%)`
                  }}
                />

                <div className="relative z-10 p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Aktualnie odtwarzane:</h2>
                    {currentSongDetails && (
                      <>
                        <div className="aspect-video rounded-xl overflow-hidden bg-black/50">
                          <Image
                            src={getYouTubeThumbnail(currentSongDetails.youtubeId)}
                            alt="Miniatura"
                            width={640}
                            height={360}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="text-white">
                          <h3 className="font-semibold text-lg">
                            {currentSongDetails.title}
                          </h3>
                          <p className="text-slate-300">
                            {currentSongDetails.artist}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[400px] rounded-2xl bg-[#0f1c2e]/95 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <p>Wybierz utwór z listy aby rozpocząć odtwarzanie</p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
      <meta name="robots" content="index, follow" />
      <link 
        rel="canonical" 
        href="https://baciata.pl/muzyka/top-utwory" 
      />
    </section>
  );
};
