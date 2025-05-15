import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moto } from '../types/Moto';

const STORAGE_KEY = '@mottu:motos';

export async function buscarMotos(): Promise<Moto[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function salvarMoto(novaMoto: Moto): Promise<void> {
  const atual = await buscarMotos();
  const atualizado = [...atual, novaMoto];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizado));
}

export async function atualizarMoto(motoAtualizada: Moto): Promise<void> {
  const motos = await buscarMotos();
  const atualizado = motos.map(m => m.id === motoAtualizada.id ? motoAtualizada : m);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizado));
}

export async function excluirMoto(id: string): Promise<void> {
  const motos = await buscarMotos();
  const atualizado = motos.filter(m => m.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizado));
}

export async function limparTudo(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
