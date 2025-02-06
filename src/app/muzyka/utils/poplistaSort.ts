import { PoplistaSong, FilterType } from "@/app/muzyka/types";

export const filterAndSortSongs = (
  songs: PoplistaSong[],
  filter: FilterType
): PoplistaSong[] => {
  // Filtrujemy według wybranego filtru
  return songs.filter((song: PoplistaSong) => {
    switch (filter) {
      case "new":
        return song.position === song.previousPosition;
      case "rising":
        return song.position < song.previousPosition;
      case "falling":
        return song.position > song.previousPosition;
      case "all":
      default:
        return true;
    }
  });
  // Nie sortujemy tutaj - pozycje są już prawidłowe
};
