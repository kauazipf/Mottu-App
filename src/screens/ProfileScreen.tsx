// src/screens/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Importado
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation(); // ✅ Hook adicionado
  const insets = useSafeAreaInsets();

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
            // Opcional: navegar para Login, mas o ProtectedRoute já cuida disso
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.content,
          {
            paddingBottom: insets.bottom + 24,
            paddingHorizontal: 20,
            paddingTop: 40,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.primary }]}>👤 Perfil</Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>Nome:</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user?.email.split('@')[0] || 'Usuário'}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>E-mail:</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user?.email || 'Não informado'}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>Status da Conta:</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            Ativo
          </Text>
        </View>

        {/* ✅ Botão de editar perfil — agora com navigation válido */}
        <TouchableOpacity
          onPress={() => navigation.navigate('editarperfil' as never)}
          style={[styles.editButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.editButtonText}>✏️ Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={[
            styles.logoutButton,
            { backgroundColor: '#FF5252', borderColor: colors.text },
          ]}
        >
          <Text style={[styles.logoutButtonText, { color: '#fff' }]}>
            🚪 Sair da Conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
  logoutButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});