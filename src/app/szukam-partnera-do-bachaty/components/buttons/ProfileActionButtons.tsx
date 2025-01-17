import { memo } from "react";
import { FaPeoplePulling } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ActionButton } from "./ActionButton";

interface ProfileActionButtonsProps {
  profileId: string;
  isWantToDance?: boolean;
  onWantToDance?: (profileId: string) => void;
  className?: string;
}

type ActionHandler = (id: string) => void;

export const ProfileActionButton = memo(
  ({
    profileId,
    isWantToDance = false,
    onWantToDance,
    className = "",
  }: ProfileActionButtonsProps) => {
    const handleAction = (e: React.MouseEvent, handler?: ActionHandler) => {
      e.preventDefault();
      e.stopPropagation();
      if (handler) {
        handler(profileId);
      }
    };

    return (
      <div className={`flex gap-2 ${className}`}>
        <motion.div
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ActionButton
            icon={
              <FaPeoplePulling
                className={`w-5 h-5 transform 
                  ${
                    isWantToDance
                      ? "text-amber-400 scale-110 drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]"
                      : "text-gray-400 hover:text-amber-400"
                  }
                  transition-all duration-300 ease-in-out
                  group-hover:scale-105
                `}
              />
            }
            onClick={(e) => handleAction(e, onWantToDance)}
            label={
              isWantToDance
                ? "Anuluj zaproszenie do tańca"
                : "Chcę z Tobą tańczyć"
            }
            variant="default"
            size="lg"
            className={`
              shadow-lg hover:shadow-xl
              bg-white/95 hover:bg-white
              backdrop-blur-md
              transform hover:-translate-y-0.5
              transition-all duration-300 ease-in-out
              active:scale-95
            `}
          />
        </motion.div>
      </div>
    );
  }
);

ProfileActionButton.displayName = "ProfileActionButton";
