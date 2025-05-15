import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen } from './src/screens/HomeScreen';
import { MotoListScreen } from './src/screens/MotoListScreen';
import { MotoFormScreen } from './src/screens/MotoFormScreen';
import { MotoDetailScreen } from './src/screens/MotoDetailScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="inicio">
        
        <Drawer.Screen 
          name="inicio" 
          component={HomeScreen} 
          options={{ drawerLabel: 'Início' }} 
        />

        <Drawer.Screen 
          name="listademotos" 
          component={MotoListScreen} 
          options={{ drawerLabel: 'Lista de Motos' }} 
        />

        <Drawer.Screen 
          name="cadastrarmotos" 
          component={MotoFormScreen} 
          options={{ drawerLabel: 'Cadastrar Motos' }} 
        />

        <Drawer.Screen 
          name="detalhesdasmotos" 
          component={MotoDetailScreen} 
          options={{ drawerItemStyle: { display: 'none' } }} 
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
