"use client";

import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import stores from './redux/reducers/store';
import { ThemeProvider } from '../app/components/ThemeContext/ThemeContext';



const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Provider store={stores}>
      <div className="App">
        <Component {...pageProps} />
      </div>
    </Provider>
  </ThemeProvider>
);

export default MyApp;
