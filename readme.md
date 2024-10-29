# 🌦️ Bry WeatherApp

## 🛠️ **Bibliotecas Utilizadas**

### **Bibliotecas Principais**

- **Expo**: Plataforma de desenvolvimento que facilita a criação e deploy de apps em React Native.
- **Expo Router**: Gerenciamento de navegação baseado em rotas.

### **Gerenciamento de Estado e Hooks**

- **Context API do React**: Gerencia o estado global (como a cidade buscada).
- **Hooks Customizados**: Encapsulam lógicas complexas, como busca e manipulação de localização.

### **Armazenamento e Rede**

- **AsyncStorage**: Armazena dados localmente.
- **Expo Location**: Acessa a localização do dispositivo.

### **CI/CD e Testes**

- **Expo EAS**: Serviço de construção e deploy na nuvem.
- **GitHub Actions**: Pipeline de CI/CD para automação de testes e builds.
- **Jest**: Testes unitários.
- **Maestro**: Testes end-to-end (E2E).

---

## 📦 **Instalação e Configuração**

### **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (v20.18.0 ou superior)
- **npm** ou **yarn** para gerenciamento de pacotes
- **Expo CLI**:

  ```bash
  npm install -g expo-cli
  ```

- **Maestro** (para testes E2E):

    [Instale conforme o seu sistema operacional](https://maestro.mobile.dev/getting-started/installing-maestro)


- **Android Studio** ou **Xcode** para emuladores (opcional).

---

## 🛠️ **Como Executar o Projeto**

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/weather-app.git
   cd weather-app
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Adicione sua chave de API do clima**:

   Crie um arquivo `.env` na raiz do projeto e adicione:

   ```
   cp .env.example .env
   EXPO_PUBLIC_API_KEY=sua-chave-de-api
   ```

4. **Execute o aplicativo no emulador ou dispositivo físico**:

   - Para Android:
     ```bash
     npm run android
     ```
   - Para iOS:
     ```bash
     npm run ios
     ```

5. **Execute os testes localmente**:

   - **Testes unitários** com Jest:

     ```bash
     npm test
     ```

   - **Testes E2E** com Maestro:
     Para rodar os testes E2E é necessário estar com o emulador aberto.
     ```bash
     maestro test maestro/basic-flow.yaml
     ```

6. **Execute o Build com EAS**:

   ```bash
   eas build --platform android --profile preview
   ```

---

## 🔄 **Executando o Pipeline de CI/CD**

O projeto inclui um workflow do **GitHub Actions** para automação de testes e builds.

1. **Adicione seu token do Expo** aos **secrets** do GitHub:

   - Vá para **Settings** > **Secrets and variables** > **Actions**.
   - Adicione um novo secret com a chave: `EXPO_TOKEN` e o valor do token do Expo.

2. **Execute o pipeline**:
   - Envie código para o branch `main` ou abra um **pull request** direcionado para `main`.
   - O pipeline irá automaticamente:
     1. Instalar dependências.
     2. Executar testes.
     3. Construir o app com EAS.

---

## 📱 **Screenshots**

Em breve!

---

=) ❤️
