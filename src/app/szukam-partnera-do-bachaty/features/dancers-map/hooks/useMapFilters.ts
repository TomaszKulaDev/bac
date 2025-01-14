import { useState, useCallback } from "react";
import { MapFilters } from "../types";

const DEFAULT_FILTERS: MapFilters = {
  danceStyle: "",
  level: "",
  gender: "",
};

export function useMapFilters() {
  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS);

  const updateFilters = useCallback((newFilters: Partial<MapFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
}
