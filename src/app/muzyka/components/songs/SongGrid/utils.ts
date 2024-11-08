import { Song, SongLevel } from "../../../types";

export const getSongLevel = (song: Song): SongLevel | undefined => {
  if (song.impro) return "impro";
  if (song.beginnerFriendly) return "beginner";
  return undefined;
};
