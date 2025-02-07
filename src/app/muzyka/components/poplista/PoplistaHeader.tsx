import {
  FaChartLine,
  FaPlay,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaShare,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongIndex } from "@/store/slices/features/songsSlice";
import { setCurrentPlaylistId } from "@/store/slices/features/playlistSlice";
import { togglePlayback } from "@/store/slices/playerSlice";
import { RootState } from "@/store/store";
import { store } from "@/store/store";
import { motion } from "framer-motion";

export const PoplistaHeader = () => {
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
    console.group("▶️ PoplistaHeader - handlePlayAll");
    console.log("Stan przed odtworzeniem:", {
      songsCount: songs.length,
      firstSong: songs[0]
        ? {
            id: songs[0]._id,
            title: songs[0].title,
            position: songs[0].position,
          }
        : null,
    });

    if (songs.length > 0) {
      dispatch(setCurrentPlaylistId("poplista"));
      dispatch(setCurrentSongIndex(0));
      dispatch(togglePlayback(true));

      setTimeout(() => {
        const state = store.getState();
        console.log("Stan po odtworzeniu:", {
          playlistId: state.playlists.currentPlaylistId,
          songIndex: state.songs.currentSongIndex,
          currentSong: state.songs.songs[state.songs.currentSongIndex],
        });
      }, 100);
    }
    console.groupEnd();
  };

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
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 rounded-lg text-sm">
            <FaChartLine className="text-gray-600" />
            <span className="text-gray-700 font-medium">
              {formattedVotes} {totalVotes === 1 ? "głos" : "głosów"}
            </span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-2 sm:gap-4">
            {[
              { icon: FaFacebook, color: "#1877F2" },
              { icon: FaInstagram, color: "#E1306C" },
              { icon: FaTiktok, color: "#000000" },
              { icon: FaTwitter, color: "#1DA1F2" },
            ].map(({ icon: Icon, color }, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: color }}
              >
                <Icon className="text-white text-xl" />
              </motion.button>
            ))}
          </div>

          {/* Przycisk udostępniania */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
          >
            <FaShare className="text-gray-600" />
            <span className="text-gray-700 font-medium hidden sm:inline">
              Udostępnij
            </span>
          </motion.button>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 text-sm sm:text-base">
        <p className="text-gray-600">
          Wybieraj hity, które rozkręcą każdą imprezę! Twój głos ma moc!
        </p>
      </div>
    </motion.div>
  );
};
