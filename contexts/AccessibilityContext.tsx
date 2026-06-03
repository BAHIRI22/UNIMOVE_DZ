'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  largeFonts: boolean;
  reducedMotion: boolean;
  toggleHighContrast: () => void;
  toggleLargeFonts: () => void;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeFonts, setLargeFonts] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('unimove_accessibility');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHighContrast(!!parsed.highContrast);
        setLargeFonts(!!parsed.largeFonts);
        setReducedMotion(!!parsed.reducedMotion);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const html = document.documentElement;
    if (highContrast) html.classList.add('high-contrast');
    else html.classList.remove('high-contrast');
    if (largeFonts) html.classList.add('large-fonts');
    else html.classList.remove('large-fonts');
    if (reducedMotion) html.classList.add('reduce-motion');
    else html.classList.remove('reduce-motion');
    localStorage.setItem('unimove_accessibility', JSON.stringify({ highContrast, largeFonts, reducedMotion }));
  }, [highContrast, largeFonts, reducedMotion]);

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      largeFonts,
      reducedMotion,
      toggleHighContrast: () => setHighContrast((v) => !v),
      toggleLargeFonts: () => setLargeFonts((v) => !v),
      toggleReducedMotion: () => setReducedMotion((v) => !v),
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
