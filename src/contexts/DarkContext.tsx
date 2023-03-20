import React, { createContext, SetStateAction, useContext } from 'react';

export interface ThemeContent {
  theme: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ThemeContext = createContext<ThemeContent>({
  theme: false,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
});

export const useThemeContext = () => useContext(ThemeContext);
