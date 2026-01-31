import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  Selection, 
  initialSelection, 
  ServiceType, 
  HaircutStyle, 
  BeardStyle,
  HaircutDetails,
  BeardDetails
} from '@/types/barber';

interface SelectionContextType {
  selection: Selection;
  setServiceType: (type: ServiceType) => void;
  setHaircutStyle: (style: HaircutStyle) => void;
  setHaircutDetails: (details: Partial<HaircutDetails>) => void;
  setBeardStyle: (style: BeardStyle) => void;
  setBeardDetails: (details: Partial<BeardDetails>) => void;
  resetSelection: () => void;
  getProgressSteps: () => { current: number; total: number };
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

const STORAGE_KEY = 'barber-selection';

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<Selection>(() => {
    // Recuperar do localStorage se disponível
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge com initialSelection para garantir estrutura completa
        return {
          ...initialSelection,
          ...parsed,
          haircutDetails: {
            ...initialSelection.haircutDetails,
            ...parsed.haircutDetails,
          },
          beardDetails: {
            ...initialSelection.beardDetails,
            ...parsed.beardDetails,
          },
        };
      }
    } catch (e) {
      console.error('Erro ao recuperar seleção:', e);
    }
    return initialSelection;
  });

  // Salvar no localStorage quando mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch (e) {
      console.error('Erro ao salvar seleção:', e);
    }
  }, [selection]);

  const setServiceType = useCallback((type: ServiceType) => {
    setSelection(prev => ({
      ...initialSelection,
      serviceType: type,
    }));
  }, []);

  const setHaircutStyle = useCallback((style: HaircutStyle) => {
    setSelection(prev => ({
      ...prev,
      haircutStyle: style,
    }));
  }, []);

  const setHaircutDetails = useCallback((details: Partial<HaircutDetails>) => {
    setSelection(prev => ({
      ...prev,
      haircutDetails: {
        ...prev.haircutDetails,
        ...details,
      },
    }));
  }, []);

  const setBeardStyle = useCallback((style: BeardStyle) => {
    setSelection(prev => ({
      ...prev,
      beardStyle: style,
    }));
  }, []);

  const setBeardDetails = useCallback((details: Partial<BeardDetails>) => {
    setSelection(prev => ({
      ...prev,
      beardDetails: {
        ...prev.beardDetails,
        ...details,
      },
    }));
  }, []);

  const resetSelection = useCallback(() => {
    setSelection(initialSelection);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getProgressSteps = useCallback(() => {
    const { serviceType } = selection;
    
    if (serviceType === 'hair') {
      return { current: 0, total: 3 }; // Cabelo, Detalhes, Confirmação
    }
    if (serviceType === 'beard') {
      return { current: 0, total: 3 }; // Barba, Detalhes, Confirmação
    }
    if (serviceType === 'both') {
      return { current: 0, total: 5 }; // Cabelo, Det. Cabelo, Barba, Det. Barba, Confirmação
    }
    
    return { current: 0, total: 1 };
  }, [selection]);

  return (
    <SelectionContext.Provider value={{
      selection,
      setServiceType,
      setHaircutStyle,
      setHaircutDetails,
      setBeardStyle,
      setBeardDetails,
      resetSelection,
      getProgressSteps,
    }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection deve ser usado dentro de SelectionProvider');
  }
  return context;
}