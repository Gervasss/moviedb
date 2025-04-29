"use client";

import { Provider } from 'react-redux';
import store from '../app/redux/reducers/store';
import { ThemeProvider } from '../app/components/ThemeContext/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
}
