import { FC, useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

export const ThemeContext = createContext((_themeName: string): void => {});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      // mutation options
    },
  },
});

const ThemeProviderWrapper: FC = (props) => {
  const [themeName, _setThemeName] = useState('NebulaFighterTheme');

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'NebulaFighterTheme';
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </QueryClientProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;