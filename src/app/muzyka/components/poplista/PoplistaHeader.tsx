import {
  FaChartLine,
  FaPlay,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongIndex } from "@/store/slices/features/songsSlice";
import { setCurrentPlaylistId } from "@/store/slices/features/playlistSlice";
import { togglePlayback } from "@/store/slices/playerSlice";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { ShareButton } from "@/app/muzyka/components/ui/ShareButton";

interface PoplistaHeaderProps {
  onShare: () => void;
}

export const PoplistaHeader = ({ onShare }: PoplistaHeaderProps) => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.poplista.songs);

  // Obliczamy sumę wszystkich głosów
  const totalVotes = songs.reduce(
    (sum, song) => sum + (song.likesCount || 0),
    0
  );

  // Formatujemy liczbę głosów
  const formattedVotes = new Intl.NumberFormat("pl-PL").format(totalVotes);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      dispatch(setCurrentPlaylistId("poplista"));
      dispatch(setCurrentSongIndex(0));
      dispatch(togglePlayback(true));
    }
  };

  const socialLinks = [
    {
      icon: FaFacebook,
      color: "#1877F2",
      label: "Facebook",
      url: "https://www.facebook.com/Baciata",
    },
    {
      icon: FaInstagram,
      color: "#E1306C",
      label: "Instagram",
      url: "https://www.instagram.com/baciata_pl",
    },
    {
      icon: FaTiktok,
      color: "#000000",
      label: "TikTok",
      url: "https://www.threads.net/@baciata_pl",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 sm:mb-8"
    >
      {/* Główny kontener */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        {/* Lewa strona */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayAll}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all shadow-lg group"
          >
            <FaPlay className="text-white text-lg sm:text-xl ml-1 group-hover:scale-110 transition-transform" />
          </motion.button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Bachata Top lista 2025
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Top 20 • Najpopularniejsze utwory
            </p>
          </div>
        </div>

        {/* Prawa strona */}
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          {/* Licznik głosów */}
          <div
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r 
            from-amber-50 to-amber-100 rounded-full border border-amber-200 
            shadow-sm"
          >
            <FaChartLine className="text-amber-600" />
            <span className="text-amber-700 font-medium">
              {formattedVotes} {totalVotes === 1 ? "głos" : "głosów"}
            </span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, color, label, url }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                  transition-transform duration-200 shadow-md"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="text-white text-lg" />
                </div>
                <span
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                  text-xs text-gray-600 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200"
                >
                  {label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Share Button */}
          <ShareButton onClick={onShare} />
        </div>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 text-sm sm:text-base">
        <p className="text-gray-600">
          Wybieraj Bachatowe hity, które rozkręcą każdą imprezę! Twój głos ma
          moc!
        </p>
      </div>
    </motion.div>
  );
};
