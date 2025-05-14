import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moto } from '../types/Moto';

const STORAGE_KEY = '@mottu_motos';

export async function buscarMotos(): Promise<Moto[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function salvarMoto(novaMoto: Moto) {
  const atual = await buscarMotos();
  const atualizado = [...atual, novaMoto];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizado));
}

export async function atualizarMoto(motoEditada: Moto) {
  const atual = await buscarMotos();
  const atualizado = atual.map(m => (m.id === motoEditada.id ? motoEditada : m));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizado));
}

export async function excluirMoto(id: string) {
  const atual = await buscarMotos();
  const atualizado = atual.filter(m => m.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizado));
}
