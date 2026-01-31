import { DynamicIcon } from './DynamicIcon';
import { cn } from '@/lib/utils';

interface SummaryItemProps {
  icon: string;
  label: string;
  value: string;
  className?: string;
}

export function SummaryItem({ icon, label, value, className }: SummaryItemProps) {
  return (
    <div className={cn(
      'flex items-center gap-4 p-4 bg-secondary/50 rounded-xl',
      className
    )}>
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <DynamicIcon name={icon} className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}