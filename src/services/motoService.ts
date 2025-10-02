import api from './apiService';
import { Moto, MotoStatus } from '../types/Moto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'motos_local';

// --- Funções de fallback local ---
const saveLocalMotos = async (motos: Moto[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(motos));
};

const loadLocalMotos = async (): Promise<Moto[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// --- Serviço híbrido (API + fallback) ---
export const buscarMotos = async (): Promise<Moto[]> => {
  try {
    const response = await api.get<{ id: string; placa: string; status: MotoStatus; motivo: string }[]>('/motos');
    const apiMotos = response.data.map(m => ({ ...m, imagem: undefined }));
    await saveLocalMotos(apiMotos); // Atualiza cache local
    return apiMotos;
  } catch (error) {
    console.warn('API indisponível. Usando dados locais.');
    return await loadLocalMotos();
  }
};

export const criarMoto = async (moto: Omit<Moto, 'id'>): Promise<Moto> => {
  const { imagem, ...dadosParaApi } = moto;
  try {
    const response = await api.post<{ id: string; placa: string; status: MotoStatus; motivo: string }>('/motos', dadosParaApi);
    const novaMoto = { ...response.data, imagem };
    const motos = await loadLocalMotos();
    motos.push(novaMoto);
    await saveLocalMotos(motos);
    return novaMoto;
  } catch (error) {
    console.warn('Falha ao criar na API. Salvando localmente.');
    const novaMoto = { ...moto, id: Date.now().toString() };
    const motos = await loadLocalMotos();
    motos.push(novaMoto);
    await saveLocalMotos(motos);
    return novaMoto;
  }
};

export const atualizarMoto = async (moto: Moto): Promise<Moto> => {
  const { imagem, ...dadosParaApi } = moto;
  try {
    await api.put(`/motos/${moto.id}`, dadosParaApi);
    const motos = await loadLocalMotos();
    const atualizadas = motos.map(m => m.id === moto.id ? moto : m);
    await saveLocalMotos(atualizadas);
    return moto;
  } catch (error) {
    console.warn('Falha ao atualizar na API. Atualizando localmente.');
    const motos = await loadLocalMotos();
    const atualizadas = motos.map(m => m.id === moto.id ? moto : m);
    await saveLocalMotos(atualizadas);
    return moto;
  }
};

export const deletarMoto = async (id: string): Promise<void> => {
  try {
    await api.delete(`/motos/${id}`);
    const motos = await loadLocalMotos();
    const filtradas = motos.filter(m => m.id !== id);
    await saveLocalMotos(filtradas);
  } catch (error) {
    console.warn('Falha ao deletar na API. Removendo localmente.');
    const motos = await loadLocalMotos();
    const filtradas = motos.filter(m => m.id !== id);
    await saveLocalMotos(filtradas);
  }
};