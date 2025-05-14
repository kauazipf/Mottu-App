import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { buscarMotos } from '../services/storageService';
import { Moto } from '../types/Moto';
import { StatusPieChart } from '../components/StatusPieChart';

export function HomeScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    const carregar = async () => {
      const data = await buscarMotos();
      setMotos(data);
    };
    carregar();
  }, []);

  const total = motos.length;
  const alugadas = motos.filter(m => m.status === 'alugada').length;
  const paradas = motos.filter(m => m.status === 'parada').length;
  const quebradas = motos.filter(m => m.status === 'quebrada').length;
  const disponiveis = motos.filter(m => m.status === 'disponível').length;
  const prejuizo = (paradas + quebradas) * 50;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Gestão de Pátio - Mottu</Text>
      <Text style={styles.text}>
        Veja abaixo um panorama geral das motos cadastradas no sistema.
      </Text>

      {motos.length > 0 ? (
        <>
          <StatusPieChart motos={motos} />

          <View style={styles.box}>
            <Text style={styles.metric}>Total de motos: <Text style={styles.value}>{total}</Text></Text>
            <Text style={styles.metric}>Alugadas: <Text style={styles.value}>{alugadas}</Text></Text>
            <Text style={styles.metric}>Disponíveis: <Text style={styles.value}>{disponiveis}</Text></Text>
            <Text style={styles.metric}>Paradas: <Text style={styles.value}>{paradas}</Text></Text>
            <Text style={styles.metric}>Quebradas: <Text style={styles.value}>{quebradas}</Text></Text>
            <Text style={styles.prejuizo}>💸 Prejuízo diário: R$ {prejuizo.toFixed(2)}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.empty}>Nenhuma moto cadastrada ainda.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F6FC', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#028220FF', marginBottom: 10 },
  text: { fontSize: 16, color: '#1F1F1F', marginBottom: 20 },
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    marginTop: 20,
  },
  metric: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  value: {
    fontWeight: 'bold',
    color: '#028220FF',
  },
  prejuizo: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5252',
  },
  empty: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
});
