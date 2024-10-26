import { Song, SortOption, SortOrder } from "../types";
import { useMemo } from "react";

export const getSortValue = (
  song: Song,
  sortBy: SortOption
): string | number | boolean => {
  switch (sortBy) {
    case "date":
      return new Date(song.createdAt).getTime();
    case "title":
    case "artist":
      return (song[sortBy as keyof Song] as string).trim().toLowerCase();
    case "impro":
    case "beginnerFriendly":
      return song[sortBy as keyof Song] as boolean;
    default:
      return song.title.trim().toLowerCase();
  }
};

