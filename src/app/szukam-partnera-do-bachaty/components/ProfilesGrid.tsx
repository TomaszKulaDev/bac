import { memo } from "react";
import { UserProfile } from "@/types/user";
import ProfileCard from "./ProfileCard";
import Link from "next/link";
import { getProfileUrl } from "@/utils/profile";

interface ProfilesGridProps {
  profiles: UserProfile[];
  onStylesClick: (e: React.MouseEvent) => void;
}

// Memoizowany ProfileCard
const MemoizedProfileCard = memo(ProfileCard, (prev, next) => {
  return prev.profile.id === next.profile.id && prev.index === next.index;
});

export const ProfilesGrid = memo(
  ({ profiles, onStylesClick }: ProfilesGridProps) => {
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
            >
              <ProfileCard
                profile={profile}
                index={index}
                onStylesClick={onStylesClick}
              />
            </div>
          </Link>
        ))}
      </div>
    );
  }
);

// Dodajemy displayName dla obu komponentów
MemoizedProfileCard.displayName = "MemoizedProfileCard";
ProfilesGrid.displayName = "ProfilesGrid";
