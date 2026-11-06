# Requisitos

## Requisitos funcionais

| ID | Descrição | Prioridade | Situação |
|---|---|---|---|
| RF01 | O usuário se cadastra informando nome, e-mail e senha | Alta | Feito |
| RF02 | O usuário entra com e-mail e senha | Alta | Feito |
| RF03 | O usuário sai da conta | Alta | Feito |
| RF04 | A sessão continua ativa ao reabrir o aplicativo | Média | Feito |
| RF05 | O sistema lista os métodos de preparo | Alta | Feito |
| RF06 | O sistema lista as receitas de um método | Alta | Feito |
| RF07 | O sistema mostra a receita com ingredientes, modo de preparo e autor | Alta | Feito |
| RF08 | O usuário avalia a receita com nota de 1 a 5 estrelas; uma nova nota do mesmo usuário substitui a anterior | Alta | Feito |
| RF09 | O usuário comenta a receita | Alta | Feito |
| RF10 | O usuário publica uma receita para os outros verem | Alta | Feito |
| RF11 | O sistema mostra a média e a quantidade de avaliações de cada receita | Média | Feito |
| RF12 | O autor exclui a própria receita | Média | Feito |
| RF13 | O autor edita a própria receita | Baixa | Serviço pronto, sem tela |
| RF14 | O usuário recupera a senha por e-mail | Baixa | Não iniciado |

## Requisitos não funcionais

| ID | Descrição | Prioridade |
|---|---|---|
| RNF01 | O código é escrito em TypeScript | Alta |
| RNF02 | O aplicativo usa React Native com Expo e navegação em pilha (expo-router) | Alta |
| RNF03 | Os dados ficam no Firebase: Authentication para usuários e Firestore para receitas | Alta |
| RNF04 | Somente usuários logados acessam as telas do aplicativo | Alta |
| RNF05 | As regras do Firestore limitam quem pode ler, criar, alterar e excluir (arquivo `firebase-cli/firestore.rules`) | Alta |
| RNF06 | A senha tem no mínimo 6 caracteres (regra do Firebase Authentication) | Média |
| RNF07 | A interface usa três tons de marrom em todas as telas | Média |
| RNF08 | Erros de rede ou de permissão aparecem para o usuário em português | Média |
| RNF09 | Cada operação do Firestore fica em uma classe separada | Média |
