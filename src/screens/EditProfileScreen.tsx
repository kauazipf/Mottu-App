import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next'; // 👈 importação do i18n

export default function EditProfileScreen() {
  const { t } = useTranslation(); // 👈 hook para usar traduções
  const { user, updateUser } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const initialName = user?.email ? user.email.split('@')[0] : '';
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('⚠️ ' + t('editProfile.alertTitle'), t('editProfile.emptyName'));
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('❌ ' + t('editProfile.errorTitle'), t('editProfile.invalidEmail'));
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({ email });
      Alert.alert('✅ ' + t('editProfile.successTitle'), t('editProfile.successMessage'));
      navigation.goBack();
    } catch (error) {
      Alert.alert('❌ ' + t('editProfile.errorTitle'), t('editProfile.saveError'));
    } finally {
      setIsLoading(false);
    }
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
          ✏️ {t('editProfile.title')}
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder={t('editProfile.namePlaceholder')}
          placeholderTextColor={colors.text}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder={t('editProfile.emailPlaceholder')}
          placeholderTextColor={colors.text}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSave}
            disabled={isLoading}
            style={[
              styles.saveButton,
              { backgroundColor: isLoading ? '#ccc' : colors.primary },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t('editProfile.saveButton')}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.cancelButton, { borderColor: colors.text }]}
          >
            <Text style={[styles.cancelButtonText, { color: colors.text }]}>
              {t('editProfile.cancelButton')}
            </Text>
          </TouchableOpacity>
        </View>
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
  input: {
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    elevation: 2,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
