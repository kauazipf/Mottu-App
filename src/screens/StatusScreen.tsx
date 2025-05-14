import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Moto } from '../types/Moto';
import { buscarMotos } from '../services/storageService';
import { StatusPieChart } from '../components/StatusPieChart';

export function StatusScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const PERDA_DIARIA = 50;

  useEffect(() => {
    const carregar = async () => {
      const data = await buscarMotos();
      setMotos(data);
    };
    carregar();
  }, []);

  const prejuizo = motos.filter(
    (m) => m.status === 'parada' || m.status === 'quebrada'
  ).length * PERDA_DIARIA;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Status das Motos</Text>

      {motos.length === 0 ? (
        <Text style={styles.empty}>Nenhuma moto cadastrada.</Text>
      ) : (
        <>
          <StatusPieChart motos={motos} />

          <View style={styles.box}>
            <Text style={styles.label}>Prejuízo diário estimado</Text>
            <Text style={styles.valor}> - R$ {prejuizo}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F2F6FC', flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#028220FF', marginBottom: 20 },
  box: { backgroundColor: '#fff', padding: 16, marginTop: 20, borderRadius: 10, elevation: 3 },
  label: { fontSize: 14, color: '#666' },
  valor: { fontSize: 20, color: '#FF5252', fontWeight: 'bold', marginTop: 6 },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
});
