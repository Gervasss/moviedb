"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};