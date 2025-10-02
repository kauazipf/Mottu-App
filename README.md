# 🛵 Mottu - Pátio Inteligente

Aplicativo mobile desenvolvido em **React Native + Expo** para controle de motos em um pátio. Permite cadastro, visualização, edição, exclusão e análise visual do status das motos, com foco em reduzir prejuízos causados por motos paradas ou quebradas.

---

## 🚀 Funcionalidades

### 🏍️ Gestão de Motos
- ✅ Cadastro de motos com:
  - Placa no formato `ABC1D23` com validação automática
  - Status: `alugada`, `parada`, `quebrada`, `disponível`
  - Motivo (quando aplicável)
  - Upload de imagem da moto via galeria
- ✅ Edição completa da moto com troca de status, imagem, motivo e placa
- ✅ Exclusão e duplicação de motos cadastradas
- ✅ Lista de motos com:
  - Imagem da moto
  - Placa
  - Status com **cores indicativas**
  - Filtro automático ao retornar da Home

### 📊 Dashboard Inteligente (HomeScreen)
- ✅ Gráficos atualizados automaticamente:
  - Gráfico de **pizza** por status
  - Gráfico de **barras** com cores personalizadas
- ✅ Cards interativos com contagem de motos por status e **prejuízo estimado** (R$ 50/dia por moto parada/quebrada)

### 🔐 Sistema de Autenticação
- ✅ Tela de **Login** com validação de e-mail e senha
- ✅ Tela de **Cadastro** com nome, e-mail e senha (mín. 6 caracteres)
- ✅ Tela de **Perfil** com informações do usuário e botão de logout
- ✅ Tela de **Edição de Perfil** para atualizar dados
- ✅ **Logout funcional** com confirmação e redirecionamento seguro
- ✅ **Proteção de rotas**: telas de gestão só acessíveis após login

### 🌐 Integração com API
- ✅ **Sincronização em tempo real** com API .NET para todas as operações (CRUD)
- ✅ **Fallback automático para armazenamento local** caso a API esteja indisponível
- ✅ Feedback visual ao usuário quando a API falha (usa dados locais)

### 🎨 Experiência do Usuário
- ✅ Botão para **alternar entre modo claro e escuro** (em todas as telas)
- ✅ Atualização dos dados sempre que a tela recebe foco (sem precisar reiniciar o app)
- ✅ Navegação via menu hambúrguer com **reset automático de filtro**
- ✅ Interface moderna, responsiva e com **safe area insets** (não gruda na barra de navegação)
- ✅ Indicadores de carregamento e mensagens de erro amigáveis

### 💾 Persistência e Arquitetura
- ✅ **API .NET como fonte principal de dados**
- ✅ **AsyncStorage como fallback** para modo offline
- ✅ Estrutura de código limpa com **TypeScript**, **Context API** e separação de responsabilidades
- ✅ Código organizado em pastas lógicas: `screens`, `components`, `services`, `contexts`, `types`

---

## 🧩 Link da API
👉 https://github.com/Caepena/Sprint3_MonitoringMottu_.NET

---

## 🧩 Telas disponíveis

| Tela                   | Descrição |
|------------------------|-----------|
| **LoginScreen**        | Autenticação de usuário com e-mail e senha |
| **RegisterScreen**     | Cadastro de nova conta |
| **HomeScreen**         | Gráficos, cards de status, prejuízo estimado e troca de tema |
| **MotoFormScreen**     | Cadastro de nova moto com formulário validado |
| **MotoListScreen**     | Lista completa ou filtrada de motos com acesso aos detalhes |
| **MotoDetailScreen**   | Edição, exclusão e duplicação de uma moto |
| **ProfileScreen**      | Visualização das informações do usuário e logout |
| **EditProfileScreen**  | Edição das informações do perfil |

---

## 💻 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation (Drawer + Stack)](https://reactnavigation.org/)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/) (fallback offline)
- [axios](https://axios-http.com/) (comunicação com API)
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [uuid](https://www.npmjs.com/package/react-native-uuid)
- [TypeScript](https://www.typescriptlang.org/)
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/secure-store/) (para dados de autenticação)

---

## 📦 Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/kauazipf/mottu-app.git
cd mottu-app
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o IP da API (substitua pelo IP da sua máquina):

```// src/services/apiService.ts
const API_BASE_URL = 'http://SEU_IP_LOCAL:5000/api';
```

4. Rode o projeto:

```bash
npx expo start
```

> Use o app do Expo Go para escanear o QR code e testar no celular.

---

## 🧠 Observações Técnicas

- O app se conecta à API .NET em http://SEU_IP_LOCAL:5000/api para sincronizar dados de motos.
- Se a API estiver indisponível, os dados são salvos e carregados localmente com AsyncStorage, garantindo funcionalidade offline.
- Os dados de autenticação são armazenados com SecureStore para maior segurança.
- A `MotoListScreen` detecta automaticamente se veio de um clique no card da Home ou do menu, ajustando os filtros.
- A tela de gráficos agora se atualiza automaticamente toda vez que é acessada.
- O botão de **alternar tema** muda o visual de todas as telas, inclusive texto, cartões e gráficos.

---

## 🎨 Protótipo no Figma

Você pode visualizar os mockups das telas geradas por IA no Figma:

👉 [Acessar protótipo no Figma]([[https://www.figma.com/file/SEU-LINK-AQUI/Mottu-P%C3%A1tio-Inteligente-Mockup](https://www.figma.com/design/jcaofnnroEDitnYHUZA0T1/Protótipo-da-MonitoringMottu?node-id=0-1&p=f&m=draw)](https://www.figma.com/design/jcaofnnroEDitnYHUZA0T1/Protótipo-da-MonitoringMottu?node-id=0-1&p=f&m=draw))

---

## 👥 Autoria

- **Nome:** Caetano Matos Penafiel 
- **RM:** 557984
  
- **Nome:** Kauã Fermino Zipf
- **RM:** 558957
  
- **Nome:** Victor Egídio Lira 
- **RM:** 556653
  
- Projeto desenvolvido como parte do Challenge FIAP + Mottu 2025
