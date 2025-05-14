import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Gestão de Pátio - Mottu</Text>
      <Text style={styles.text}>
        Este app ajuda a controlar e visualizar o status das motos no pátio, identificando prejuízos com motos paradas ou quebradas.
      </Text>
      <Text style={styles.text}>
        Use o menu lateral para ver o gráfico de status ou a lista completa das motos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F6FC', padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#028220FF', marginBottom: 20 },
  text: { fontSize: 16, color: '#1F1F1F', lineHeight: 24, marginBottom: 12 },
});
