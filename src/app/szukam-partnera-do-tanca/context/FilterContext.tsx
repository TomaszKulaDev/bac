"use client";

import { Gender } from "@/types/user";
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
  selectedGender: Gender | "";
  setSelectedGender: (gender: Gender | "") => void;
  sortOrder: "newest" | "oldest";
  setSortOrder: (order: "newest" | "oldest") => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDanceStyle, setSelectedDanceStyle] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGender, setSelectedGender] = useState<Gender | "">("");
  const [filteredCount, setFilteredCount] = useState(0);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleLocationChange = (location: string) => {
    const formattedLocation =
      location === "all"
        ? ""
        : location.charAt(0).toUpperCase() + location.slice(1);

    setSelectedLocation(formattedLocation);
  };

  const handleGenderChange = (gender: Gender | "") => {
    setSelectedGender(gender);
  };

  const handleDanceStyleChange = (style: string) => {
    setSelectedDanceStyle(style === "all" ? "" : style);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
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
        sortOrder,
        setSortOrder,
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
