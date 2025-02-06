import { PoplistaSong, FilterType } from "@/app/muzyka/types";

export const filterAndSortSongs = (
  songs: PoplistaSong[],
  filter: FilterType
): PoplistaSong[] => {
  const filteredSongs = songs.filter((song) => {
    switch (filter) {
      case "rising":
        return song.trend === "up" && song.positionChange > 0;
      case "falling":
        return song.trend === "down" && song.positionChange > 0;
      case "new":
        return song.trend === "new";
      case "all":
      default:
        return true;
    }
  });

  // Sortuj po wielkości zmiany dla wzrostów i spadków
  if (filter === "rising" || filter === "falling") {
    return filteredSongs.sort((a, b) => b.positionChange - a.positionChange);
  }

  return filteredSongs;
};
