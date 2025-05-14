import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusPieChart } from '../components/StatusPieChart';
import { calcularPerda, motos } from '../services/motoService';

export function HomeScreen() {
    const total = motos.length;
    const alugada = motos.filter(m => m.status === 'alugada').length;
    const parada = motos.filter(m => m.status === 'parada').length;
    const quebrada = motos.filter(m => m.status === 'quebrada').length;
    const disponivel = motos.filter(m => m.status === 'disponível').length;
    const perda = calcularPerda(motos);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestão de Pátio - Mottu</Text>
            <Text>Total de motos: {total}</Text>
            <Text>Alugadas: {alugada}</Text>
            <Text>Disponíveis: {disponivel}</Text>
            <Text>Paradas: {parada}</Text>
            <Text>Quebradas: {quebrada}</Text>
            <Text style={styles.perda}>Prejuízo estimado: R$ {perda.toFixed(2)}</Text>

            <View style={{ marginVertical: 20 }}>
                <StatusPieChart motos={motos} />
            </View>

            <Text style={styles.subtitle}>Lista de motos:</Text>
            <FlatList
                data={motos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text>{item.placa} - {item.status.toUpperCase()} {item.motivo ? `(${item.motivo})` : ''}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { marginTop: 20, fontWeight: 'bold' },
    perda: { marginTop: 10, color: 'red', fontWeight: 'bold' },
});