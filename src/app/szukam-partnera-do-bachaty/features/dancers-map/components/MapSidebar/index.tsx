"use client";

import { useDancerMarkers } from "../../hooks/useDancerMarkers";
import { useMapFilters } from "../../hooks/useMapFilters";
import { LoadingSpinner } from "../LoadingSpinner";
import { DancersGrid } from "./DancersGrid";
import { LoadMoreButton } from "./LoadMoreButton";
import { useState } from "react";
import { DancerMarker } from "@/types/user";

const ITEMS_PER_PAGE = 12;

interface DancerWithLocation {
  id: string;
  name: string;
  image?: string;
  gender?: string;
  level?: string;
  dancePreferences?: {
    styles: string[];
  };
  city: string;
  styles: DancerMarker["styles"];
}

export function MapSidebar() {
  const { filters } = useMapFilters();
  const { markers, isLoading } = useDancerMarkers(filters);
  const [page, setPage] = useState(1);

  const allDancers: DancerWithLocation[] = markers.flatMap((marker) =>
    marker.dancers.map((dancer) => ({
      ...dancer,
      city: marker.city,
      styles: marker.styles,
      level: "początkujący",
      gender: "unspecified",
      dancePreferences: {
        styles: marker.styles.map((s) => s.name),
      },
    }))
  );

  const paginatedDancers = allDancers.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedDancers.length < allDancers.length;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 h-[820px]"
      aria-label="Panel boczny z tancerzami"
    >
      <DancersGrid dancers={paginatedDancers} />
      {hasMore && (
        <LoadMoreButton onClick={() => setPage((prev) => prev + 1)} />
      )}
    </div>
  );
}
