"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedDanceStyle: string;
  setSelectedDanceStyle: (style: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDanceStyle, setSelectedDanceStyle] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleLocationChange = (location: string) => {
    console.log("FilterContext - handleLocationChange:", {
      input: location,
      formattedLocation:
        location === "all"
          ? ""
          : location.charAt(0).toUpperCase() + location.slice(1),
    });

    const formattedLocation =
      location === "all"
        ? ""
        : location.charAt(0).toUpperCase() + location.slice(1);

    setSelectedLocation(formattedLocation);
  };

  return (
    <FilterContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation: handleLocationChange,
        selectedDanceStyle,
        setSelectedDanceStyle,
        selectedLevel,
        setSelectedLevel,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
