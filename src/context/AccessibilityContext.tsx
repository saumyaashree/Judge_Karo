'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AccessibilityContextType {
  isAccessibilityMode: boolean;
  toggleAccessibilityMode: () => void;
}

export const AccessibilityContext = createContext<AccessibilityContextType>({
  isAccessibilityMode: false,
  toggleAccessibilityMode: () => {},
});

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

  const toggleAccessibilityMode = () => {
    setIsAccessibilityMode(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider value={{ isAccessibilityMode, toggleAccessibilityMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
