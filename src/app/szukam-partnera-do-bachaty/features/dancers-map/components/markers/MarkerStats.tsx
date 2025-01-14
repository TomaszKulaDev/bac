import { useMemo } from "react";
import { DancerMarker } from "../../types";

interface MarkerStatsProps {
  markers: DancerMarker[];
}

export function MarkerStats({ markers }: MarkerStatsProps) {
  const stats = useMemo(
    () => ({
      totalDancers: markers.reduce((sum, m) => sum + m.stats.activeDancers, 0),
      totalCities: markers.length,
      mostPopularCity:
        markers.length > 0
          ? markers.reduce((prev, curr) =>
              prev.stats.activeDancers > curr.stats.activeDancers ? prev : curr
            ).city
          : "Brak danych",
    }),
    [markers]
  );

  return (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-40">
      <div className="flex gap-4 text-sm">
        <div>
          <span className="text-gray-600">Tancerzy:</span>
          <span className="font-semibold ml-1">{stats.totalDancers}</span>
        </div>
        <div>
          <span className="text-gray-600">Miast:</span>
          <span className="font-semibold ml-1">{stats.totalCities}</span>
        </div>
        {markers.length > 0 && (
          <div>
            <span className="text-gray-600">Najpopularniejsze:</span>
            <span className="font-semibold ml-1">{stats.mostPopularCity}</span>
          </div>
        )}
      </div>
    </div>
  );
}
