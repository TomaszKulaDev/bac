import { PoplistaSong, FilterType } from "@/app/muzyka/types";

export const filterAndSortSongs = (
  songs: PoplistaSong[],
  filter: FilterType
) => {
  return songs
    .filter((song: PoplistaSong) => {
      switch (filter) {
        case "new":
          return (
            !song.previousPosition || song.position < song.previousPosition
          );
        case "rising":
          return song.previousPosition && song.position < song.previousPosition;
        case "falling":
          return song.previousPosition && song.position > song.previousPosition;
        case "all":
        default:
          return true;
      }
    })
    .sort((a: PoplistaSong, b: PoplistaSong) => {
      // Sortowanie po liczbie głosów (up - down)
      const scoreA = a.votes.up - a.votes.down;
      const scoreB = b.votes.up - b.votes.down;
      return scoreB - scoreA;
    });
};
