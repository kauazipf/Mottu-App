// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await SecureStore.getItemAsync('user');
      if (savedUser) setUser(JSON.parse(savedUser));
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação: substitua por chamada real à API
    if (email && password) {
      const userData = { email };
      setUser(userData);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulação
    if (name && email && password) {
      const userData = { email };
      setUser(userData);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
    } else {
      throw new Error('Preencha todos os campos');
    }
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};