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
import { Listener } from "@/app/muzyka/types/listener";

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

  const activeListeners = useSelector((state: RootState) => {
    const now = Date.now();
    const activeUsers = new Map(); // Mapa użytkownik -> urządzenia
    const playingUsers = new Set();

    console.group("👥 Aktywni słuchacze");

    state.listeners.activeListeners
      .filter((l) => {
        const isActive = now - l.lastActive < 300000;
        console.log("Sprawdzanie słuchacza:", {
          userId: l.userId,
          deviceId: l.deviceId,
          isActive,
          lastActive: new Date(l.lastActive).toISOString(),
          timeSinceLastActive: Math.floor((now - l.lastActive) / 1000) + "s",
        });
        return isActive;
      })
      .forEach((listener) => {
        // Dodaj urządzenie do mapy użytkownika
        if (!activeUsers.has(listener.userId)) {
          activeUsers.set(listener.userId, new Set());
        }
        activeUsers.get(listener.userId).add(listener.deviceId);

        if (listener.isPlaying) {
          playingUsers.add(listener.userId);
        }
      });

    const stats = {
      total: activeUsers.size,
      playing: playingUsers.size,
      devices: Array.from(activeUsers.values()).reduce(
        (acc, devices) => acc + devices.size,
        0
      ),
    };

    console.log("Statystyki:", {
      uniqueUsers: stats.total,
      playingUsers: stats.playing,
      totalDevices: stats.devices,
      activeUsersMap: Object.fromEntries(activeUsers),
      playingUsersSet: Array.from(playingUsers),
    });
    console.groupEnd();

    return stats;
  });

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
    <div className="mb-4 sm:mb-8">
      {/* Główny kontener */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        {/* Lewa strona - Tytuł z przyciskiem play */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handlePlayAll}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all shadow-lg group"
          >
            <FaPlay className="text-white text-lg sm:text-xl ml-1 group-hover:scale-110 transition-transform" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Bachata Top lista 2025
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Top 20 • Najpopularniejsze utwory
            </p>
          </div>
        </div>

        {/* Prawa strona - Statystyki i social media */}
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          {/* Licznik głosów - aktualizowany dynamicznie */}
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 rounded-lg text-sm">
            <FaChartLine className="text-gray-600" />
            <span className="text-gray-700 font-medium">
              {formattedVotes} {totalVotes === 1 ? "głos" : "głosów"}
            </span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity">
              <FaFacebook className="text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90 transition-opacity">
              <FaInstagram className="text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:opacity-90 transition-opacity">
              <FaTiktok className="text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity">
              <FaTwitter className="text-xl" />
            </button>
          </div>

          {/* Przycisk udostępniania */}
          <button className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
            <FaShare className="text-gray-600" />
            <span className="text-gray-700 font-medium hidden sm:inline">
              Udostępnij
            </span>
          </button>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 text-sm sm:text-base">
        <p className="text-gray-600">
          Wybieraj hity, które rozkręcą każdą imprezę! Twój głos ma moc!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Wszystkie utwory</div>
          <div className="text-2xl font-bold">{songs.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Nowe utwory</div>
          <div className="text-2xl font-bold text-amber-500">
            {songs.filter((s) => s.trend === "new").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Suma głosów</div>
          <div className="text-2xl font-bold text-emerald-500">
            {formattedVotes}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Aktywni słuchacze</div>
          <div className="flex flex-col">
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-blue-500">
                {activeListeners.total}
              </div>
              {activeListeners.playing > 0 && (
                <div className="text-sm text-blue-400 mb-1">
                  ({activeListeners.playing} słucha)
                </div>
              )}
            </div>
            <div className="text-xs text-gray-400">
              na {activeListeners.devices}{" "}
              {activeListeners.devices === 1 ? "urządzeniu" : "urządzeniach"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
