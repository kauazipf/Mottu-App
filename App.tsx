import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';

import {
  View,              
  ActivityIndicator, 
  Text,              
} from 'react-native';

// Telas públicas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Telas protegidas
import {HomeScreen} from './src/screens/HomeScreen';          
import {MotoListScreen} from './src/screens/MotoListScreen';   
import {MotoFormScreen} from './src/screens/MotoFormScreen';   
import {MotoDetailScreen} from './src/screens/MotoDetailScreen'; 

// Contextos
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Navegadores
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Componente que decide qual navegação mostrar
function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 12, fontSize: 16, color: '#333' }}>Carregando...</Text>
      </View>
    );
  }

  // Se NÃO estiver logado → mostra Stack (Login/Register)
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  // Se estiver logado → mostra Drawer com todas as telas
  return (
    <Drawer.Navigator
      initialRouteName="inicio"
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen
        name="inicio"
        component={HomeScreen}
        options={{ drawerLabel: 'Início', title: 'Painel do Pátio' }}
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
        options={{ drawerItemStyle: { display: 'none' }, title: 'Detalhes da Moto' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}