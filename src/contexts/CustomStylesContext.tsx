import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { styleService, UserStyleConfig, styleType } from '@/services/styleService';
import {
  haircutStyles as defaultHaircuts,
  beardStyles as defaultBeards,
  machineHeights as defaultMachineHeights,
  fadeTypes as defaultFadeTypes,
  sideStyles as defaultSideStyles,
  finishStyles as defaultFinishStyles,
  scissorHeights as defaultScissorHeights,
  beardHeights as defaultBeardHeights,
  beardContours as defaultBeardContours,
  cuttingMethods as defaultCuttingMethods
} from '@/data/barberData';
import { HaircutStyle, BeardStyle } from '@/types/barber';

interface CustomStylesContextType {
  haircutStyles: HaircutStyle[];
  beardStyles: BeardStyle[];
  machineHeights: any[];
  fadeTypes: any[];
  sideStyles: any[];
  finishStyles: any[];
  scissorHeights: any[];
  beardHeights: any[];
  beardContours: any[];
  cuttingMethods: any[];
  loading: boolean;
  updateStyleImage: (styleId: string, type: styleType, file: File) => Promise<boolean>;
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

  // Merge logic helper
  const mergeStyles = (defaultStyles: any[], type: styleType) => {
    return defaultStyles.map(style => {
      const config = customConfigs.find(c => c.style_id === style.id && c.type === type);
      return config ? { ...style, imageData: config.custom_image_url } : style;
    });
  };

  const haircutStyles = mergeStyles(defaultHaircuts, 'hair');
  const beardStyles = mergeStyles(defaultBeards, 'beard');
  const machineHeights = mergeStyles([...defaultMachineHeights], 'machine-height');
  const fadeTypes = mergeStyles([...defaultFadeTypes], 'fade-type');
  const sideStyles = mergeStyles([...defaultSideStyles], 'side-style');
  const finishStyles = mergeStyles([...defaultFinishStyles], 'finish-style');
  const scissorHeights = mergeStyles([...defaultScissorHeights], 'scissor-height');
  const beardHeights = mergeStyles([...defaultBeardHeights], 'beard-height');
  const beardContours = mergeStyles([...defaultBeardContours], 'beard-contour');
  const cuttingMethods = mergeStyles([...defaultCuttingMethods], 'haircut-method');

  const updateStyleImage = async (styleId: string, type: styleType, file: File) => {
    if (!user) return false;

    const publicUrl = await styleService.updateUserStyle(user.id, styleId, type, file);
    if (publicUrl) {
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
    <CustomStylesContext.Provider value={{
      haircutStyles,
      beardStyles,
      machineHeights,
      fadeTypes,
      sideStyles,
      finishStyles,
      scissorHeights,
      beardHeights,
      beardContours,
      cuttingMethods,
      loading,
      updateStyleImage
    }}>
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

