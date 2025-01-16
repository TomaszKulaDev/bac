"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "@/types/user";
import { useFilters } from "../context/FilterContext";
import { SortingButtons } from "./SortingButtons";
import Modal from "@/components/ui/Modal";
import ProfileCard from "./ProfileCard";
import LoadingSkeleton from "./LoadingSkeleton";

const PROFILES_PER_PAGE = 12;

interface FetchProfilesResponse {
  profiles: UserProfile[];
  nextPage: number;
  hasMore: boolean;
}

// Memoizowany ProfileCard
const MemoizedProfileCard = memo(ProfileCard, (prev, next) => {
  return prev.profile.id === next.profile.id && prev.index === next.index;
});

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

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

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

    if (!Array.isArray(profiles)) {
      throw new Error("Nieprawidłowy format danych z API");
    }

    const filteredProfiles = profiles.filter((profile: UserProfile) => {
      if (!profile.isPublicProfile) return false;

      const locationMatch =
        !selectedLocation ||
        profile.dancePreferences?.location === selectedLocation;
      const genderMatch = !selectedGender || profile.gender === selectedGender;
      const levelMatch =
        !selectedLevel || profile.dancePreferences?.level === selectedLevel;
      const styleMatch =
        !selectedDanceStyle ||
        profile.dancePreferences?.styles.includes(selectedDanceStyle);

      return locationMatch && genderMatch && levelMatch && styleMatch;
    });

    const sortedProfiles = [...filteredProfiles].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return {
      profiles: sortedProfiles,
      nextPage: pageParam + 1,
      hasMore: profiles.length >= PROFILES_PER_PAGE,
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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (data?.pages[data.pages.length - 1]?.hasMore) {
      const nextPage = data.pages[data.pages.length - 1].nextPage;
      queryClient.prefetchInfiniteQuery({
        queryKey: [
          "profiles",
          selectedGender,
          selectedLevel,
          selectedDanceStyle,
          selectedLocation,
          sortOrder,
        ],
        queryFn: () => fetchProfiles({ pageParam: nextPage }),
        initialPageParam: nextPage,
      });
    }
  }, [
    data?.pages,
    queryClient,
    fetchProfiles,
    selectedGender,
    selectedLevel,
    selectedDanceStyle,
    selectedLocation,
    sortOrder,
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

  const allProfiles = data?.pages.flatMap((page) => page.profiles) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <SortingButtons profilesCount={allProfiles.length} />
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : allProfiles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nie znaleziono profili spełniających kryteria
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                        xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {allProfiles.map((profile: UserProfile, index: number) => (
              <MemoizedProfileCard
                key={profile.id}
                profile={profile}
                index={index}
                onStylesClick={handleStylesClick}
              />
            ))}
          </div>

          {hasNextPage && (
            <div ref={loadMoreRef} className="py-8">
              {isFetchingNextPage && <LoadingSkeleton />}
            </div>
          )}
        </>
      )}

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
