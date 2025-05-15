import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { buscarMotos } from '../services/storageService';
import { Moto } from '../types/Moto';
import { StatusPieChart } from '../components/StatusPieChart';
import { StatusBarChart } from '../components/StatusBarChart';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../types/NavigationTypes';

type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export function HomeScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const carregar = async () => {
      const data = await buscarMotos();
      setMotos(data);
    };
    carregar();
  }, []);

  const contagemPorStatus = {
    alugada: motos.filter(m => m.status === 'alugada').length,
    parada: motos.filter(m => m.status === 'parada').length,
    quebrada: motos.filter(m => m.status === 'quebrada').length,
    disponível: motos.filter(m => m.status === 'disponível').length,
  };

  const prejuizo = (contagemPorStatus.parada + contagemPorStatus.quebrada) * 50;

  const statusCards = [
    { label: 'Alugada', key: 'alugada', color: '#028220FF' },
    { label: 'Parada', key: 'parada', color: '#FFA726' },
    { label: 'Quebrada', key: 'quebrada', color: '#FF5252' },
    { label: 'Disponível', key: 'disponível', color: '#2196F3' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Painel do Pátio</Text>
      <Text style={styles.subtitle}>Resumo visual da frota de motos cadastradas.</Text>

      <View style={styles.graphWrapper}>
        <StatusPieChart motos={motos} />
      </View>

      <View style={styles.graphWrapper}>
        <StatusBarChart motos={motos} />
      </View>

      <View style={styles.cardContainer}>
        {statusCards.map(({ label, key, color }) => (
          <TouchableOpacity
            key={key}
            style={[styles.card, { borderLeftColor: color }]}
            onPress={() => navigation.navigate('listademotos', { status: key })}
          >
            <Text style={styles.cardTitle}>{label}</Text>
            <Text style={[styles.cardValue, { color }]}>{contagemPorStatus[key as keyof typeof contagemPorStatus]}</Text>
            {['parada', 'quebrada'].includes(key) && (
              <Text style={styles.cardPrejuizo}>
                💸 R$ {(contagemPorStatus[key as keyof typeof contagemPorStatus] * 50).toFixed(2)} por dia
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.totalInfo}>Total de motos: {motos.length}</Text>
      <Text style={styles.totalPrejuizo}>💸 Prejuízo diário total: R$ {prejuizo.toFixed(2)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F6FC', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#028220FF' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20 },
  graphWrapper: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 16, elevation: 2 },
  cardContainer: { marginTop: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 6,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardValue: { fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  cardPrejuizo: { marginTop: 6, color: '#FF5252', fontSize: 13 },
  totalInfo: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  totalPrejuizo: {
    marginTop: 4,
    fontSize: 16,
    textAlign: 'center',
    color: '#FF5252',
  },
});
