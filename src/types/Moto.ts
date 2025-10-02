export type MotoStatus = 'alugada' | 'parada' | 'quebrada' | 'disponível';

export interface Moto {
  id: string;
  placa: string;
  status: MotoStatus;
  motivo: string;
  imagem?: string; 
}