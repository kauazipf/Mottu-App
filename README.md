# 🛵 Mottu - Pátio Inteligente

Aplicativo mobile desenvolvido em **React Native + Expo** para controle de motos em um pátio. Permite cadastro, visualização, edição, exclusão e análise visual do status das motos, com foco em reduzir prejuízos causados por motos paradas ou quebradas.

---

## 🚀 Funcionalidades

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
- ✅ Gráficos atualizados automaticamente:
  - Gráfico de **pizza** por status
  - Gráfico de **barras** com cores personalizadas
- ✅ Cards interativos com contagem de motos por status e prejuízo estimado
- ✅ Botão para **alternar entre modo claro e escuro**
- ✅ Atualização dos dados sempre que a tela recebe foco (sem precisar reiniciar o app)
- ✅ Navegação via menu hambúrguer com **reset automático de filtro**
- ✅ Armazenamento local persistente com **AsyncStorage**
- ✅ Interface moderna e responsiva com tema dinâmico

---

## 🧩 Telas disponíveis

| Tela               | Descrição |
|--------------------|-----------|
| **HomeScreen**     | Gráficos, cards de status, prejuízo estimado e troca de tema |
| **MotoFormScreen** | Cadastro de nova moto com formulário validado |
| **MotoListScreen** | Lista completa ou filtrada de motos com acesso aos detalhes |
| **MotoDetailScreen** | Edição, exclusão e duplicação de uma moto |

---

## 💻 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation (Drawer)](https://reactnavigation.org/)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [uuid](https://www.npmjs.com/package/react-native-uuid)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/mottu-patio.git
cd mottu-patio
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto:

```bash
npx expo start
```

> Use o app do Expo Go para escanear o QR code e testar no celular.

---

## 🧠 Observações Técnicas

- Os dados são persistidos com **AsyncStorage**, então ao reiniciar o app as motos cadastradas continuam salvas.
- A `MotoListScreen` detecta automaticamente se veio de um clique no card da Home ou do menu, ajustando os filtros.
- A tela de gráficos agora se atualiza automaticamente toda vez que é acessada.
- O botão de **alternar tema** muda o visual de todas as telas, inclusive texto, cartões e gráficos.

---

## 🎨 Protótipo no Figma

Você pode visualizar os mockups das telas geradas por IA no Figma:

👉 [Acessar protótipo no Figma]([https://www.figma.com/file/SEU-LINK-AQUI/Mottu-P%C3%A1tio-Inteligente-Mockup](https://www.figma.com/design/jcaofnnroEDitnYHUZA0T1/Protótipo-da-MonitoringMottu?node-id=0-1&p=f&m=draw))

---

## 👥 Autoria

- **Nome:** Caetano Matos Penafiel 
- **RM:** 557984
  
- **Nome:** Kauã Fermino Zipf
- **RM:** 558957
  
- **Nome:** Victor Egídio Lira 
- **RM:** 556653
  
- Projeto desenvolvido como parte do Challenge FIAP + Mottu 2025
