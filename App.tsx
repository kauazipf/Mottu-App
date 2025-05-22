import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';

import { HomeScreen } from './src/screens/HomeScreen';
import { MotoDetailScreen } from './src/screens/MotoDetailScreen';
import { MotoFormScreen } from './src/screens/MotoFormScreen';
import { MotoListScreen } from './src/screens/MotoListScreen';

import { ThemeProvider } from './src/contexts/ThemeContext';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="inicio">

          <Drawer.Screen
            name="inicio"
            component={HomeScreen}
            options={{ drawerLabel: 'Início', title: 'Início'
             }}
          />

          <Drawer.Screen
            name="listademotos"
            component={MotoListScreen}
            options={{ drawerLabel: 'Lista de Motos', title: 'Lista de Motos' }}
          />

          <Drawer.Screen
            name="cadastrarmotos"
            component={MotoFormScreen}
            options={{ drawerLabel: 'Cadastrar Motos', title: 'Cadastro de Motos' }}
          />

          <Drawer.Screen
            name="detalhesdasmotos"
            component={MotoDetailScreen}
            options={{ drawerItemStyle: { display: 'none' }, title: 'Detalhes das Motos' }}
          />

        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
