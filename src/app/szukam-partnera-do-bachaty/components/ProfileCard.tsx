import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRuler, FaHeart } from "react-icons/fa";
import { UserProfile } from "@/types/user";

interface ProfileCardProps {
  profile: UserProfile;
  index: number;
  onStylesClick: (styles: string[]) => void;
}

const ProfileCard = memo(
  ({ profile, index, onStylesClick }: ProfileCardProps) => {
    const renderStyles = (styles: string[]) => {
      if (!styles || styles.length === 0) return null;

      return (
        <div className="flex flex-wrap gap-1">
          {styles.slice(0, 3).map((style, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs font-medium 
                     bg-white/10 backdrop-blur-sm rounded-full"
            >
              {style}
            </span>
          ))}
          {styles.length > 3 && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onStylesClick(styles);
              }}
              className="inline-block px-2 py-1 text-xs font-medium 
                     bg-white/10 backdrop-blur-sm rounded-full
                     hover:bg-white/20 transition-colors"
            >
              +{styles.length - 3}
            </button>
          )}
        </div>
      );
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <Link
          href={`/profile/${
            profile.slug ||
            encodeURIComponent(profile.name.toLowerCase().replace(/\s+/g, "-"))
          }`}
          className="block relative aspect-[4/5] rounded-lg overflow-hidden
                 ring-1 ring-gray-200 group-hover:ring-amber-500/50 
                 transition-all duration-300 bg-gray-100"
        >
          <Image
            src={profile.image ?? "/images/default-avatar.png"}
            alt={profile.name}
            fill
            priority={index < 4}
            className="object-cover transition-transform duration-300 
                   group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 
                 (max-width: 768px) 50vw,
                 (max-width: 1024px) 33vw,
                 25vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-3 text-white">
            <h3 className="font-medium text-base leading-tight mb-0.5">
              {profile.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-white/90 mb-1.5">
              {profile.dancePreferences?.location && (
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="w-3 h-3" />
                  <span>{profile.dancePreferences.location}</span>
                </div>
              )}
              {profile.height && (
                <div className="flex items-center gap-1">
                  <FaRuler className="w-3 h-3" />
                  <span>{profile.height} cm</span>
                </div>
              )}
            </div>

            {profile.dancePreferences?.styles &&
              renderStyles(profile.dancePreferences.styles)}
          </div>
        </Link>

        <button
          className="absolute top-2 right-2 p-1.5 rounded-full 
                  bg-white/90 backdrop-blur-sm hover:bg-white 
                  transition-colors z-20"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FaHeart
            className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 
                           transition-colors"
          />
        </button>
      </motion.div>
    );
  }
);

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
