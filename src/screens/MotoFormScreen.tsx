import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { MotoStatus } from '../types/Moto';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next'; // 👈 Importa o i18n

// Importe o serviço atualizado que chama a API
import { criarMoto } from '../services/motoService';
import { Moto } from '../types/Moto';

// Validação de placa
function validarPlaca(placa: string): boolean {
  const regex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  return regex.test(placa.toUpperCase());
}

export function MotoFormScreen() {
  const { t } = useTranslation(); // 👈 Hook de tradução
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState<MotoStatus>('disponível');
  const [motivo, setMotivo] = useState('');
  const [imagem, setImagem] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.canceled && result.assets?.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleSalvar = async () => {
    if (!validarPlaca(placa)) {
      Alert.alert('❌ ' + t('motoForm.invalidPlateTitle'), t('motoForm.invalidPlateMsg'));
      return;
    }

    setIsLoading(true);

    try {
      const novaMoto: Omit<Moto, 'id'> = {
        placa: placa.toUpperCase(),
        status,
        motivo,
        imagem,
      };

      await criarMoto(novaMoto);

      Alert.alert('✅ ' + t('motoForm.successTitle'), t('motoForm.successMsg'));

      setPlaca('');
      setStatus('disponível');
      setMotivo('');
      setImagem(undefined);

      navigation.navigate('listademotos' as never);
    } catch (error) {
      console.error('Erro ao salvar moto:', error);
      Alert.alert('❌ ' + t('motoForm.errorTitle'), t('motoForm.errorMsg'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        {t('motoForm.title')}
      </Text>

      <TextInput
        placeholder={t('motoForm.platePlaceholder')}
        value={placa}
        onChangeText={setPlaca}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholderTextColor={colors.text}
        autoCapitalize="characters"
        maxLength={7}
      />

      <Text style={[styles.label, { color: colors.text }]}>
        {t('motoForm.status')}
      </Text>
      <Picker
        selectedValue={status}
        onValueChange={(v) => setStatus(v as MotoStatus)}
        style={[styles.picker, { backgroundColor: colors.card, color: colors.text }]}
        dropdownIconColor={colors.text}
      >
        <Picker.Item label={t('motoForm.available')} value="disponível" />
        <Picker.Item label={t('motoForm.rented')} value="alugada" />
        <Picker.Item label={t('motoForm.stopped')} value="parada" />
        <Picker.Item label={t('motoForm.broken')} value="quebrada" />
      </Picker>

      <TextInput
        placeholder={t('motoForm.reasonPlaceholder')}
        value={motivo}
        onChangeText={setMotivo}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholderTextColor={colors.text}
      />

      {imagem && <Image source={{ uri: imagem }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📸 {t('motoForm.pickImage')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: isLoading ? '#ccc' : colors.primary }]}
        onPress={handleSalvar}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>✅ {t('motoForm.save')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600',
  },
  button: {
    padding: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
