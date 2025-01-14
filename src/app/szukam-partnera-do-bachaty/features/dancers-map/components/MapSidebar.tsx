"use client";

import { useDancerMarkers } from "../hooks/useDancerMarkers";
import { useMapFilters } from "../hooks/useMapFilters";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export function MapSidebar() {
  const { filters } = useMapFilters();
  const { markers, isLoading } = useDancerMarkers(filters);

  const allDancers = markers.flatMap((marker) =>
    Array(marker.stats.activeDancers).fill({
      city: marker.city,
      styles: marker.styles,
    })
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-[820px]">
      {/* Grid z okrągłymi zdjęciami */}
      <div className="overflow-y-auto h-[680px] pr-2">
        <div className="grid grid-cols-3 gap-6 auto-rows-max place-items-center pt-2">
          {allDancers.map((dancer, index) => (
            <div key={index} className="group">
              {/* Kontener zdjęcia */}
              <div className="relative">
                {/* Okrągłe zdjęcie ze stylem Instagram */}
                <div
                  className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-amber-300 
                              hover:from-amber-600 hover:to-amber-400 transition-all duration-300 
                              cursor-pointer transform hover:scale-105"
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src="/images/bachata-romance.jpg"
                      alt="Para tańcząca bachatę"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Ikona serca */}
                <button
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md 
                           flex items-center justify-center group-hover:scale-110 
                           transition-transform duration-200 hover:bg-rose-50"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <HeartIcon className="w-5 h-5 text-rose-500 hover:fill-rose-500 transition-colors" />
                </button>

                {/* Badge z miastem */}
                <div
                  className="absolute -top-1 -right-1 px-2 py-0.5 bg-amber-500 text-white 
                             text-xs rounded-full shadow-sm"
                >
                  {dancer.city}
                </div>
              </div>

              {/* Nazwa pod zdjęciem */}
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-gray-800">Jan K.</p>
                <p className="text-xs text-gray-500">
                  {dancer.styles[0]?.name || "Bachata"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Przycisk "Załaduj więcej" */}
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 
                         transition-colors duration-200 text-sm font-medium"
        >
          Pokaż więcej
        </button>
      </div>
    </div>
  );
}
