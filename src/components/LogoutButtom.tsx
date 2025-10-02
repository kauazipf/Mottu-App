// src/components/LogoutButton.tsx
import React from 'react';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tipo para navegação no Stack
type StackNavigation = NativeStackNavigationProp<any>;

export function LogoutButton() {
  const { logout } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation<StackNavigation>(); // 👈 Aqui!

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.text,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        🚪 Sair da Conta
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});