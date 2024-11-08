import { motion } from 'framer-motion';
import { levelConfig } from './constants';

interface LevelBadgeProps {
  level: keyof typeof levelConfig;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level }) => {
  const config = levelConfig[level];
  return (
    <div className="absolute top-2 left-2 z-20 flex items-center">
      <div 
        className={`
          flex items-center gap-1 px-2 py-1 
          rounded-full text-[10px] font-medium
          bg-gradient-to-r ${config.color}
          text-white shadow-lg
          backdrop-blur-md backdrop-filter
          border border-white/20
        `}
      >
        <span className="text-xs">{config.icon}</span>
        <span>{config.label}</span>
      </div>
    </div>
  );
};