import { PoplistaSong, FilterType } from "@/app/muzyka/types";

export const filterAndSortSongs = (
  songs: PoplistaSong[],
  filter: FilterType
): PoplistaSong[] => {
  const filteredSongs = songs.filter((song) => {
    switch (filter) {
      case "new":
        return song.trend === "new";
      case "all":
      default:
        return true;
    }
  });

  return filteredSongs;
};
