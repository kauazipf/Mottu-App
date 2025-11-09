import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

import { View, ActivityIndicator, Text } from 'react-native';

import './src/i18n';

// Telas públicas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Telas protegidas
import { HomeScreen } from './src/screens/HomeScreen';
import { MotoListScreen } from './src/screens/MotoListScreen';
import { MotoFormScreen } from './src/screens/MotoFormScreen';
import { MotoDetailScreen } from './src/screens/MotoDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

// Componentes
import { LogoutButton } from './src/components/LogoutButtom';

// Contextos
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Serviços
import api from './src/services/apiService';
import { registerForPushNotificationsAsync } from './src/services/pushNotifications';

// Navegação
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Custom Drawer
function CustomDrawerContent(props: any) {
  const { colors } = useTheme();
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.background }}
    >
      <DrawerItemList
        {...props}
        labelStyle={{ color: colors.text, fontWeight: '500' }}
      />
      <LogoutButton />
    </DrawerContentScrollView>
  );
}

// Decide qual rota mostrar (login ou app)
function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 12, fontSize: 16, color: '#333' }}>
          Carregando sessão...
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="inicio"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveBackgroundColor: '#e0f2ff',
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#555',
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
        name="perfil"
        component={ProfileScreen}
        options={{ drawerLabel: 'Perfil', title: 'Perfil do Usuário' }}
      />
      <Drawer.Screen
        name="detalhesdasmotos"
        component={MotoDetailScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Detalhes da Moto' }}
      />
      <Drawer.Screen
        name="editarperfil"
        component={EditProfileScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Perfil' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  // ✅ Adicionando o useEffect aqui para registrar as notificações
  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        try {
          await api.post('/users/push-token', { token });
          console.log('Token enviado ao backend:', token);
        } catch (error) {
          console.log('Erro ao enviar token:', error);
        }
      }
    });

    // Listener para notificações recebidas enquanto o app está aberto
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('📩 Notificação recebida em primeiro plano:', notification);
    });

    return () => subscription.remove();
  }, []);

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
