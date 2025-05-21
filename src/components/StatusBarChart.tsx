import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Moto } from '../types/Moto';

interface Props {
  motos: Moto[];
}

export const StatusBarChart: React.FC<Props> = ({ motos }) => {
  const status = ['alugada', 'parada', 'quebrada', 'disponível'] as const;

  const cores = {
    alugada: '#028220FF',
    parada: '#FFA726',
    quebrada: '#FF5252',
    disponível: '#2196F3',
  };

  const contagem = status.map(key => ({
    status: key,
    total: motos.filter(m => m.status === key).length,
  }));

  const max = Math.max(...contagem.map(c => c.total), 1); 

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        📊 Gráfico de Barras por Status
      </Text>
      <View style={styles.grafico}>
        {contagem.map(({ status, total }) => {
          const altura = (total / max) * 150;
          return (
            <View key={status} style={styles.coluna}>
              <View style={[styles.barra, { height: altura, backgroundColor: cores[status] }]} />
              <Text style={styles.valor}>{total}</Text>
              <Text style={styles.legenda}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#fff', borderRadius: 12, marginVertical: 16 },
  titulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  grafico: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 200 },
  coluna: { alignItems: 'center' },
  barra: {
    width: 30,
    borderRadius: 4,
  },
  valor: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
  legenda: {
    fontSize: 12,
    marginTop: 4,
    color: '#444',
  },
});
