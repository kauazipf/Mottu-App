import { Moto } from '../types/Moto';
import { PREJUIZO_POR_MOTO_DIA } from '../constants/config';

export const motos: Moto[] = [
  { id: '1', placa: 'ABC-1234', status: 'alugada' },
  { id: '2', placa: 'DEF-5678', status: 'parada', motivo: 'Sem demanda' },
  { id: '3', placa: 'GHI-9012', status: 'quebrada', motivo: 'Problema mecânico' },
  { id: '4', placa: 'JKL-3456', status: 'disponível' },
  { id: '5', placa: 'MNO-7890', status: 'parada', motivo: 'Sem motorista' },
];

export function calcularPerda(dados: Moto[]) {
  const inativas = dados.filter(m => m.status === 'parada' || m.status === 'quebrada');
  return inativas.length * PREJUIZO_POR_MOTO_DIA;
}
