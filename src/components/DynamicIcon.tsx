import { icons, LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = icons[name as keyof typeof icons];
  
  if (!IconComponent) {
    // Fallback para um ícone padrão
    const FallbackIcon = icons['Circle'];
    return <FallbackIcon {...props} />;
  }

  return <IconComponent {...props} />;
}