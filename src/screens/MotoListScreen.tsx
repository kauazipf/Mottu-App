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
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../types/NavigationTypes';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next'; // 👈 Importa o i18n

type NavigationProp = DrawerNavigationProp<RootDrawerParamList, 'listademotos'>;
type RouteParams = RouteProp<RootDrawerParamList, 'listademotos'>;

export function MotoListScreen() {
  const { t } = useTranslation(); // 👈 Hook de tradução
  const [motos, setMotos] = useState<Moto[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const filtroStatus = route.params?.status;
  const { colors } = useTheme();

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
        return { color: colors.text };
    }
  }

  function translateStatus(status: string) {
    switch (status) {
      case 'quebrada':
        return t('motoList.broken');
      case 'parada':
        return t('motoList.stopped');
      case 'disponível':
        return t('motoList.available');
      case 'alugada':
        return t('motoList.rented');
      default:
        return status;
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        🏍️ {t('motoList.title')}
      </Text>

      {motos.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>
          {t('motoList.empty')}
        </Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('detalhesdasmotos', { moto: item })}
            >
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                {item.imagem && (
                  <Image source={{ uri: item.imagem }} style={styles.imagem} />
                )}
                <View style={styles.info}>
                  <Text style={[styles.placa, { color: colors.text }]}>{item.placa}</Text>
                  <Text style={[styles.status, { color: colors.text }]}>
                    {t('motoList.status')}{' '}
                    <Text style={[styles.statusValue, getStatusColor(item.status)]}>
                      {translateStatus(item.status)}
                    </Text>
                  </Text>
                  {item.motivo && (
                    <Text style={styles.motivo}>
                      {t('motoList.reason')}: {item.motivo}
                    </Text>
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
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
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
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
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
