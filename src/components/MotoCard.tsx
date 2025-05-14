import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Moto } from '../types/Moto';

export function MotoCard({ moto }: { moto: Moto }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{moto.placa}</Text>
      <Text>Status: {moto.status}</Text>
      {moto.motivo && <Text>Motivo: {moto.motivo}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
  },
});