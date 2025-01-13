import { useState, useEffect } from "react";
import { DancerMarker, MapFilters } from "../types";

// Przykładowe dane - docelowo będą pobierane z API
const MOCK_MARKERS: DancerMarker[] = [
  {
    id: "1",
    city: "Warszawa",
    coordinates: {
      lat: 52.2297,
      lng: 21.0122,
    },
    stats: {
      totalDancers: 150,
      activeDancers: 85,
    },
    styles: [
      { name: "Bachata Sensual", count: 45 },
      { name: "Bachata Dominicana", count: 40 },
    ],
  },
  {
    id: "2",
    city: "Kraków",
    coordinates: {
      lat: 50.0647,
      lng: 19.945,
    },
    stats: {
      totalDancers: 120,
      activeDancers: 70,
    },
    styles: [
      { name: "Bachata Sensual", count: 40 },
      { name: "Bachata Impro", count: 30 },
    ],
  },
  {
    id: "3",
    city: "Wrocław",
    coordinates: {
      lat: 51.1079,
      lng: 17.0385,
    },
    stats: {
      totalDancers: 90,
      activeDancers: 55,
    },
    styles: [
      { name: "Bachata Dominicana", count: 35 },
      { name: "Bachata Impro", count: 20 },
    ],
  },
  {
    id: "4",
    city: "Poznań",
    coordinates: {
      lat: 52.4064,
      lng: 16.9252,
    },
    stats: {
      totalDancers: 80,
      activeDancers: 45,
    },
    styles: [
      { name: "Bachata Sensual", count: 25 },
      { name: "Bachata Dominicana", count: 20 },
    ],
  },
  {
    id: "5",
    city: "Gdańsk",
    coordinates: {
      lat: 54.352,
      lng: 18.6466,
    },
    stats: {
      totalDancers: 70,
      activeDancers: 40,
    },
    styles: [
      { name: "Bachata Impro", count: 25 },
      { name: "Bachata Sensual", count: 15 },
    ],
  },
];

export function useDancerMarkers(filters: MapFilters) {
  const [markers, setMarkers] = useState<DancerMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filteredMarkers = MOCK_MARKERS.filter((marker) => {
      // Filtrowanie po stylu tańca
      if (
        filters.danceStyle &&
        !marker.styles.some((s) => s.name === filters.danceStyle)
      ) {
        return false;
      }

      // Filtrowanie po statusie
      if (
        filters.availability === "active" &&
        marker.stats.activeDancers === 0
      ) {
        return false;
      }

      return true;
    });

    setMarkers(filteredMarkers);
    setIsLoading(false);
  }, [filters]);

  return { markers, isLoading };
}
