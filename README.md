# 🏍️ Mottu - Gestão de Pátio de Motos

Aplicativo mobile desenvolvido com React Native e TypeScript para facilitar o controle de motos alugadas, disponíveis, paradas e quebradas. Ideal para uso interno na gestão de pátios da Mottu.

---

## 📱 Funcionalidades

- ✅ Cadastro de motos com imagem, status e motivo
- ✅ Lista interativa com status colorido
- ✅ Edição, exclusão e duplicação de motos
- ✅ Dashboard inicial com gráficos e métricas
- ✅ Gráfico de pizza e barras com cores por status
- ✅ Prejuízo calculado automaticamente com base nas motos paradas/quebradas
- ✅ Armazenamento local via `AsyncStorage`
- ✅ Navegação via Drawer (menu lateral)
- ✅ Filtro automático por status ao clicar nos cards

---

## 📊 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

---

## 🚀 Como rodar o projeto

### Pré-requisitos:

- Node.js e npm instalados
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (ou emulador) ou dispositivo físico

### Passos:

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/mottu-patio-app.git

# Acesse a pasta do projeto
cd mottu-patio-app

# Instale as dependências
npm install

# Rode o app
npx expo start
