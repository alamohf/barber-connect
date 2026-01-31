import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface OptionSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function OptionSection({ title, children, className }: OptionSectionProps) {
  return (
    <section className={cn('animate-fade-in', className)}>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {children}
      </div>
    </section>
  );
}