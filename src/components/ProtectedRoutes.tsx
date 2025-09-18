// src/components/ProtectedRoute.tsx
import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = {
  navigate: (screen: string) => void;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Verificando sessão...</Text>
      </View>
    );
  }

  // Se não estiver logado, redireciona para Login
  if (!user) {
    navigation.navigate('Login');
    return null;
  }

  // Se estiver logado, renderiza o conteúdo
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});