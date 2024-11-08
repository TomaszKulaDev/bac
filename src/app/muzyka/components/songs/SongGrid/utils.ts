import { Song, SongLevel } from "../../../types";

export const getSongLevel = (song: Song): SongLevel => {
  if (song.beginnerFriendly) return "beginner";
  if (song.impro) return "advanced";
  return "intermediate";
};
