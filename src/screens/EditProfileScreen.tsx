// src/screens/EditProfileScreen.tsx
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

export default function EditProfileScreen() {
  const { user, updateUser } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Extrai nome do e-mail (ex: usuario@exemplo.com → "usuario")
  const initialName = user?.email ? user.email.split('@')[0] : '';
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('⚠️ Atenção', 'O nome não pode estar vazio.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('❌ Erro', 'E-mail inválido.');
      return;
    }

    setIsLoading(true);
    try {
      // Atualiza o usuário (simulação — você pode expandir o AuthContext depois)
      await updateUser({ email });
      Alert.alert('✅ Sucesso', 'Perfil atualizado com sucesso!');
      navigation.goBack(); // Volta para a tela de Perfil
    } catch (error) {
      Alert.alert('❌ Erro', 'Não foi possível salvar as alterações.');
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
          ✏️ Editar Perfil
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="Nome"
          placeholderTextColor={colors.text}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="E-mail"
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
              {
                backgroundColor: isLoading ? '#ccc' : colors.primary,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Salvar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.cancelButton, { borderColor: colors.text }]}
          >
            <Text style={[styles.cancelButtonText, { color: colors.text }]}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
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