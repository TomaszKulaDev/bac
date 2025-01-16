"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProfile } from "@/types/user";
import { useFilters } from "@/app/szukam-partnera-do-bachaty/context/FilterContext";
import { SortingButtons } from "./SortingButtons";
import Modal from "@/components/ui/Modal";
import ProfileCard from "./ProfileCard";

export const LatestProfiles = () => {
  const {
    sortOrder,
    selectedGender,
    selectedLevel,
    selectedDanceStyle,
    selectedLocation,
  } = useFilters();

  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [isStylesModalOpen, setIsStylesModalOpen] = useState(false);

  const filterProfiles = useCallback(
    (data: UserProfile[]) => {
      return data.filter((profile) => {
        if (!profile.isPublicProfile) return false;

        const locationMatch =
          !selectedLocation ||
          profile.dancePreferences?.location === selectedLocation;
        const genderMatch =
          !selectedGender || profile.gender === selectedGender;
        const levelMatch =
          !selectedLevel || profile.dancePreferences?.level === selectedLevel;
        const styleMatch =
          !selectedDanceStyle ||
          profile.dancePreferences?.styles.includes(selectedDanceStyle);

        return locationMatch && genderMatch && levelMatch && styleMatch;
      });
    },
    [selectedLocation, selectedGender, selectedLevel, selectedDanceStyle]
  );

  const sortProfiles = useCallback(
    (data: UserProfile[]) => {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
    },
    [sortOrder]
  );

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/profiles");
        const data = await response.json();
        const filteredData = filterProfiles(data);
        const sortedData = sortProfiles(filteredData);
        setProfiles(sortedData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
        setProfiles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [filterProfiles, sortProfiles]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Błąd: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <SortingButtons profilesCount={profiles.length} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-48 rounded-lg"
            />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nie znaleziono profili spełniających kryteria
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              index={index}
              onStylesClick={(styles) => {
                setSelectedStyles(styles);
                setIsStylesModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isStylesModalOpen}
        onClose={() => {
          setIsStylesModalOpen(false);
          setSelectedStyles([]);
        }}
        title="Style tańca"
      >
        <div className="flex flex-col divide-y divide-gray-100">
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {selectedStyles.map((style, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 
                           bg-white border border-gray-200 
                           text-sm font-medium text-gray-700 
                           rounded-full shadow-sm hover:bg-gray-50 
                           transition-colors duration-150"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
