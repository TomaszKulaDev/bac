import { TEMPO_OPTIONS } from './filters/constants';
import type { TempoType } from './types';
import { BaseBadge } from './BaseBadge';

interface TempoBadgeProps {
  tempo: TempoType;
}

export const TempoBadge: React.FC<TempoBadgeProps> = ({ tempo }) => {
  const config = TEMPO_OPTIONS[tempo];
  return (
    <BaseBadge
      icon={config.icon}
      label={config.label}
      color={config.color}
    />
  );
}; 