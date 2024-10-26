import { Song, SortBy, SortOrder } from "../types";
import { useMemo } from "react";

export const getSortValue = (
  song: Song,
  sortBy: SortBy
): string | number | boolean => {
  switch (sortBy) {
    case "date":
      return new Date(song.createdAt).getTime();
    case "title":
    case "artist":
      return song[sortBy].trim().toLowerCase();
    case "impro":
    case "beginnerFriendly":
      return song[sortBy];
    default:
      return song.title.trim().toLowerCase();
  }
};

