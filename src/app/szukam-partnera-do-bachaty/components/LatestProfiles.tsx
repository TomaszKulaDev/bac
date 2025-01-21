"use client";

import {
  useState,
  useEffect,
  memo,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "@/types/user";
import { useFilters } from "../context/FilterContext";
import { SortingButtons } from "./SortingButtons";
import Modal from "@/components/ui/Modal";
import ProfileCard from "./ProfileCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { ProfilesGrid } from "./ProfilesGrid";
import { usePrefetchNextPage } from "../hooks/usePrefetchNextPage";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useVirtualization } from "../hooks/useVirtualization";
import { inView } from "framer-motion";

const PROFILES_PER_PAGE = 12;

interface FetchProfilesResponse {
  profiles: UserProfile[];
  nextPage: number;
  hasMore: boolean;
}

export const LatestProfiles = () => {
  const queryClient = useQueryClient();
  const {
    sortOrder,
    selectedGender,
    selectedLevel,
    selectedDanceStyle,
    selectedLocation,
  } = useFilters();

  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [isStylesModalOpen, setIsStylesModalOpen] = useState(false);

  const handleStylesClick = useCallback((styles: string[]) => {
    setSelectedStyles(styles);
    setIsStylesModalOpen(true);
  }, []);

  const fetchProfiles = async ({
    pageParam = 1,
  }): Promise<FetchProfilesResponse> => {
    const response = await fetch(
      `/api/profiles?page=${pageParam}&limit=${PROFILES_PER_PAGE}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const profiles = await response.json();
    console.log("Otrzymane profile z API:", profiles.length);

    if (!Array.isArray(profiles)) {
      throw new Error("Nieprawidłowy format danych z API");
    }

    const processedProfiles = filterAndSortProfiles(profiles);
    console.log("Po filtrowaniu:", processedProfiles.length);

    return {
      profiles: processedProfiles,
      nextPage: pageParam + 1,
      hasMore: processedProfiles.length >= PROFILES_PER_PAGE,
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [
      "profiles",
      selectedGender,
      selectedLevel,
      selectedDanceStyle,
      selectedLocation,
      sortOrder,
    ],
    queryFn: fetchProfiles,
    initialPageParam: 1,
    getNextPageParam: (lastPage: FetchProfilesResponse) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const { ref: infiniteScrollRef } = useInfiniteScroll(
    !!hasNextPage,
    isFetchingNextPage,
    () => fetchNextPage()
  );

  const filterAndSortProfiles = useCallback(
    (profiles: UserProfile[]) => {
      // Najpierw filtrujemy
      const filtered = profiles.filter((profile: UserProfile) => {
        if (!profile.isPublicProfile) return false;

        // Używamy obiektów map dla lepszej wydajności przy wielu profilach
        const checks = {
          location:
            !selectedLocation ||
            profile.dancePreferences?.location === selectedLocation,
          gender: !selectedGender || profile.gender === selectedGender,
          level:
            !selectedLevel || profile.dancePreferences?.level === selectedLevel,
          style:
            !selectedDanceStyle ||
            profile.dancePreferences?.styles.includes(selectedDanceStyle),
        };

        return Object.values(checks).every(Boolean);
      });

      // Potem sortujemy
      return filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
    },
    [
      selectedLocation,
      selectedGender,
      selectedLevel,
      selectedDanceStyle,
      sortOrder,
    ]
  );

  usePrefetchNextPage(
    data,
    [
      "profiles",
      selectedGender,
      selectedLevel,
      selectedDanceStyle,
      selectedLocation,
      sortOrder,
    ],
    (pageParam) => fetchProfiles({ pageParam })
  );

  // Optymalizacja filtrowania
  const filteredProfiles = useMemo(() => {
    return data?.pages.flatMap((page) => page.profiles) ?? [];
  }, [data?.pages]);

  // Obsługa wirtualizacji dla dużych list
  const { visibleItems, onScroll } = useVirtualization(
    filteredProfiles.length,
    400,
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  // Optymalizacja renderowania
  const renderProfiles = useCallback(() => {
    console.log("Liczba profili do wyrenderowania:", filteredProfiles.length);

    if (isLoading) return <LoadingSkeleton />;
    if (filteredProfiles.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          Nie znaleziono profili spełniających kryteria
        </div>
      );
    }

    return (
      <div className="overflow-auto">
        <ProfilesGrid
          profiles={filteredProfiles}
          onStylesClick={handleStylesClick}
        />
        {hasNextPage && (
          <div ref={infiniteScrollRef} className="py-8">
            {isFetchingNextPage && <LoadingSkeleton />}
          </div>
        )}
      </div>
    );
  }, [
    isLoading,
    filteredProfiles,
    hasNextPage,
    isFetchingNextPage,
    handleStylesClick,
    infiniteScrollRef,
  ]);

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          Błąd: {error instanceof Error ? error.message : "Wystąpił błąd"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg 
                   hover:bg-amber-600 transition-colors"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <SortingButtons profilesCount={filteredProfiles.length} />
      </div>
      {renderProfiles()}
      <Modal
        isOpen={isStylesModalOpen}
        onClose={() => {
          setIsStylesModalOpen(false);
          setSelectedStyles([]);
        }}
        title="Style tańca"
      >
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
      </Modal>
    </div>
  );
};
