"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface FilterContextType {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedDanceStyle: string;
  setSelectedDanceStyle: (style: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  filteredCount: number;
  setFilteredCount: (count: number) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDanceStyle, setSelectedDanceStyle] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [filteredCount, setFilteredCount] = useState(0);

  const handleLocationChange = (location: string) => {
    const formattedLocation =
      location === "all"
        ? ""
        : location.charAt(0).toUpperCase() + location.slice(1);

    setSelectedLocation(formattedLocation);
  };

  const handleGenderChange = (gender: string) => {
    console.log("Setting gender:", gender);
    setSelectedGender(gender === "all" ? "" : gender);
  };

  const handleDanceStyleChange = (style: string) => {
    setSelectedDanceStyle(style === "all" ? "" : style);
  };

  const handleLevelChange = (level: string) => {
    console.log("Setting level:", level);
    setSelectedLevel(level === "all" ? "" : level);
  };

  useEffect(() => {
    const cleanupState = () => {
      setSelectedLocation("");
      setSelectedDanceStyle("");
      setSelectedLevel("");
      setSelectedGender("");
      setFilteredCount(0);
    };

    return () => cleanupState();
  }, []);

  return (
    <FilterContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation: handleLocationChange,
        selectedDanceStyle,
        setSelectedDanceStyle: handleDanceStyleChange,
        selectedLevel,
        setSelectedLevel: handleLevelChange,
        selectedGender,
        setSelectedGender: handleGenderChange,
        filteredCount,
        setFilteredCount,
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
