import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { salvarMoto } from '../services/storageService';
import { MotoStatus } from '../types/Moto';
import { Picker } from '@react-native-picker/picker';

export function MotoFormScreen() {
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState<MotoStatus>('disponível');
  const [motivo, setMotivo] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5 });
    if (!result.canceled && result.assets?.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleSalvar = async () => {
    const novaMoto = { id: uuid.v4().toString(), placa, status, motivo, imagem };
    await salvarMoto(novaMoto);
    Alert.alert('Sucesso', 'Moto cadastrada!');
    setPlaca(''); setStatus('disponível'); setMotivo(''); setImagem(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Moto 🛠️</Text>
      <TextInput placeholder="Placa da moto" value={placa} onChangeText={setPlaca} style={styles.input} />
      <Text style={styles.label}>Status:</Text>
      <Picker selectedValue={status} onValueChange={(v) => setStatus(v as MotoStatus)} style={styles.picker}>
        <Picker.Item label="Disponível" value="disponível" />
        <Picker.Item label="Alugada" value="alugada" />
        <Picker.Item label="Parada" value="parada" />
        <Picker.Item label="Quebrada" value="quebrada" />
      </Picker>
      <TextInput placeholder="Motivo (se parada/quebrada)" value={motivo} onChangeText={setMotivo} style={styles.input} />
      {imagem && <Image source={{ uri: imagem }} style={styles.image} />}
      <Button title="Selecionar Imagem" onPress={pickImage} />
      <View style={{ marginTop: 16 }}>
        <Button title="Salvar Moto" onPress={handleSalvar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#F2F6FC' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#028220FF', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 12, marginBottom: 10, borderRadius: 8 },
  picker: { backgroundColor: '#fff', borderRadius: 6, marginBottom: 10 },
  image: { width: '100%', height: 200, marginBottom: 12, borderRadius: 10 },
  label: { fontSize: 14, color: '#444', marginBottom: 4 },
});
