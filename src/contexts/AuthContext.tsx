// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';

// 1. ✅ Atualize a tipagem para incluir updateUser
type AuthContextType = {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (newData: { email: string }) => Promise<void>; // 👈 Adicionado
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
    if (email && password) {
      const userData = { email };
      setUser(userData);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const register = async (name: string, email: string, password: string) => {
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

  // 2. ✅ Função updateUser (já estava aqui — mantenha)
  const updateUser = async (newData: { email: string }) => {
    if (!user) throw new Error('Nenhum usuário logado');
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
  };

  // 3. ✅ Inclua updateUser no value do Provider
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser, // 👈 Adicionado aqui
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};