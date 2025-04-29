"use client";

import { Provider } from 'react-redux';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
        {children} 
    </ThemeProvider>
  );
}
