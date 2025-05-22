import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { salvarMoto } from '../services/storageService';
import { MotoStatus } from '../types/Moto';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../contexts/ThemeContext';

function validarPlaca(placa: string): boolean {
  const regex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  return regex.test(placa.toUpperCase());
}

export function MotoFormScreen() {
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState<MotoStatus>('disponível');
  const [motivo, setMotivo] = useState('');
  const [imagem, setImagem] = useState<string | undefined>(undefined);
  const { colors } = useTheme();

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
      Alert.alert('Erro', 'A placa deve estar no formato ABC1D23.');
      return;
    }

    const novaMoto = {
      id: uuid.v4().toString(),
      placa: placa.toUpperCase(),
      status,
      motivo,
      imagem,
    };

    await salvarMoto(novaMoto);
    Alert.alert('Sucesso', 'Moto cadastrada!');
    setPlaca('');
    setStatus('disponível');
    setMotivo('');
    setImagem(undefined);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Cadastrar Moto 🛠️</Text>

      <TextInput
        placeholder="Placa da moto (ABC1D23)"
        value={placa}
        onChangeText={setPlaca}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholderTextColor={colors.text}
        autoCapitalize="characters"
        maxLength={7}
      />

      <Text style={[styles.label, { color: colors.text }]}>Status:</Text>
      <Picker
        selectedValue={status}
        onValueChange={(v) => setStatus(v as MotoStatus)}
        style={[styles.picker, { backgroundColor: colors.card, color: colors.text }]}
        dropdownIconColor={colors.text}
      >
        <Picker.Item label="Disponível" value="disponível" />
        <Picker.Item label="Alugada" value="alugada" />
        <Picker.Item label="Parada" value="parada" />
        <Picker.Item label="Quebrada" value="quebrada" />
      </Picker>

      <TextInput
        placeholder="Motivo (se necessário)"
        value={motivo}
        onChangeText={setMotivo}
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholderTextColor={colors.text}
      />

      {imagem && <Image source={{ uri: imagem }} style={styles.image} />}

      <Button title="Selecionar Imagem" onPress={pickImage} />
      <View style={{ marginTop: 20 }}>
        <Button title="Salvar Moto" onPress={handleSalvar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  picker: {
    borderRadius: 6,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
});
