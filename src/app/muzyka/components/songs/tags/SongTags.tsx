import { memo, useMemo } from "react";
import { FaBookmark } from "react-icons/fa";
import { Song, Playlist } from "../../../types";

interface SongTagsProps {
  song: Song;
  playlists: Playlist[];
}

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag = memo<TagProps>(({ children, className = "" }) => (
  <span className={`px-2 py-0.5 text-xs rounded-full ${className}`}>
    {children}
  </span>
));

Tag.displayName = "Tag";

export const SongTags = memo(({ song, playlists }: SongTagsProps) => {
  // Memoizacja listy playlist dla danej piosenki
  const songPlaylists = useMemo(() => {
    if (!playlists || !song) return [];
    return playlists.filter((playlist) => playlist.songs.includes(song.id));
  }, [playlists, song]);

  // Jeśli nie ma playlist, nie renderuj nic
  if (songPlaylists.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1" data-testid="song-tags">
      {songPlaylists.map((playlist) => (
        <Tag
          key={playlist.id}
          className="bg-blue-50 text-amber-600 flex items-center gap-1 border border-amber-100"
        >
          <FaBookmark className="text-xs" />
          {playlist.name}
        </Tag>
      ))}
    </div>
  );
});

SongTags.displayName = "SongTags";
