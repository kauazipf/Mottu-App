import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define os tipos possíveis de tema
type ThemeType = 'light' | 'dark';

// Define a estrutura do contexto
interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    card: string;
  };
}

// Paleta de cores dos temas
const themes = {
  light: {
    background: '#F2F6FC',
    text: '#1F1F1F',
    primary: '#028220FF',
    card: '#FFFFFF',
  },
  dark: {
    background: '#1F1F1F',
    text: '#F2F2F2',
    primary: '#50D57A',
    card: '#2C2C2C',
  },
};

// Criação do contexto
const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

// Provedor do tema
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: themes[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar o contexto
export const useTheme = () => useContext(ThemeContext);
