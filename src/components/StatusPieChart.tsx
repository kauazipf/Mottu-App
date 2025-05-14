import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Moto } from '../types/Moto';

const screenWidth = Dimensions.get('window').width;

interface Props {
  motos: Moto[];
}

export function StatusPieChart({ motos }: Props) {
  const data = [
    {
      name: 'Alugada',
      count: motos.filter(m => m.status === 'alugada').length,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Disponível',
      count: motos.filter(m => m.status === 'disponível').length,
      color: '#2196F3',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Parada',
      count: motos.filter(m => m.status === 'parada').length,
      color: '#FFC107',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Quebrada',
      count: motos.filter(m => m.status === 'quebrada').length,
      color: '#F44336',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ].filter(item => item.count > 0);

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Distribuição de Status</Text>
      <PieChart
        data={data.map(item => ({
          ...item,
          population: item.count,
        }))}
        width={screenWidth - 40}
        height={180}
        chartConfig={{
          color: () => `#000`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}
