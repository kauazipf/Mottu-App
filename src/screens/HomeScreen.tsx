import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBarChart } from '../components/StatusBarChart';
import { StatusPieChart } from '../components/StatusPieChart';
import { useTheme } from '../contexts/ThemeContext';
import { buscarMotos } from '../services/motoService'; 
import { Moto } from '../types/Moto';
import { RootDrawerParamList } from '../types/NavigationTypes';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ProtectedRoute } from './../components/ProtectedRoutes'; 
type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export function HomeScreen() {
  const { colors, toggleTheme } = useTheme();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  // Carrega motos ao focar a tela
  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        setIsLoading(true);
        try {
          const data = await buscarMotos();
          setMotos(data);
        } catch (error) {
          console.error('Erro ao carregar motos:', error);
          Alert.alert(
            '❌ Erro de conexão',
            'Não foi possível carregar os dados. Verifique sua internet.'
          );
        } finally {
          setIsLoading(false);
        }
      };
      carregarMotos();
    }, [])
  );

  // Contagem por status
  const contagemPorStatus = {
    alugada: motos.filter((m) => m.status === 'alugada').length,
    parada: motos.filter((m) => m.status === 'parada').length,
    quebrada: motos.filter((m) => m.status === 'quebrada').length,
    disponível: motos.filter((m) => m.status === 'disponível').length,
  };

  const prejuizo = (contagemPorStatus.parada + contagemPorStatus.quebrada) * 50;

  const statusCards = [
    { label: 'Alugada', key: 'alugada', color: '#028220FF' },
    { label: 'Parada', key: 'parada', color: '#FFA726' },
    { label: 'Quebrada', key: 'quebrada', color: '#FF5252' },
    { label: 'Disponível', key: 'disponível', color: '#2196F3' },
  ];

  // Se estiver carregando, mostra loading centralizado
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Carregando dados do pátio...
        </Text>
      </View>
    );
  }

  return (
    <ProtectedRoute> {/* ⭐ Protege a tela: só acessa se estiver logado */}
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: insets.bottom + 16,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.primary }]}>
          📊 Painel do Pátio
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Resumo visual da frota de motos cadastradas.
        </Text>

        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeToggle, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.themeToggleText, { color: colors.text }]}>
            🌗 Alternar Tema
          </Text>
        </TouchableOpacity>

        <View style={[styles.graphWrapper, { backgroundColor: colors.card }]}>
          <StatusPieChart motos={motos} />
        </View>

        <View style={[styles.graphWrapper, { backgroundColor: colors.card }]}>
          <StatusBarChart motos={motos} />
        </View>

        <View style={styles.cardContainer}>
          {statusCards.map(({ label, key, color }) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.card,
                {
                  borderLeftColor: color,
                  backgroundColor: colors.card,
                },
              ]}
              onPress={() =>
                navigation.navigate('listademotos', { status: key })
              }
            >
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                {label}
              </Text>
              <Text style={[styles.cardValue, { color }]}>
                {contagemPorStatus[key as keyof typeof contagemPorStatus]}
              </Text>
              {['parada', 'quebrada'].includes(key) && (
                <Text style={styles.cardPrejuizo}>
                  💸 R${' '}
                  {(
                    contagemPorStatus[key as keyof typeof contagemPorStatus] * 50
                  ).toFixed(2)}{' '}
                  por dia
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.totalInfo, { color: colors.text }]}>
          Total de motos: {motos.length}
        </Text>
        <Text style={styles.totalPrejuizo}>
          💸 Prejuízo diário total: R$ {prejuizo.toFixed(2)}
        </Text>
      </ScrollView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  graphWrapper: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  cardContainer: { marginTop: 10 },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 6,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardValue: { fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  cardPrejuizo: { marginTop: 6, color: '#FF5252', fontSize: 13 },
  totalInfo: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  totalPrejuizo: {
    marginTop: 4,
    fontSize: 16,
    textAlign: 'center',
    color: '#FF5252',
  },
  themeToggle: {
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
});