import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next'; // 👈 Importação do i18n

export default function LoginScreen() {
  const { t } = useTranslation(); // 👈 Hook para usar traduções
  const { colors, toggleTheme } = useTheme();
  const { login, isLoading: authLoading } = useAuth();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('⚠️ ' + t('login.alertTitle'), t('login.emptyFields'));
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('❌ ' + t('login.errorTitle'), t('login.invalidEmail'));
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('❌ ' + t('login.errorTitle'), t('login.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: colors.primary }]}>🔐 {t('login.title')}</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            {t('login.subtitle')}
          </Text>

          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder={t('login.emailPlaceholder')}
            placeholderTextColor={colors.text}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder={t('login.passwordPlaceholder')}
            placeholderTextColor={colors.text}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading || authLoading}
            style={[
              styles.button,
              {
                backgroundColor:
                  isLoading || authLoading ? '#ccc' : colors.primary,
              },
            ]}
          >
            {isLoading || authLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t('login.button')}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register' as never)}
            style={styles.link}
          >
            <Text style={[styles.linkText, { color: colors.primary }]}>
              {t('login.noAccount')}
            </Text>
          </TouchableOpacity>

          {/* 🌗 Botão de alternar tema */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.themeButton,
              { backgroundColor: colors.card, borderColor: colors.text },
            ]}
          >
            <Text style={[styles.themeButtonText, { color: colors.text }]}>
              🌗 {t('login.toggleTheme')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  formContainer: {
    marginHorizontal: 32,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.9,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'left',
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  themeButton: {
    marginTop: 64,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
