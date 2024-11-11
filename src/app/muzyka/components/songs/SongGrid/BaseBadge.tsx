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
        rounded-sm text-[9px] font-medium
        bg-gradient-to-r ${color}
        text-white shadow-sm
        backdrop-blur-sm
        border border-white/20
        hover:border-white/40 transition-colors
        flex-1 min-w-0
      `}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="inline-flex items-center justify-center w-3.5 h-3.5 text-[11px]">{icon}</span>
      <span className="truncate leading-none">{label}</span>
    </motion.div>
  );
};
