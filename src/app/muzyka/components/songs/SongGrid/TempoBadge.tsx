import { tempoConfig } from './constants';
import { BaseBadge } from './BaseBadge';
import type { TempoType } from './types';

interface TempoBadgeProps {
  tempo: TempoType;
}

export const TempoBadge: React.FC<TempoBadgeProps> = ({ tempo }) => {
  const config = tempoConfig[tempo];
  return (
    <BaseBadge
      icon={config.icon}
      label={config.label}
      color={config.color}
      description={config.description}
    />
  );
}; 