# Arquitetura

Este documento descreve como o projeto está organizado e serve de guia para quem for mexer no código, inclusive com ajuda de IA: antes de criar algo novo, siga as camadas e os padrões abaixo.

## Visão geral

Aplicativo React Native (Expo) em TypeScript. O backend é o Firebase, sem servidor próprio: Authentication para usuários e Firestore para receitas. A navegação em pilha é feita pelo expo-router.

## Camadas e responsabilidades

| Camada | Pasta | Responsabilidade |
|---|---|---|
| Rotas | `app/` | Define as rotas e a pilha (`_layout.tsx`). Cada arquivo lê os parâmetros da rota e chama uma tela. Sem estilo nem regra de negócio. |
| Telas | `src/telas/` | Uma tela por função. Monta a interface, guarda o estado local e chama os serviços. |
| Componentes | `src/componentes/` | Peças visuais reutilizáveis que aplicam a paleta: `Botao`, `Cartao`, `CampoTexto`, `Carregando`, `Aviso`. |
| Hooks | `src/hooks/` | Lógica de React reutilizável. `useConsulta` busca dados ao abrir ou voltar para a tela e devolve `dados`, `carregando`, `erro` e `recarregar`. |
| Contextos | `src/contextos/` | Estado global. `ContextoAutenticacao` guarda o usuário logado. |
| Serviços | `src/services/` | Camada que fala com o Firebase. Uma classe por operação. |
| Tipos | `src/types/` | As tabelas do domínio: `Receita`, `Avaliacao`, `Comentario`, `Metodo`, `Autor`. |
| Utilitários | `src/utils/` | Constantes e funções soltas: `tema`, `metodos`, `alerta`, `mensagemErro`, `avaliacao`, `autor`. |

Sentido das dependências: rotas chamam telas; telas usam componentes, hooks, contextos, serviços e utilitários; todos podem usar os tipos. Somente `services/` e `contextos/` acessam o Firebase; as telas nunca importam o Firestore diretamente.

## Fluxo de dados

1. A tela chama `useConsulta` com uma consulta de serviço, por exemplo `ConsultarReceitas.porMetodo(id)`.
2. O serviço lê o Firestore e devolve objetos tipados.
3. A tela mostra o carregamento, o erro ou os dados. Ao voltar para a tela, a consulta roda de novo e a lista se atualiza.
4. Para gravar, a tela chama a classe de serviço dentro de `try/catch` e, em caso de erro, usa `mostrarAlerta(mensagemDeErro(erro))`.

## Autenticação

- Firebase Authentication com e-mail e senha. O nome do usuário fica no `displayName`.
- `ProvedorAutenticacao` observa `onAuthStateChanged` e expõe `usuario` e `carregando`.
- `app/_layout.tsx` usa `Stack.Protected`: logado vê as telas do app; deslogado vê só login e cadastro. A tela de abertura (splash) fica visível até o Firebase informar o estado da sessão.
- No celular a sessão é guardada com AsyncStorage; na web o Firebase usa a persistência padrão.

## Modelo de dados

Coleção `receitas`, um documento por receita:

| Campo | Tipo | Descrição |
|---|---|---|
| `titulo` | texto | Nome da receita |
| `metodoId` | texto | `filtragem`, `infusao`, `pressao` ou `decoccao` |
| `autorId` / `autorNome` | texto | UID e nome de quem publicou |
| `ingredientes` | lista de texto | Um item por ingrediente |
| `modoPreparo` | texto | Passo a passo |
| `avaliacoes` | lista | Objetos `{ id, usuarioId, nota }`, no máximo um por usuário |
| `comentarios` | lista | Objetos `{ id, usuarioId, usuarioNome, texto, criadoEm }` |
| `criadoEm` | texto | Data em formato ISO |

Decisões:

- Avaliações e comentários ficam dentro do documento da receita, o que simplifica as consultas. O limite de tamanho do documento é suficiente para um trabalho escolar.
- O nome do autor é gravado junto com a receita e o comentário para não precisar consultar o usuário a cada exibição.
- Os métodos de preparo são fixos em `src/utils/metodos.ts` e não existem no Firestore.

## Regras de segurança

O arquivo `firebase-cli/firestore.rules` deve ser publicado no Firebase (Console, aba Regras do Firestore, ou `firebase deploy --only firestore:rules`):

- só usuários logados leem receitas
- só se cria receita em nome do próprio usuário
- só o autor edita campos da receita e exclui
- qualquer usuário logado pode alterar apenas `avaliacoes` e `comentarios`

Limitação: como esses dois campos são listas dentro do documento, as regras não conferem o conteúdo delas, então um usuário mal-intencionado poderia alterar itens de outros. Para um sistema real, o próximo passo seria usar subcoleções.

## Padrões

| Item | Padrão | Exemplo |
|---|---|---|
| Telas | `Tela` + nome, PascalCase | `TelaDetalheReceita.tsx` |
| Rotas | minúsculas com hífen; parâmetros entre colchetes | `nova-receita.tsx`, `receita/[id].tsx` |
| Serviços | verbo + substantivo; classe com exportação padrão e método estático `executar` (consultas têm nomes descritivos) | `SalvarReceita.executar(dados)`, `ConsultarReceitas.porId(id)` |
| Componentes | PascalCase | `Botao.tsx` |
| Hooks | `use` + nome | `useConsulta.ts` |
| Contextos | `Contexto` + nome | `ContextoAutenticacao.tsx` |
| Utilitários | camelCase | `mensagemErro.ts` |
| Constantes | MAIÚSCULAS | `COLECAO_RECEITAS` |

Convenções do código:

- nomes em português, no domínio e nas telas
- uma classe por operação do Firestore, cada uma no seu arquivo
- as rotas leem o `id` e passam para a tela como propriedade
- cores sempre vindas de `src/utils/tema.ts`, e botões e cartões sempre pelos componentes compartilhados
- código sem comentários; a explicação fica nesta documentação

## Mapa de navegação

- Deslogado: `login` → `cadastro`
- Logado: `index` (métodos) → `topicos-receita/[id]` (receitas do método) → `receita/[id]` (detalhe) → `receita/[id]/avaliar` e `receita/[id]/comentarios`
- Logado: `index` → `nova-receita`
