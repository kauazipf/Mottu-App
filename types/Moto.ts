export type MotoStatus = 'alugada' | 'parada' | 'disponível' | 'quebrada';

export interface Moto {
  id: string;
  placa: string;
  status: MotoStatus;
  motivo?: string;
}