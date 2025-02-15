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
import Link from "next/link";
import { getProfileUrl } from "@/utils/profile";
import AdBanner from "./AdBanner/AdBanner";

const PROFILES_PER_PAGE = 50;

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
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Memoizujemy profile
  const profiles = useMemo(() => {
    return data?.pages.flatMap((page) => page.profiles) ?? [];
  }, [data?.pages]);

  // Poprawiony useCallback bez zbędnych zależności
  const handleStylesClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const profile = (e.currentTarget as HTMLElement)
        .closest("[data-profile-id]")
        ?.getAttribute("data-profile-id");
      if (profile) {
        const profileData = profiles.find((p) => p.id === profile);
        if (profileData?.dancePreferences?.styles) {
          setSelectedStyles(profileData.dancePreferences.styles);
          setIsStylesModalOpen(true);
        }
      }
    },
    [profiles]
  );

  // Obsługa wirtualizacji dla dużych list
  const { visibleItems, onScroll } = useVirtualization(
    profiles.length,
    400,
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  // Usuwamy niepotrzebny useCallback dla renderProfiles
  const renderProfiles = () => {
    if (isLoading) return <LoadingSkeleton />;
    if (profiles.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          Nie znaleziono profili spełniających kryteria
        </div>
      );
    }

    return (
      <div
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 
                    gap-4 space-y-4 [column-fill:_balance]"
      >
        {profiles.map((profile, index) => (
          <Link
            key={profile.id}
            href={getProfileUrl(profile)}
            className="block break-inside-avoid-column mb-4"
          >
            <div
              data-profile-id={profile.id}
              className="relative rounded-lg overflow-hidden bg-white shadow-sm 
                       hover:shadow-md transition-shadow"
              style={{
                height: mounted
                  ? isMobile
                    ? "400px"
                    : `${Math.floor(Math.random() * (500 - 300) + 300)}px`
                  : "300px",
              }}
            >
              <ProfileCard
                profile={profile}
                index={index}
                onStylesClick={handleStylesClick}
              />
            </div>
          </Link>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setMounted(true);
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (isError) {
    return (
      <div className="text-red-500 text-center">
        Błąd: {error instanceof Error ? error.message : "Wystąpił błąd"}
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <AdBanner />
      <div className="mb-8">
        <SortingButtons />
      </div>

      {renderProfiles()}

      {hasNextPage && (
        <div ref={infiniteScrollRef} className="py-8">
          {isFetchingNextPage && <LoadingSkeleton />}
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
