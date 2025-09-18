// src/services/motoService.ts
import { Moto } from '../types/Moto';
import api from './apiService';

export const buscarMotos = async (): Promise<Moto[]> => {
  const response = await api.get<Moto[]>('/motos');
  return response.data;
};

export const criarMoto = async (moto: Omit<Moto, 'id'>): Promise<Moto> => {
  const response = await api.post<Moto>('/motos', moto);
  return response.data;
};

export const atualizarMoto = async (moto: Moto): Promise<Moto> => {
  const response = await api.put<Moto>(`/motos/${moto.id}`, moto);
  return response.data;
};

export const deletarMoto = async (id: string): Promise<void> => {
  await api.delete(`/motos/${id}`);
};