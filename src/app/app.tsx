"use client";

import { ThemeProvider } from './components/ThemeContext/ThemeContext';
import { NavbarComponent } from './components/Navbar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <NavbarComponent />
    </ThemeProvider>
  );
}
