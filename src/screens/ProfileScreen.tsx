import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next'; // 👈 i18n importado

export default function ProfileScreen() {
  const { t } = useTranslation(); // 👈 Hook do i18n
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert(
      t('profile.logoutTitle'),
      t('profile.logoutMessage'),
      [
        { text: t('profile.cancel'), style: 'cancel' },
        {
          text: t('profile.confirmLogout'),
          style: 'destructive',
          onPress: async () => {
            await logout();
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
        <Text style={[styles.title, { color: colors.primary }]}>
          👤 {t('profile.title')}
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>
            {t('profile.name')}:
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user?.email.split('@')[0] || t('profile.defaultUser')}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>
            {t('profile.email')}:
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {user?.email || t('profile.noEmail')}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.label, { color: colors.text }]}>
            {t('profile.accountStatus')}:
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {t('profile.active')}
          </Text>
        </View>

        {/* Botão de editar perfil */}
        <TouchableOpacity
          onPress={() => navigation.navigate('editarperfil' as never)}
          style={[styles.editButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.editButtonText}>✏️ {t('profile.editProfile')}</Text>
        </TouchableOpacity>

        {/* Botão de sair */}
        <TouchableOpacity
          onPress={handleLogout}
          style={[
            styles.logoutButton,
            { backgroundColor: '#FF5252', borderColor: colors.text },
          ]}
        >
          <Text style={[styles.logoutButtonText, { color: '#fff' }]}>
            🚪 {t('profile.logout')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
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
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  value: { fontSize: 16, marginBottom: 12 },
  logoutButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2,
  },
  logoutButtonText: { fontSize: 16, fontWeight: 'bold' },
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
