import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRuler, FaHeart } from "react-icons/fa";
import { UserProfile } from "@/types/user";
import { ProfileActionButton } from "./buttons/ProfileActionButtons";
import { toast } from "react-toastify";
import { getProfileUrl } from "@/utils/profile";

interface ProfileCardProps {
  profile: UserProfile;
  index: number;
  onStylesClick?: (e: React.MouseEvent) => void;
  onLike?: (profileId: string) => void;
  onShare?: (profileId: string) => void;
  onMessage?: (profileId: string) => void;
  isLiked?: boolean;
}

const ProfileCard = memo(
  ({ profile, index, onStylesClick }: ProfileCardProps) => {
    const handleStylesClick = (e: React.MouseEvent) => {
      if (onStylesClick) {
        onStylesClick(e);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="w-full h-full"
      >
        <div className="relative w-full h-full">
          <Image
            src={profile.image ?? "/images/default-avatar.png"}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 
                 (max-width: 768px) 50vw,
                 (max-width: 1024px) 33vw,
                 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            {profile.dancePreferences?.location && (
              <p className="text-sm opacity-90">
                {profile.dancePreferences.location}
              </p>
            )}
            {profile.dancePreferences?.styles && (
              <div className="mt-2">
                <button
                  onClick={handleStylesClick}
                  className="text-xs bg-white/20 hover:bg-white/30 
                         px-2 py-1 rounded-full transition-colors"
                >
                  Zobacz style tańca
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
