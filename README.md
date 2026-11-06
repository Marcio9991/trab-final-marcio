# trab-final-marcio

App de receitas de café, feito para um trabalho escolar do ensino médio. O usuário cria uma conta, vê receitas separadas por método de preparo, avalia com notas de 1 a 5 estrelas, comenta e publica suas próprias receitas para outros usuários verem.

## Tecnologias

- React Native com Expo e expo-router (navegação em pilha)
- TypeScript
- Firebase Authentication e Firestore

## Arquitetura

O projeto fica na pasta `app-receitas`, organizado assim:

- `app/` — rotas do expo-router e a pilha de telas. Cada arquivo só direciona para uma tela em `src/telas`.
- `src/telas/` — as telas, uma por função.
- `src/componentes/` — componentes reutilizáveis: botão, cartão, campo de texto, carregando e aviso.
- `src/hooks/` — hook `useConsulta`, que busca os dados ao abrir ou voltar para a tela.
- `src/contextos/` — contexto com o usuário logado.
- `src/services/` — conexão com o Firebase e uma classe por operação.
- `src/types/` — os tipos/tabelas do domínio.
- `src/utils/` — tema de cores, métodos de preparo, alertas e funções auxiliares.

A explicação completa das camadas e dos padrões está em `documentacao/arquitetura.md`.

## Telas

- Entrar e Criar conta — login e cadastro com e-mail e senha
- Métodos de preparo — tela inicial, com acesso a nova receita e a sair
- Receitas do método — lista as receitas de um método
- Receita — ingredientes, modo de preparo, avaliar, comentários e excluir (só o autor)
- Avaliar — escolher a nota de 1 a 5 estrelas
- Comentários — ver e adicionar comentários
- Nova receita — formulário para publicar uma receita

## Serviços do Firebase

Cada operação fica em uma classe separada dentro de `src/services/`:

- `CadastrarUsuario`, `EntrarUsuario` e `SairUsuario` — autenticação
- `SalvarReceita` — publica uma receita
- `ConsultarReceitas` — busca todas, por método ou por id
- `AtualizarReceita` — altera os dados de uma receita (ainda sem tela)
- `ExcluirReceita` — remove uma receita
- `SalvarAvaliacao` — grava a nota de 1 a 5 (uma por usuário em cada receita)
- `SalvarComentario` — adiciona um comentário à receita

## Identidade visual

Três tons de marrom, definidos em `src/utils/tema.ts`: pastel para o fundo, médio para as áreas principais e escuro para o estado pressionado dos botões e cartões. Detalhes em `documentacao/interface.md`.

## Como rodar

1. Instalar as dependências dentro de `app-receitas`:
   `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar expo-splash-screen @react-native-async-storage/async-storage`
   e `npm install firebase`
2. No `package.json`, usar `"main": "expo-router/entry"`; no `app.json`, adicionar `"scheme"` dentro de `expo`.
3. No console do Firebase, ativar o login por E-mail/senha (Authentication) e publicar as regras de `firebase-cli/firestore.rules` (Firestore).
4. Rodar `npx expo start`.

## Documentação

Na pasta `documentacao/`: visão, requisitos, casos de uso, arquitetura e interface.

## O que já foi feito

- Cadastro, login e logout; só usuários logados acessam as telas do app
- Todas as telas ligadas ao Firestore: listar, ver, avaliar, comentar, publicar e excluir receitas
- Documentação preenchida

Ainda falta: tela para editar receita, ícones em `assets/` e recuperação de senha.
