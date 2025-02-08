import { memo } from "react";
import { FaBookmark } from "react-icons/fa";
import { Song, Playlist } from "../../../types";

interface SongTagsProps {
  song: Song;
  isInPlaylist: boolean;
  playlists: Playlist[];
}

interface TagProps {
  children: React.ReactNode;
  className: string;
}

const Tag = memo<TagProps>(({ children, className }) => (
  <span className={`px-2 py-0.5 text-xs rounded-full ${className}`}>
    {children}
  </span>
));

Tag.displayName = "Tag";

export const SongTags = memo(
  ({ song, isInPlaylist, playlists }: SongTagsProps) => (
    <div className="flex flex-wrap gap-1 mt-1">
      {playlists?.map(
        (playlist) =>
          playlist.songs.includes(song.id) && (
            <Tag
              key={playlist.id}
              className="bg-blue-50 text-amber-600 flex items-center gap-1 border border-amber-100"
            >
              <FaBookmark className="text-xs" />
              {playlist.name}
            </Tag>
          )
      )}
    </div>
  )
);

SongTags.displayName = "SongTags";
