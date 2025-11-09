import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next'; // 👈 i18n

import { Moto, MotoStatus } from '../types/Moto';
import {
  atualizarMoto,
  excluirMoto,
  salvarMoto,
} from '../services/storageService';
import { RootDrawerParamList } from '../types/NavigationTypes';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';

type RouteParams = RouteProp<RootDrawerParamList, 'detalhesdasmotos'>;
type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

function validarPlaca(placa: string): boolean {
  const regex = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;
  return regex.test(placa.toUpperCase());
}

export function MotoDetailScreen() {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation<NavigationProp>();
  const [moto, setMoto] = useState<Moto>(route.params.moto);
  const { colors } = useTheme();
  const { t } = useTranslation(); // 👈 hook de tradução

  const handleEditar = async () => {
    if (!validarPlaca(moto.placa)) {
      Alert.alert(t('motoDetail.error'), t('motoDetail.invalidPlate'));
      return;
    }

    await atualizarMoto(moto);
    Alert.alert(t('motoDetail.success'), t('motoDetail.updated'));
  };

  const handleEditarEVoltar = async () => {
    await atualizarMoto(moto);
    Alert.alert(t('motoDetail.success'), t('motoDetail.updated'));
    navigation.navigate('inicio');
  };

  const handleExcluir = async () => {
    await excluirMoto(moto.id);
    Alert.alert(t('motoDetail.deleted'), t('motoDetail.removed'));
    navigation.goBack();
  };

  const handleImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setMoto({ ...moto, imagem: result.assets[0].uri });
    }
  };

  const handleDuplicar = async () => {
    const novaMoto: Moto = {
      ...moto,
      id: uuid.v4().toString(),
      placa: moto.placa + '-copy',
    };
    await salvarMoto(novaMoto);
    Alert.alert(t('motoDetail.duplicated'), t('motoDetail.copied'));
    navigation.navigate('detalhesdasmotos', { moto: novaMoto });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        {t('motoDetail.title')}
      </Text>

      {moto.imagem && (
        <Image source={{ uri: moto.imagem }} style={styles.imagem} />
      )}

      <Button title={t('motoDetail.changeImage')} onPress={handleImagem} />

      <Text style={[styles.label, { color: colors.text }]}>{t('motoDetail.plate')}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        value={moto.placa}
        onChangeText={(text) => setMoto({ ...moto, placa: text })}
        placeholderTextColor={colors.text}
      />

      <Text style={[styles.label, { color: colors.text }]}>{t('motoDetail.status')}</Text>
      <Picker
        selectedValue={moto.status}
        onValueChange={(value) =>
          setMoto({ ...moto, status: value as MotoStatus })
        }
        style={[styles.picker, { backgroundColor: colors.card, color: colors.text }]}
        dropdownIconColor={colors.text}
      >
        <Picker.Item label={t('motoDetail.available')} value="disponível" />
        <Picker.Item label={t('motoDetail.rented')} value="alugada" />
        <Picker.Item label={t('motoDetail.stopped')} value="parada" />
        <Picker.Item label={t('motoDetail.broken')} value="quebrada" />
      </Picker>

      <Text style={[styles.label, { color: colors.text }]}>{t('motoDetail.reason')}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        value={moto.motivo || ''}
        onChangeText={(text) => setMoto({ ...moto, motivo: text })}
        placeholderTextColor={colors.text}
      />

      <View style={styles.buttons}>
        <Button title={t('motoDetail.saveChanges')} onPress={handleEditar} color={colors.primary} />
        <View style={{ marginTop: 10 }} />
        <Button title={t('motoDetail.saveAndReturn')} onPress={handleEditarEVoltar} color={colors.primary} />
        <View style={{ marginTop: 10 }} />
        <Button title={t('motoDetail.duplicate')} onPress={handleDuplicar} color="#2196F3" />
        <View style={{ marginTop: 10 }} />
        <Button title={t('motoDetail.delete')} onPress={handleExcluir} color="#FF5252" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  imagem: { width: '100%', height: 220, borderRadius: 10, marginBottom: 10 },
  label: { fontSize: 14, marginTop: 10 },
  input: {
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  picker: {
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 10,
  },
  buttons: {
    marginTop: 20,
  },
});
