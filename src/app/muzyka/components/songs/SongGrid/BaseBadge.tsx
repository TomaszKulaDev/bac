import { motion } from 'framer-motion';

interface BaseBadgeProps {
  icon: string;
  label: string;
  color: string;
  description?: string;
}

export const BaseBadge: React.FC<BaseBadgeProps> = ({
  icon,
  label,
  color,
  description
}) => {
  return (
    <div 
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium text-white bg-gradient-to-r ${color}`}
      title={description}
      role="status"
      aria-label={`${label}${description ? ` - ${description}` : ''}`}
    >
      {icon && <span className="text-xs">{icon}</span>}
      <span>{label}</span>
    </div>
  );
};
