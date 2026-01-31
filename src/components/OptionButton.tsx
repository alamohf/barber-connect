import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DynamicIcon } from './DynamicIcon';

interface OptionButtonProps {
  icon: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
  fullWidth?: boolean;
  backgroundImage?: string;
}

export function OptionButton({
  icon,
  label,
  selected = false,
  onClick,
  fullWidth = false,
  backgroundImage,
}: OptionButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={selected}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
      className={cn(
        'selection-button',
        selected && 'selected',
        isAnimating && 'pulse-selection',
        fullWidth && 'w-full',
        backgroundImage && 'has-bg'
      )}
    >
      <DynamicIcon
        name={icon}
        className={cn(
          'h-8 w-8 transition-colors duration-200',
          selected ? 'text-primary' : 'text-muted-foreground'
        )}
      />

      <span
        className={cn(
          'text-base font-medium text-center',
          selected ? 'text-primary' : 'text-foreground'
        )}
      >
        {label}
      </span>
    </button>
  );
}
