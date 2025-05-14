import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Moto } from '../types/Moto';
import { buscarMotos } from '../services/storageService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export function MotoListScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        const data = await buscarMotos();
        setMotos(data);
      };
      carregar();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏍️ Lista de Motos</Text>
      {motos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma moto cadastrada.</Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detalhes da Moto', { moto: item })}>
              <View style={styles.card}>
                {item.imagem && (
                  <Image source={{ uri: item.imagem }} style={styles.imagem} />
                )}
                <View style={styles.info}>
                  <Text style={styles.placa}>{item.placa}</Text>
                  <Text style={styles.status}>
                    Status:{' '}
                    <Text style={styles.statusValue}>
                      {item.status.toUpperCase()}
                    </Text>
                  </Text>
                  {item.motivo && (
                    <Text style={styles.motivo}>Motivo: {item.motivo}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#028220FF',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
  },
  placa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#444',
  },
  statusValue: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#028220FF',
  },
  motivo: {
    fontSize: 14,
    marginTop: 4,
    color: '#FF5252',
  },
});
