import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { DynamicIcon } from './DynamicIcon';
import { Pencil } from 'lucide-react';

interface OptionButtonProps {
  icon: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
  onEdit?: () => void;
  fullWidth?: boolean;
  backgroundImage?: string;
  defaultImage?: string;
  imageData?: string;
  editable?: boolean;
}

export function OptionButton({
  icon,
  label,
  selected = false,
  onClick,
  onEdit,
  fullWidth = false,
  backgroundImage,
  defaultImage,
  imageData,
  editable = false,
}: OptionButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset error state when image source changes
  useEffect(() => {
    setImageError(false);
  }, [imageData, defaultImage]);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const displayImage = imageData || defaultImage || backgroundImage;

  // Reset error state when image source changes
  useEffect(() => {
    setImageError(false);
  }, [displayImage]);

  return (
    <div className={cn("relative", fullWidth && "w-full")}>
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
          'selection-button min-h-[140px]',
          selected && 'selected',
          isAnimating && 'pulse-selection',
          fullWidth && 'w-full',
          backgroundImage && 'has-bg'
        )}
      >
        {displayImage && !imageError ? (
          <div className={cn(
            'rounded-xl overflow-hidden mb-2 border-2 border-border h-20 w-20',
          )}>
            <img
              src={displayImage}
              alt={label}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <DynamicIcon
            name={icon}
            className={cn(
              'h-8 w-8 transition-colors duration-200',
              selected ? 'text-primary' : 'text-muted-foreground'
            )}
          />
        )}

        <span
          className={cn(
            'text-base font-medium text-center',
            selected ? 'text-primary' : 'text-foreground'
          )}
        >
          {label}
        </span>
      </button>

      {editable && (
        <button
          onClick={handleEditClick}
          className="absolute top-2 right-2 p-1.5 bg-background/90 backdrop-blur-sm rounded-full border border-border shadow-sm hover:bg-accent transition-colors z-20"
          aria-label={`Editar ${label}`}
        >
          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}

