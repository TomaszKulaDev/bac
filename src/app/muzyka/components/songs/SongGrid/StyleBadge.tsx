import { styleConfig } from './constants';
import { BaseBadge } from './BaseBadge';
import type { StyleType } from './types';

interface StyleBadgeProps {
  style: StyleType;
  isMobile?: boolean;
}

export const StyleBadge: React.FC<StyleBadgeProps> = ({ style, isMobile }) => {
  const config = styleConfig[style];
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