import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Image } from 'react-native';
import { Moto, MotoStatus } from '../types/Moto';
import { atualizarMoto, excluirMoto } from '../services/storageService';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

type RouteParams = {
  params: { moto: Moto };
};

export function MotoDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const navigation = useNavigation();
  const [moto, setMoto] = useState<Moto>(route.params.moto);

  const handleEditar = async () => {
    await atualizarMoto(moto);
    Alert.alert('Sucesso', 'Moto atualizada!');
    navigation.goBack();
  };

  const handleExcluir = async () => {
    await excluirMoto(moto.id);
    Alert.alert('Excluída', 'A moto foi removida.');
    navigation.goBack();
  };

  const handleImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5 });
    if (!result.canceled && result.assets?.length > 0) {
      setMoto({ ...moto, imagem: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Moto 🛠️</Text>
      {moto.imagem && <Image source={{ uri: moto.imagem }} style={styles.imagem} />}
      <Button title="Alterar Imagem" onPress={handleImagem} />
      <Text style={styles.label}>Placa:</Text>
      <TextInput style={styles.input} value={moto.placa} onChangeText={(text) => setMoto({ ...moto, placa: text })} />
      <Text style={styles.label}>Status:</Text>
      <Picker selectedValue={moto.status} onValueChange={(value) => setMoto({ ...moto, status: value as MotoStatus })} style={styles.picker}>
        <Picker.Item label="Disponível" value="disponível" />
        <Picker.Item label="Alugada" value="alugada" />
        <Picker.Item label="Parada" value="parada" />
        <Picker.Item label="Quebrada" value="quebrada" />
      </Picker>
      <Text style={styles.label}>Motivo:</Text>
      <TextInput style={styles.input} value={moto.motivo || ''} onChangeText={(text) => setMoto({ ...moto, motivo: text })} />
      <View style={styles.buttons}>
        <Button title="Salvar Alterações" onPress={handleEditar} color="#028220FF" />
        <Button title="Excluir Moto" onPress={handleExcluir} color="#FF5252" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F6FC', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#028220FF', marginBottom: 16 },
  imagem: { width: '100%', height: 220, borderRadius: 10, marginBottom: 10 },
  label: { fontSize: 14, color: '#666', marginTop: 10 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6, marginTop: 4 },
  picker: { backgroundColor: '#fff', borderRadius: 6, marginTop: 4, marginBottom: 10 },
  buttons: { marginTop: 20, gap: 10 },
});
