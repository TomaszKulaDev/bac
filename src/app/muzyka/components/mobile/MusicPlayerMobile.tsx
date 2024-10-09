import React from "react";
import { MusicPlayerProps } from "../../types";
import SongList from "../SongList";
import YouTube from "react-youtube";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const MusicPlayerMobile: React.FC<MusicPlayerProps> = ({
  songs,
  onAddToPlaylist,
  expandedPlaylist,
  setExpandedPlaylist,
  filterText,
  setFilterText,
  onCreatePlaylist,
}) => {
  const currentSong = useSelector(
    (state: RootState) => state.songs.songs[state.songs.currentSongIndex]
  );

  const handleAddToPlaylist = (songId: string) => {
    if (expandedPlaylist) {
      onAddToPlaylist(expandedPlaylist, songId);
    }
  };

  return (
    <div className="music-player-mobile">
      <div className="youtube-player mb-4">
        {currentSong && (
          <YouTube
            videoId={currentSong.youtubeId}
            opts={{
              width: "100%",
              height: "200px",
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        )}
      </div>
      <SongList
        songs={songs}
        visibleSongs={songs.length}
        isPlaying={false}
        onSongSelect={() => {}}
        onLoadMore={() => {}}
        onCollapse={() => {}}
        isPopularList={false}
        expandedPlaylist={expandedPlaylist}
        setExpandedPlaylist={setExpandedPlaylist}
        onAddToPlaylist={handleAddToPlaylist}
        sortBy="date"
        sortOrder="desc"
        onSortChange={() => {}}
        currentSong={currentSong}
        isPlaylistExpanded={!!expandedPlaylist}
        filterText={filterText}
        setFilterText={setFilterText}
        showSearch={true}
      />
    </div>
  );
};

export default MusicPlayerMobile;
