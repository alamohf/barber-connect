import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { styleService, UserStyleConfig } from '@/services/styleService';
import { haircutStyles as defaultHaircuts, beardStyles as defaultBeards } from '@/data/barberData';
import { HaircutStyle, BeardStyle } from '@/types/barber';

interface CustomStylesContextType {
  haircutStyles: HaircutStyle[];
  beardStyles: BeardStyle[];
  loading: boolean;
  updateStyleImage: (styleId: string, type: 'hair' | 'beard', file: File) => Promise<boolean>;
}

const CustomStylesContext = createContext<CustomStylesContextType | undefined>(undefined);

export function CustomStylesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [customConfigs, setCustomConfigs] = useState<UserStyleConfig[]>([]);
  const [loading, setLoading] = useState(false);

  // Load custom styles when user logs in
  useEffect(() => {
    if (user) {
      setLoading(true);
      styleService.getUserStyles(user.id)
        .then(configs => {
          setCustomConfigs(configs);
        })
        .finally(() => setLoading(false));
    } else {
      setCustomConfigs([]);
    }
  }, [user]);

  // Merge logic
  const haircutStyles = defaultHaircuts.map(style => {
    const config = customConfigs.find(c => c.style_id === style.id && c.type === 'hair');
    return config ? { ...style, imageData: config.custom_image_url } : style;
  });

  const beardStyles = defaultBeards.map(style => {
    const config = customConfigs.find(c => c.style_id === style.id && c.type === 'beard');
    return config ? { ...style, imageData: config.custom_image_url } : style;
  });

  const updateStyleImage = async (styleId: string, type: 'hair' | 'beard', file: File) => {
    if (!user) return false;

    const publicUrl = await styleService.updateUserStyle(user.id, styleId, type, file);
    if (publicUrl) {
      // Optimistic update or refetch. Let's do a simple state update for now.
      setCustomConfigs(prev => {
        const existing = prev.findIndex(c => c.style_id === styleId && c.type === type);
        const newConfig: UserStyleConfig = { style_id: styleId, type, custom_image_url: publicUrl };

        if (existing >= 0) {
          const newConfigs = [...prev];
          newConfigs[existing] = newConfig;
          return newConfigs;
        }
        return [...prev, newConfig];
      });
      return true;
    }
    return false;
  };

  return (
    <CustomStylesContext.Provider value={{ haircutStyles, beardStyles, loading, updateStyleImage }}>
      {children}
    </CustomStylesContext.Provider>
  );
}

export const useCustomStyles = () => {
  const context = useContext(CustomStylesContext);
  if (context === undefined) {
    throw new Error('useCustomStyles must be used within a CustomStylesProvider');
  }
  return context;
};
