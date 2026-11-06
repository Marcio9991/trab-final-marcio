# Interface

## Paleta de cores

O aplicativo usa três tons de marrom, definidos em `src/utils/tema.ts` e aplicados em todas as telas:

| Tom | Cor | Onde é usado |
|---|---|---|
| Pastel (`cores.fundo`) | `#F2E9E4` | Fundo das telas |
| Médio (`cores.principal`) | `#8D6E63` | Áreas principais: cabeçalho, cartões, botões, bordas de campo, estrelas marcadas |
| Escuro (`cores.destaque`) | `#4E342E` | Botões e cartões ao serem pressionados; títulos |

No celular não existe "passar o mouse"; o tom escuro aparece enquanto o botão ou cartão está pressionado (na web, também durante o clique).

## Tipografia

Fonte padrão do sistema, com três tamanhos:

- títulos de tela: 22, negrito
- títulos de seção e nomes de campo: 14 a 16, seminegrito
- texto corrente: 14

## Componentes compartilhados

- `Botao` — botão de ação; fica mais claro e inativo enquanto uma operação está em andamento
- `Cartao` — item de lista clicável (métodos e receitas)
- `CampoTexto` — campo de entrada com rótulo opcional
- `Carregando` — indicador de carregamento em tela cheia
- `Aviso` — texto de estado: lista vazia ou erro

Qualquer tela nova deve usar esses componentes para manter o mesmo visual.

## Telas

| Tela | Função |
|---|---|
| Entrar | Login com e-mail e senha, com link para o cadastro |
| Criar conta | Cadastro com nome, e-mail e senha |
| Métodos de preparo | Lista os quatro métodos; botões "Nova receita" e "Sair" |
| Receitas de um método | Lista as receitas com autor e média |
| Receita | Ingredientes, modo de preparo e botões de avaliar, comentar e excluir (para o autor) |
| Avaliar | Escolha de 1 a 5 estrelas |
| Comentários | Lista de comentários e campo para escrever |
| Nova receita | Formulário com escolha do método, título, ingredientes e modo de preparo |

## Diretrizes de UI

- fundo pastel em toda tela, com margem interna de 16
- toda lista mostra um aviso quando está vazia
- toda operação com o Firebase mostra carregamento ou desabilita o botão enquanto roda
- erros aparecem em alerta, com mensagem em português
- ações irreversíveis, como excluir, pedem confirmação
