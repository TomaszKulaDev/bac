import { memo } from "react";
import { FaBookmark } from "react-icons/fa";
import { Song, Playlist } from "../../types";

interface SongTagsProps {
  song: Song;
  isInPlaylist: boolean;
  playlists: Playlist[];
}

export const SongTags = memo(({ song, isInPlaylist, playlists }: SongTagsProps) => (
  <div className="flex flex-wrap gap-1 mt-1">
    {isInPlaylist && (
      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
        W playliście
      </span>
    )}
    {playlists?.map(playlist => 
      playlist.songs.includes(song.id) && (
        <span 
          key={playlist.id}
          className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full flex items-center gap-1 border border-blue-100"
        >
          <FaBookmark className="text-xs" />
          {playlist.name}
        </span>
      )
    )}
  </div>
));

SongTags.displayName = 'SongTags';