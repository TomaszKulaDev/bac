import { levelConfig } from './constants';
import { BaseBadge } from './BaseBadge';

interface LevelBadgeProps {
  level: keyof typeof levelConfig;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level }) => {
  const config = levelConfig[level];
  return (
    <BaseBadge
      icon={config.icon}
      label={config.label}
      color={config.color}
    />
  );
};