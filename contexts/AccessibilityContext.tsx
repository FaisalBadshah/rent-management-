
import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';
type Contrast = 'normal' | 'high';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  contrast: Contrast;
  setContrast: (contrast: Contrast) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('fontSize') as FontSize) || 'normal';
  });

  const [contrast, setContrast] = useState<Contrast>(() => {
    return (localStorage.getItem('contrast') as Contrast) || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('contrast', contrast);
    document.documentElement.setAttribute('data-contrast', contrast);
  }, [contrast]);

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize, contrast, setContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
