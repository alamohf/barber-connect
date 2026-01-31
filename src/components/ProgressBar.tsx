import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Passo {current} de {total}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}