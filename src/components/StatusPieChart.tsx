import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Moto } from '../types/Moto';

interface Props {
  motos: Moto[];
}

export const StatusPieChart: React.FC<Props> = ({ motos }) => {
  const screenWidth = Dimensions.get('window').width;

  const statusCount = {
    alugada: motos.filter(m => m.status === 'alugada').length,
    parada: motos.filter(m => m.status === 'parada').length,
    quebrada: motos.filter(m => m.status === 'quebrada').length,
    disponível: motos.filter(m => m.status === 'disponível').length,
  };

  const data = [
    {
      name: 'Alugada',
      count: statusCount.alugada,
      color: '#028220FF',
      legendFontColor: '#333',
      legendFontSize: 13,
    },
    {
      name: 'Parada',
      count: statusCount.parada,
      color: '#FFA726',
      legendFontColor: '#333',
      legendFontSize: 13,
    },
    {
      name: 'Quebrada',
      count: statusCount.quebrada,
      color: '#FF5252',
      legendFontColor: '#333',
      legendFontSize: 13,
    },
    {
      name: 'Disponível',
      count: statusCount.disponível,
      color: '#2196F3',
      legendFontColor: '#333',
      legendFontSize: 13,
    },
  ];

  return (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>
        Distribuição por status:
      </Text>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={180}
        chartConfig={{
          color: () => `#000`,
          labelColor: () => '#333',
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute
      />
    </View>
  );
};
