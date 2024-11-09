import { STYLE_OPTIONS } from './filters/constants';
import type { StyleType } from './types';
import { BaseBadge } from './BaseBadge';

interface StyleBadgeProps {
  style: StyleType;
}

export const StyleBadge: React.FC<StyleBadgeProps> = ({ style }) => {
  const config = STYLE_OPTIONS[style];
  return (
    <BaseBadge
      icon={config.icon}
      label={config.label}
      color={config.color}
    />
  );
}; 