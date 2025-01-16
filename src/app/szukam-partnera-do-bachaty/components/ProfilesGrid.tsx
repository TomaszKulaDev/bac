import { memo } from "react";
import { UserProfile } from "@/types/user";
import ProfileCard from "./ProfileCard";

interface ProfilesGridProps {
  profiles: UserProfile[];
  onStylesClick: (styles: string[]) => void;
}

// Memoizowany ProfileCard
const MemoizedProfileCard = memo(ProfileCard, (prev, next) => {
  return prev.profile.id === next.profile.id && prev.index === next.index;
});

export const ProfilesGrid = memo(
  ({ profiles, onStylesClick }: ProfilesGridProps) => {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                    xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
      >
        {profiles.map((profile, index) => (
          <MemoizedProfileCard
            key={profile.id}
            profile={profile}
            index={index}
            onStylesClick={onStylesClick}
          />
        ))}
      </div>
    );
  },
  (prev, next) => {
    // Głębokie porównanie tylko jeśli liczba profili się zmieniła
    if (prev.profiles.length !== next.profiles.length) return false;

    // Sprawdź czy profile się zmieniły
    return prev.profiles.every(
      (profile, index) => profile.id === next.profiles[index].id
    );
  }
);
