import { useState, useEffect, useMemo, useCallback } from "react";
import { DancerMarker, MapFilters, UserProfile } from "@/types/user";
import { DANCE_STYLES, DanceStyleValue } from "@/constants/danceStyles";
import { CITY_COORDINATES } from "@/constants/cityCoordinates";
import { CityValue } from "@/constants/cities";

const isDanceStyleValue = (style: string): style is DanceStyleValue => {
  return DANCE_STYLES.some((danceStyle) => danceStyle.value === style);
};

export function useDancerMarkers(filters: MapFilters) {
  const [markers, setMarkers] = useState<DancerMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const maxDancers = useMemo(
    () => Math.max(...markers.map((m) => m.stats.activeDancers), 0),
    [markers]
  );

  const getCityCoordinates = useCallback(
    (city: string): { lat: number; lng: number } => {
      if (CITY_COORDINATES[city as CityValue]) {
        return {
          lat: CITY_COORDINATES[city as CityValue][0],
          lng: CITY_COORDINATES[city as CityValue][1],
        };
      }
      return {
        lat: CITY_COORDINATES[""][0],
        lng: CITY_COORDINATES[""][1],
      };
    },
    []
  );

  const groupProfilesByCity = useCallback(
    (profiles: UserProfile[]): DancerMarker[] => {
      const cities = new Map<string, DancerMarker>();

      profiles.forEach((profile) => {
        if (!profile.dancePreferences?.location) return;

        const city = profile.dancePreferences.location;
        const coordinates = getCityCoordinates(city);

        let currentCity = cities.get(city);

        if (!currentCity) {
          currentCity = {
            id: city,
            city: city,
            coordinates,
            stats: {
              totalDancers: 0,
              activeDancers: 0,
            },
            styles: [],
            dancers: [],
          };
          cities.set(city, currentCity);
        }

        // Dodajemy tancerza do listy
        currentCity.dancers.push({
          id: profile.id,
          name: profile.name,
          image: profile.image,
        });

        currentCity.stats.totalDancers++;
        currentCity.stats.activeDancers++;

        profile.dancePreferences?.styles.forEach((style) => {
          if (isDanceStyleValue(style)) {
            const existingStyle = currentCity.styles.find(
              (s) => s.name === style
            );
            if (existingStyle) {
              existingStyle.count++;
            } else {
              currentCity.styles.push({ name: style, count: 1 });
            }
          }
        });

        cities.set(city, currentCity);
      });

      return Array.from(cities.values());
    },
    [getCityCoordinates]
  );

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/profiles");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const profiles: UserProfile[] = await response.json();

        const filteredProfiles = profiles.filter((profile) => {
          if (
            filters.danceStyle &&
            !profile.dancePreferences?.styles.includes(filters.danceStyle)
          ) {
            return false;
          }
          return true;
        });

        const markers = groupProfilesByCity(filteredProfiles);
        setMarkers(markers);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setMarkers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [filters, groupProfilesByCity]);

  return { markers, isLoading, maxDancers };
}
