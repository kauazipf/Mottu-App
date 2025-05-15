import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Moto } from '../types/Moto';
import { buscarMotos } from '../services/storageService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../types/NavigationTypes';
import { useRoute, RouteProp } from '@react-navigation/native';

type NavigationProp = DrawerNavigationProp<RootDrawerParamList, 'listademotos'>;
type RouteParams = RouteProp<RootDrawerParamList, 'listademotos'>;

export function MotoListScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const filtroStatus = route.params?.status;


  useFocusEffect(
    useCallback(() => {
        const carregar = async () => {
          const data = await buscarMotos();
          const filtradas = filtroStatus ? data.filter(m => m.status === filtroStatus) : data;
          setMotos(filtradas);
        };
        carregar();
      }, [filtroStatus])
  );


  function getStatusColor(status: string) {
    switch (status) {
      case 'quebrada':
        return { color: '#FF5252' };
      case 'parada':
        return { color: '#FFA726' };
      case 'disponível':
        return { color: '#2196F3' };
      case 'alugada':
        return { color: '#028220FF' };
      default:
        return { color: '#333' };
    }
  }

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
            <TouchableOpacity
              onPress={() => navigation.navigate('detalhesdasmotos', { moto: item })}
            >
              <View style={styles.card}>
                {item.imagem && (
                  <Image source={{ uri: item.imagem }} style={styles.imagem} />
                )}
                <View style={styles.info}>
                  <Text style={styles.placa}>{item.placa}</Text>
                  <Text style={styles.status}>
                    Status:{' '}
                    <Text style={[styles.statusValue, getStatusColor(item.status)]}>
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
  },
  motivo: {
    fontSize: 14,
    marginTop: 4,
    color: '#FF5252',
  },
});
