import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';

// importação das telas
import { HomeScreen } from './src/screens/HomeScreen';
import { MotoDetailScreen } from './src/screens/MotoDetailScreen';
import { MotoFormScreen } from './src/screens/MotoFormScreen';
import { MotoListScreen } from './src/screens/MotoListScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
        name="inicio" 
        component={HomeScreen} 
        options={{
        drawerLabel: "Início"
        }}/>

        <Drawer.Screen 
        name="listademotos" 
        component={MotoListScreen} 
        options={{
        drawerLabel: "Lista de Motos"
        }} />

        <Drawer.Screen 
        name="cadastrarmotos" 
        component={MotoFormScreen} 
        options={{
        drawerLabel: "Cadastrar Motos"
        }} />

        <Drawer.Screen 
        name="detalhesdasmotos" 
        component={MotoDetailScreen} 
        options={{ 
        drawerItemStyle: { display: 'none' },
        drawerLabel: "Detalhes das Motos"
        }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
