import { levelConfig } from './constants';
import { BaseBadge } from './BaseBadge';
import type { DifficultyLevel } from './types';

interface LevelBadgeProps {
  level: DifficultyLevel;
  isMobile?: boolean;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, isMobile }) => {
  const config = levelConfig[level];
  return (
    <BaseBadge
      icon={config.icon}
      label={config.label}
      color={config.color}
      description={config.description}
      isMobile={isMobile}
    />
  );
};