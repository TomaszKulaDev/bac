import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPoplistaSongs } from "@/store/slices/features/poplistaSlice";
import { PoplistaItem } from "./PoplistaItem";
import { PoplistaItemSkeleton } from "./PoplistaItemSkeleton";
import { Song } from "@/app/muzyka/types";

interface PoplistaSong extends Song {
  position: number;
  previousPosition: number;
  votes: {
    up: number;
    down: number;
  };
}

export const PoplistaList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, status, filter } = useSelector(
    (state: RootState) => state.poplista
  );

  useEffect(() => {
    dispatch(fetchPoplistaSongs());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <PoplistaItemSkeleton key={n} />
        ))}
      </div>
    );
  }

  const filteredSongs = songs.filter((song: PoplistaSong) => {
    switch (filter) {
      case "new":
        return song.position < song.previousPosition;
      case "rising":
        return song.position < song.previousPosition;
      case "falling":
        return song.position > song.previousPosition;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      {filteredSongs.map((song: PoplistaSong) => (
        <PoplistaItem key={song.id} song={song} />
      ))}
    </div>
  );
};
