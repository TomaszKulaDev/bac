import { tempoConfig } from './constants';
import { BaseBadge } from './BaseBadge';
import type { TempoType } from './types';

interface TempoBadgeProps {
  tempo: TempoType;
  isMobile?: boolean;
}

export const TempoBadge: React.FC<TempoBadgeProps> = ({ tempo, isMobile }) => {
  const config = tempoConfig[tempo];
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