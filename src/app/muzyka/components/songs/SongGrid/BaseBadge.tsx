import { motion } from 'framer-motion';

interface BaseBadgeProps {
  icon: string;
  label: string;
  color: string;
}

export const BaseBadge: React.FC<BaseBadgeProps> = ({ icon, label, color }) => {
  return (
    <motion.div
      className={`
        inline-flex items-center gap-1 px-1.5 py-0.5
        rounded-md text-[10px] font-medium
        bg-gradient-to-r ${color} to-transparent
        text-white shadow-sm
        backdrop-blur-[2px]
        border border-white/20
        hover:border-white/30 transition-colors
      `}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="inline-flex items-center justify-center w-[16px] h-[16px] text-[13px] leading-none">{icon}</span>
      <span className="truncate max-w-[48px] drop-shadow-sm leading-none">{label}</span>
    </motion.div>
  );
};
