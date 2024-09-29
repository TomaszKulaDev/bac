// src/app/muzyka/page.tsx
"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import { fetchSongs, setCurrentSongIndex } from "@/store/slices/features/songsSlice";
import { Song } from "./types";
import { RootState } from "@/store/store";
import { useState } from "react";
import BaciataRisingBanner from "./components/BaciataRisingBanner";
import SongList from "./components/SongList";
import RecentlyPlayedList from "./components/RecentlyPlayedList";
import SimilarSongs from "./components/SimilarSongs";
import CreatePlaylist from "./components/CreatePlaylist";
import PlaybackStatistics from "./components/PlaybackStatistics";

const MusicPage: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, status, error, currentSongIndex } = useSelector(
    (state: RootState) => state.songs
  );

  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSongs() as any);
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Ładowanie...</div>;
  }
  if (status === "failed") {
    return <div className="text-red-500 text-center">Błąd: {error}</div>;
  }

  return (
    <div className="music-page bg-gray-100 min-h-screen flex flex-col">
      <BaciataRisingBanner />
      <div className="flex-grow flex flex-col lg:flex-row px-4 gap-6">
        <div className="lg:w-1/4 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ostatnio odtworzone</h2>
            <RecentlyPlayedList songs={recentlyPlayedSongs} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Popularne utwory</h2>
            <SongList 
              songs={songs.slice(0, 5)} // Wyświetlamy tylko 5 najpopularniejszych utworów
              visibleSongs={5}
              currentSongIndex={currentSongIndex}
              isPlaying={false}
              onSongSelect={(index) => dispatch(setCurrentSongIndex(index))}
              onLoadMore={() => {}}
              onCollapse={() => {}}
              isPopularList={true}
            />
          </div>
        </div>
        <div className="lg:w-2/4 space-y-6">
          {songs.length > 0 ? (
            <>
              <MusicPlayer songs={songs} />
              <SimilarSongs currentSong={songs[currentSongIndex]} />
            </>
          ) : (
            <p className="text-center text-gray-500 mt-8">Ładowanie piosenek...</p>
          )}
        </div>
        <div className="lg:w-1/4 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lista utworów</h2>
            <SongList 
              songs={songs}
              visibleSongs={songs.length}
              currentSongIndex={currentSongIndex}
              isPlaying={false}
              onSongSelect={(index) => dispatch(setCurrentSongIndex(index))}
              onLoadMore={() => {}}
              onCollapse={() => {}}
              isPopularList={false}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Twoje playlisty</h2>
            <CreatePlaylist songs={songs} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Statystyki odtwarzania</h2>
        <PlaybackStatistics />
      </div>
    </div>
  );
};

export default MusicPage;